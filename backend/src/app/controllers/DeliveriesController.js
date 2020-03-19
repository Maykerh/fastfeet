import Order from "../models/Order";
import File from "../models/File";
import { Op } from "sequelize";
import * as Yup from "yup";
import { endOfDay, startOfDay, isBefore, parseISO } from "date-fns";

class DeliveriesController {
    async index(req, res) {
        const { deliverymanId } = req.params;
        const { showFinished } = req.query;

        const queryParams = {
            where: { deliveryman_id: deliverymanId, canceled_at: null, end_date: null },
        };

        if (showFinished === 1) {
            queryParams.where.end_date = { [Op.ne]: null };
        }

        const deliveryManOrders = await Order.findAll(queryParams);

        return res.json(deliveryManOrders);
    }

    async start(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Start date is invalid" });
        }

        const todayOrders = await Order.findAll({
            where: {
                deliveryman_id: req.params.deliverymanId,
                start_date: {
                    [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
                },
            },
        });

        if (todayOrders.length >= 5) {
            return res.status(400).json({ error: "Reached daily delivery limit" });
        }

        const order = await Order.findByPk(req.params.orderId);

        await order.update({ start_date: req.body.start_date });

        return res.json(order);
    }

    async finish(req, res) {
        const schema = Yup.object().shape({
            end_date: Yup.date().required(),
            signature_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Finish validation failed" });
        }

        const { end_date, signature_id } = req.body;

        const file = await File.findByPk(signature_id);

        if (!file) {
            return res.status(400).json({ error: "Signature file not found" });
        }

        const order = await Order.findByPk(req.params.orderId);

        if (order.start_date === null) {
            return res.status(400).json({ error: "Deliver is not started yet" });
        }

        if (isBefore(parseISO(end_date), order.start_date)) {
            return res.status(400).json({ error: "End date can't be before start date" });
        }

        await order.update({ end_date, signature_id });

        return res.json(order);
    }
}

export default new DeliveriesController();
