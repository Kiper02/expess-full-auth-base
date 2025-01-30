const checkPasswordRepeat = (req, res, next) => {
    if (req.body.password !== req.body.passwordRepeat) {
        res.status(400).json("Пароли не совпадают");
        return;
    }
    next();
};
export default checkPasswordRepeat;
//# sourceMappingURL=checkPasswordRepeat.js.map