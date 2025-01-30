var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function validation(req, res, next, schema) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        if (!data)
            return res.status(400).json("Нет данных");
        try {
            yield schema.validateAsync(data);
            next();
        }
        catch (error) {
            const errorMessage = error.details[0].message.replace(/"/g, '');
            res.status(400).json({ message: errorMessage });
        }
    });
}
export default validation;
//# sourceMappingURL=validation.js.map