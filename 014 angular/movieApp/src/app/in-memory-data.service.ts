import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService  implements InMemoryDbService{

  createDb(){
    const movies=[
      {id:1,name:"Movie 1",description:"güzel film",imageUrl:"1.jpg"},
      {id:2,name:"Movie 2",description:"güzel film",imageUrl:"2.jpg"},
      {id:3,name:"Movie 3",description:"güzel film",imageUrl:"3.jpg"},
      {id:4,name:"Movie 4",description:"güzel film",imageUrl:"4.jpg"},
      {id:5,name:"Movie 5",description:"güzel film",imageUrl:"5.jpg"},
      {id:6,name:"Movie 6",description:"güzel film",imageUrl:"6.jpg"},
    ];
    return {movies};
  }
  constructor() { }
}
