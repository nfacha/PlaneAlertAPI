import {Request, Response} from 'express';

export class ListTrackedPlanesAction {
    public static getRequest(request: Request, response: Response) {
        response.status(200).json({})
    }
}
