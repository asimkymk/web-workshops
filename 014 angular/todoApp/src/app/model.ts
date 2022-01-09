export class Model{
  user;
  items:Array<ToDoItem>;

  constructor(){
    this.user = 'Asım';
    this.items = [
      new ToDoItem("Spor",true),
      new ToDoItem("Kahvaltı",false),
      new ToDoItem("Kitap okumak",false),
      new ToDoItem("Sinema",false),
    ];
  }
}

export class ToDoItem{
  description;
  action;
  constructor(description:string,action:boolean){
    this.description = description;
    this.action = action;
  }
}
