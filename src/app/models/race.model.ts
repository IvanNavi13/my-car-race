import { Car } from './car.model';

export interface Race{
    cars: Car[],
    lap: number,
    distance: number,
    status: string  //// [ nuevo | proceso | termino ]
}