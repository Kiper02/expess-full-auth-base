class ResponseServiceBase {
    response200(res, data) {
        return res.status(200).json(data);
    }
    response201(res, message) {
        return res.status(200).json({ message });
    }
    badRequest(res, message = 'Bad Request') {
        return res.status(400).json({ message });
    }
    unauthorizedException(res, message = 'Unauthorized') {
        return res.status(401).json({ message });
    }
    forbidden(res, message = 'Forbidden') {
        return res.status(403).json({ message });
    }
    notFoundException(res, message = 'Not Found') {
        return res.status(404).json({ message });
    }
    response409(res, message) {
        return res.status(409).json({ message });
    }
    internalServerErrorException(res, message = 'Internal server error') {
        return res.status(200).json({ message });
    }
    responseError(res, status, message) {
        return res.status(status).json({ message });
    }
}
export default new ResponseServiceBase();
//# sourceMappingURL=responseServiceBase.js.map