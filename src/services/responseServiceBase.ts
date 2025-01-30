import { Response } from "express";

class ResponseServiceBase {
    response200(res: Response, data: any) {
        return res.status(200).json(data)
    }

    response201(res: Response, message: string) {
        return res.status(200).json({message})
    }

    badRequest(res: Response, message: string = 'Bad Request') {
        return res.status(400).json({message})
    }

    unauthorizedException(res: Response, message: string = 'Unauthorized') {
        return res.status(401).json({message})
    }

    forbidden(res: Response, message: string = 'Forbidden') {
        return res.status(403).json({message})
    }

    notFoundException(res: Response, message: string = 'Not Found') {
        return res.status(404).json({message})
    }

    response409(res: Response, message: string) {
        return res.status(409).json({message})
    }

    internalServerErrorException(res: Response, message: string = 'Internal server error') {
        return res.status(200).json({message})
    }


    responseError(res, status, message) {
        return res.status(status).json({message})
    }
}

export default new ResponseServiceBase()