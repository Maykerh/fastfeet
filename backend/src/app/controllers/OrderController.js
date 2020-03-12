import * as Yup from "yup";
import { parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import pt from "date-fns/locale/pt";
import Order from "../models/Order";
import Recipient from "../models/Recipient";
import Deliveryman from "../models/Deliveryman";
import { Op } from "sequelize";
// import File from "../models/File";

class OrderController {
    async index(req, res) {
        const { page = 1, showCanceled } = req.query;

        const results = await Order.findAll({
            limit: 10,
            offset: (page - 1) * 10,
        });

        return res.json(results);

        // CONTINUAR AQUI
        // USAR ESSE CODIGO ABAIXO PARA A LISTAGEM POR ENTREGADOR

        // A data de término da entrega deve ser cadastrada quando o entregador finalizar a entrega:
        // Quando a encomenda é cadastrada para um entregador, o entregador recebe um e-mail com detalhes da encomenda, com nome do produto e uma mensagem informando-o que o produto já está disponível para a retirada.

        // FAZER A PARTE Funcionalidades do entregador

        // const whereCondition = { deliveryman_id: req.params.deliverymanId };

        // if (!showCanceled) {
        //     whereCondition.canceled_at = null;
        // } else {
        //     whereCondition.canceled_at = {
        //         [Op.not]: null,
        //     };
        // }

        // const results = await Order.findAll({
        //     limit: 10,
        //     offset: (page - 1) * 10,
        //     where: whereCondition,
        //     // include: [
        //     //     {
        //     //         model: File,
        //     //         as: "avatar",
        //     //         attributes: ["id", "path", "url"],
        //     //     },
        //     // ],
        // });

        // return res.json(results);
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

            if (startHour < 5 || startHour >= 15) {
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
