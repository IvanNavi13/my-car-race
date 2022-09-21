import { Component } from '@angular/core';

import { Race } from './models/race.model';
import { Pilot } from './models/pilot.model';
import { Car } from './models/car.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-car-rice';
  
  constructor(){

    const p1 : Pilot = {
      id: 1,
      name: "jug1",
      lastName: "ape1",
      nationality: "Mexicano"
    }
    const p2 : Pilot ={
      id: 2,
      name: "jug2",
      lastName: "ape2",
      nationality: "Brazil"
    }
    const p3 : Pilot ={
      id: 3,
      name: "jug3",
      lastName: "ape3",
      nationality: "Canada"
    }
    const p4 : Pilot ={
      id: 4,
      name: "jug4",
      lastName: "ape4",
      nationality: "Colombia"
    }


    let car1 : Car = {
      carNumber: 1,
      color: "rojo",
      pilot: p1,
      distanceTraveled: 0,
      status: "Detenido",
      startUp(){
        this.status = 'Avanzando'
      },
      //?:
      stop(){
        this.status = 'Detenido'
      }
    }
    let car2 : Car = {
      carNumber: 2,
      color: "azul",
      pilot: p2,
      distanceTraveled: 0,
      status: "Detenido",
      startUp(){
        this.status = 'Avanzando'
      },
      //?:
      stop(){
        this.status = 'Detenido'
      }
    }
    let car3 : Car = {
      carNumber: 3,
      color: "amarillo",
      pilot: p3,
      distanceTraveled: 0,
      status: "Detenido",
      startUp(){
        this.status = 'Avanzando'
      },
      //?:
      stop(){
        this.status = 'Detenido'
      }
    }
    let car4 : Car = {  
      carNumber: 4,
      color: "verde",
      pilot: p4,
      distanceTraveled: 0,
      status: "Detenido",
      startUp(){
        this.status = 'Avanzando'
      },
      //?:
      stop(){
        this.status = 'Detenido'
      }
    }
    let car5 : Car = {  //Without driver
      carNumber: 5,
      color: "morado",
      //Without driver Px
      distanceTraveled: 0,
      status: "Detenido",
      startUp(){
        this.status = 'Avanzando'
      },
      //?:
      stop(){
        this.status = 'Detenido'
      }
    }


    let race : Race = {
      cars: [car1, car2, car3, car4],
      lap: 3,
      distance: 100,
      status : "Nueva"
    }


    this.startRace(race);

    do{
      this.showPositions(race);
    }while( race.status != "Terminada");

    const ORDERLY_RACE : Car[] = this.checkPositions(race.cars);
    const { carNumber : winnerCar, pilot : winnerDriver} = ORDERLY_RACE[0];
    const WINNER : string = `
      El ganador es 
      Nacionalildad: ${winnerDriver?.nationality}
      Piloto: ${winnerDriver?.name} ${winnerDriver?.lastName}
      Car: ${winnerCar}`;

    console.log(WINNER);

  }

    random(min:number, max:number): number {
      return Math.floor((Math.random() * (max - min + 1)) + min);
    }


    startRace( race : Race ): void{
      if(race.status == "Nueva"){
        race.cars.forEach(value => value.startUp() );
        race.status = 'Progreso';
      }
    }

    updateRace( race: Race): void{
      if (race.status == "Progreso"){
        const RACE_DISTANCE = race.distance * race.lap;
        let finishedCars = 0;

        race.cars.forEach( value => {
          value.startUp = () =>{
            if(value.distanceTraveled >= RACE_DISTANCE){
              finishedCars++;
              value.distanceTraveled += 50; 
            }else{
              value.distanceTraveled += this.random(1,50);
            }
          }

          if(value.status == "Avanzando"){
            value.startUp();
          }
        });

        if(race.cars.length == finishedCars){
          race.status = 'Terminada';
        }
      }
    }

    checkPositions(cars : Car[]) : Car[]{
      return cars.sort(((a:Car,b:Car) => b.distanceTraveled - a.distanceTraveled));
    }

    showPositions(race : Race) : void {
      this.updateRace(race);
      console.log(race.status);
  
      let position : any[] = [];
      const ORDER_RACE : Car[] = this.checkPositions(race.cars);

      ORDER_RACE.forEach((value, index) => {
        let COMPETITOR : any = {
          position : index+1,
          country : value.pilot?.nationality,
          name : value.pilot?.name,
          carNumber : value.carNumber
        }

        position.push(COMPETITOR);
      });
  
      console.table(position);  
  
    }

}
  

