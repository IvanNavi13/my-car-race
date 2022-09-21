import { Pilot } from './pilot.model';

export interface Car{
    carNumber: number,
    color: string,
    pilot?: Pilot
    distanceTraveled: number,
    status: string,         //// [stopped | moving]
    startUp(): void,
    updateDistance?():void,
    stop():void

}