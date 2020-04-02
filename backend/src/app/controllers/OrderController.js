import * as Yup from "yup";
import { parseISO, format } from "date-fns";
import pt from "date-fns/locale/pt";
import Order from "../models/Order";
import Recipient from "../models/Recipient";
import Deliveryman from "../models/Deliveryman";
import DeliveryProblems from "../models/DeliveryProblems";
import File from "../models/File";
import Mail from "../../lib/mail";
import { Op } from "sequelize";

class OrderController {
    async index(req, res) {
        const { page = 1, q: product } = req.query;

        const queryParams = {
            limit: 10,
            offset: (page - 1) * 10,
        };

        if (product) {
            queryParams.where = {
                product: {
                    [Op.iLike]: `%${product}%`,
                },
            };
        }

        queryParams.include = [
            {
                model: Recipient,
                attributes: ["id", "name", "city", "state", "street"],
            },
            {
                model: Deliveryman,
                attributes: ["id", "name"],
            },
            {
                model: File,
                as: "signature",
                attributes: ["path", "url"],
            },
        ];

        const results = await Order.findAll(queryParams);

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
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Order validation failed" });
        }

        const { recipient_id, deliveryman_id, product } = req.body;

        const recipient = await Recipient.findByPk(recipient_id);

        if (!recipient) {
            return res.status(400).json({ error: "Recipient doesnt exists" });
        }

        const deliveryman = await Deliveryman.findByPk(deliveryman_id);

        if (!deliveryman) {
            return res.status(400).json({ error: "Deliveryman doesnt exists" });
        }

        const order = await Order.findByPk(req.params.id);

        await order.update({ recipient_id, deliveryman_id, product });

        return res.json(order);
    }

    async delete(req, res) {
        const order = await Order.findByPk(req.params.id);

        await order.destroy();

        return res.json(order);
    }
}

export default new OrderController();
