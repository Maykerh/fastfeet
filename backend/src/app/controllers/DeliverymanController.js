import * as Yup from "yup";
import Deliveryman from "../models/Deliveryman";
import File from "../models/File";
import { Op } from "sequelize";

class DeliverymanController {
    async index(req, res) {
        const { deliverymanId } = req.params;

        if (deliverymanId) {
            const deliveryman = await Deliveryman.findByPk(deliverymanId, {
                include: [
                    {
                        model: File,
                        as: "avatar",
                        attributes: ["id", "path", "url"],
                    },
                ],
            });

            return res.json(deliveryman);
        }

        const { page = 1, q: name } = req.query;

        const queryParams = {
            limit: 10,
            offset: (page - 1) * 10,
            include: [
                {
                    model: File,
                    as: "avatar",
                    attributes: ["id", "path", "url"],
                },
            ],
        };

        if (name) {
            queryParams.where = {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            };
        }

        const results = await Deliveryman.findAll(queryParams);

        return res.json(results);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            avatar_id: Yup.number().nullable(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Deliveryman validation failed" });
        }

        const alreadyExists = await Deliveryman.findOne({
            where: { email: req.body.email },
        });

        if (alreadyExists) {
            return res.status(400).json({ error: "Email already in use" });
        }

        await Deliveryman.create(req.body);

        return res.json(req.body);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            avatar_id: Yup.number().nullable(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Update Deliveryman validation failed" });
        }

        const alreadyExists = await Deliveryman.findOne({
            where: { email: req.body.email, id: { [Op.ne]: req.params.id } },
        });

        if (alreadyExists) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const deliveryman = await Deliveryman.findByPk(req.params.id);

        await deliveryman.update(req.body);

        const { id, name, email, avatar } = await Deliveryman.findByPk(req.params.id, {
            include: [
                {
                    model: File,
                    as: "avatar",
                    attributes: ["id", "path", "url"],
                },
            ],
        });

        return res.json({
            id,
            name,
            email,
            avatar,
        });
    }

    async delete(req, res) {
        const deliveryman = await Deliveryman.findByPk(req.params.id);

        if (!deliveryman) {
            return res.status(400).json({ error: "Deliveryman doesnt exists" });
        }

        deliveryman.destroy();

        return res.json();
    }
}

export default new DeliverymanController();
