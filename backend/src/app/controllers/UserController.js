class UserController {
    async store(req, res) {
        return res.status(200).json("criou usuario");
    }

    async update(req, res) {
        return res.status(200).json("Atualizou usuario");
    }
}

export default new UserController();
