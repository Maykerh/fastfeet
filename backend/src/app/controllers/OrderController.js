import * as Yup from "yup";
import { parseISO, format } from "date-fns";
import pt from "date-fns/locale/pt";
import Order from "../models/Order";
import Recipient from "../models/Recipient";
import Deliveryman from "../models/Deliveryman";
import Mail from "../../lib/mail";

const EIGHTAMUTC = 5;
const SIXPMUTC = 15;

class OrderController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const results = await Order.findAll({
            limit: 10,
            offset: (page - 1) * 10,
        });

        return res.json(results);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Order validation failed" });
        }

        const recipient = await Recipient.findByPk(req.body.recipient_id);

        if (!recipient) {
            return res.status(400).json({ error: "Recipient doesnt exists" });
        }

        const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);

        if (!deliveryman) {
            return res.status(400).json({ error: "Deliveryman doesnt exists" });
        }

        const { recipient_id, deliveryman_id, product } = req.body;

        await Order.create({ recipient_id, deliveryman_id, product });

        await Mail.sendMail({
            to: `${deliveryman.name} <${deliveryman.email}>`,
            subject: "Encomenda disponível para retirada",
            template: "newOrder",
            context: {
                deliveryman: deliveryman.name,
                product,
                recipient: recipient.name,
                deliverAddress: `Rua ${recipient.street} nº ${recipient.number}, ${recipient.city} - ${recipient.state}. ${recipient.cep}`,
                registerDate: format(new Date(), "dd 'de' MMMM 'de' yyyy, 'às' H:mm 'h'", {
                    locale: pt,
                }),
                withdrawDate: "Das 08:00 às 18:00",
            },
        });

        return res.json({ recipient_id, deliveryman_id, product });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date(),
            end_date: Yup.date(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Order validation failed" });
        }

        const { start_date, end_date } = req.body;

        if (start_date) {
            const startHour = parseISO(start_date).getUTCHours();

            if (startHour < EIGHTAMUTC || startHour >= SIXPMUTC) {
                return res.status(400).json({
                    error: "Product can only be withdrawn beetwen 8am and 6pm",
                });
            }
        }

        const order = await Order.findByPk(req.params.id);

        await order.update({ start_date, end_date });

        return res.json(order);
    }

    async delete(req, res) {
        const order = await Order.findByPk(req.params.id);

        order.canceled_at = new Date();

        await order.save();

        return res.json(order);
    }
}

export default new OrderController();
