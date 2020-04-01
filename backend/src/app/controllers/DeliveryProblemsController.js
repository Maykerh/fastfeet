import * as Yup from "yup";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import DeliveryProblems from "../models/DeliveryProblems";
import Order from "../models/Order";
import Deliveryman from "../models/Deliveryman";
import Mail from "../../lib/mail";
import Recipient from "../models/Recipient";

class DeliveryProblemsController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const deliveriesWithProblem = await DeliveryProblems.findAll({
            limit: 10,
            offset: (page - 1) * 10,
            include: [{ model: Order, attributes: ["id", "canceled_at"] }],
        });

        return res.json(deliveriesWithProblem);
    }

    async indexByDelivery(req, res) {
        const deliveryProblems = await Order.findByPk(req.params.id, {
            include: {
                model: DeliveryProblems,
                as: "problems",
            },
        });

        return res.json(deliveryProblems);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Store validation failed" });
        }

        const { description } = req.body;
        const delivery_id = req.params.id;

        const delivery = await Order.findByPk(delivery_id);

        if (!delivery) {
            return res.status(400).json({ error: "Delivery not found" });
        }

        await DeliveryProblems.create({ delivery_id, description });

        return res.json({ delivery_id, description });
    }

    async cancelDelivery(req, res) {
        const delivery = await Order.findOne({
            include: [
                {
                    model: DeliveryProblems,
                    as: "problems",
                    where: { id: req.params.id },
                },
                {
                    model: Deliveryman,
                    attributes: ["name", "email"],
                },
                {
                    model: Recipient,
                },
            ],
        });

        if (!delivery) {
            return res.status(400).json({ error: "Delivery not found" });
        }

        await delivery.update({ canceled_at: new Date() });

        await Mail.sendMail({
            to: `${delivery.Deliveryman.name} <${delivery.Deliveryman.email}>`,
            subject: "Entrega cancelada",
            template: "canceledDelivery",
            context: {
                id: delivery.id,
                deliveryman: delivery.Deliveryman.name,
                product: delivery.product,
                recipient: delivery.Recipient.name,
                deliverAddress: `Rua ${delivery.Recipient.street} nº ${delivery.Recipient.number}, ${delivery.Recipient.city} - ${delivery.Recipient.state}. ${delivery.Recipient.cep}`,
                cancelDate: format(new Date(), "dd 'de' MMMM 'de' yyyy, 'às' H:mm 'h'", {
                    locale: pt,
                }),
            },
        });

        return res.json(delivery);
    }
}

export default new DeliveryProblemsController();
