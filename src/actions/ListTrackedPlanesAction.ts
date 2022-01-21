import {Request, Response} from 'express';
import {Plane} from "../entities/Plane";

export class ListTrackedPlanesAction {
    public static async getRequest(request: Request, response: Response) {
        const planes = await Plane.find();
        let planeArray: { id: number; name: string; icao: string; registration: string; active: boolean; allowed_airports: string[]; refresh_interval: number; last_refresh: Date; next_refresh: Date; last_seen: Date; on_ground: boolean; live_track: boolean; last_lat: number | null; last_lng: number | null; }[] = [];
        planes.forEach(plane => {
            planeArray.push(plane.getApiObject());
        });
        response.status(200).json(planeArray);
    }
}
