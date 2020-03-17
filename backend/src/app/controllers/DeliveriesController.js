import Order from "../models/Order";
import { Op } from "sequelize";
import * as Yup from "yup";
import { endOfDay, startOfDay } from "date-fns";

class DeliveriesController {
    async listOpened(req, res) {
        const { deliverymanId } = req.params;

        const deliveryManOrders = await Order.findAll({
            where: { deliveryman_id: deliverymanId, canceled_at: null, end_date: null },
        });

        return res.json(deliveryManOrders);
    }

    async listFinished(req, res) {
        const { deliverymanId } = req.params;

        const deliveryManOrders = await Order.findAll({
            where: { deliveryman_id: deliverymanId, end_date: { [Op.ne]: null } },
        });

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
        // Continuar aqui Para a funcionalidade de finalizar a entrega, você deverá permitir o envio de uma imagem que irá preencher o campo signature_id da tabela de encomendas.
        return res.json();
    }
}

export default new DeliveriesController();
