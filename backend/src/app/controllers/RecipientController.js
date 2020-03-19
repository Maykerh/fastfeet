import * as Yup from "yup";
import Recipient from "../models/Recipient";
import File from "../models/File";
import { Op } from "sequelize";

class RecipientController {
    async index(req, res) {
        const { page = 1, q: name } = req.query;

        const queryParams = {
            limit: 10,
            offset: (page - 1) * 10,
        };

        if (name) {
            queryParams.where = {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            };
        }

        const results = await Recipient.findAll(queryParams);

        return res.json(results);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
            complement: Yup.string().required(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            cep: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Recipient validation failed" });
        }

        await Recipient.create(req.body);

        return res.json(req.body);
    }
}

export default new RecipientController();
