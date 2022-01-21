import {Request, Response} from 'express';
import {Plane} from "../entities/Plane";

export class PlaneDetailsAction {
    public static async byId(request: Request, response: Response) {
        const plane = await Plane.findOne({where: {id: request.params.id}});
        if (plane === undefined) {
            response.status(404).send({
                error: 'Plane not found'
            });
        } else {
            response.status(200).send(plane);
        }
    }
}
