import Order from "../models/Order";
import File from "../models/File";
import Recipient from "../models/Recipient";
import { Op } from "sequelize";
import * as Yup from "yup";
import { endOfDay, startOfDay, isBefore, parseISO } from "date-fns";

const EIGHT_AM_UTC = 11;
const SIX_PM_UTC = 21;

class DeliveriesController {
    async index(req, res) {
        const { deliverymanId } = req.params;
        const { showFinished, showCanceled, page = 1 } = req.query;

        const queryParams = {
            limit: 10,
            offset: (page - 1) * 10,
            order: [["id", "ASC"]],
            where: { deliveryman_id: deliverymanId, canceled_at: null, end_date: null },
            include: [
                { model: Recipient },
                {
                    model: File,
                    as: "signature",
                    attributes: ["name", "path", "url"],
                },
            ],
        };

        if (parseInt(showFinished) === 1) {
            queryParams.where.end_date = { [Op.ne]: null };
        } else if (parseInt(showCanceled) === 1) {
            queryParams.where.canceled_at = { [Op.ne]: null };
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

        const { start_date } = req.body;

        if (start_date) {
            const startHour = parseISO(start_date).getUTCHours();

            if (startHour < EIGHT_AM_UTC || startHour >= SIX_PM_UTC) {
                return res.status(400).json({
                    error: "Product can only be withdrawn beetwen 8am and 6pm",
                });
            }
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

        await order.update({ start_date: start_date });

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
