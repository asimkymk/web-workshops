import { isLoweredSymbol } from "@angular/compiler";
import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Product } from "./product.module";
import { ProductRepository } from "./repository.model";


@Component({
  selector: "app",
  templateUrl: "product.component.html",
  styleUrls: ["product.component.css"]
})

export class ProductComponent {
  model: ProductRepository = new ProductRepository();
  disabled = true;

  email: string = "email@email.com";
  today: number = Date.now();
  title: string = "Angular Kursu";
  students: number = 21536;
  price: number = 395.99;
  completed: number = 0.26;

  text: string = 'lsakdmsak mlsakdm alskdm lsak dmlaskdmlsakdmla skdm lsakdmsal dmsal kdamslmsadl ksaldksamdla.';

  newProduct: Product = new Product();

  get jsonProduct() {
    return JSON.stringify(this.newProduct);
  }
  addProduct(p: Product) {
    console.log("New Product: " + this.jsonProduct);
  }

  getClasses(id: number): string {
    let product: Product = this.model.getProductById(id);
    return (product.price as number <= 1000 ? "bg-info" : "bg-secondary") + " text-white m-2 p-2";
  }
  getClassMap(id: number): Object {
    let product = this.model.getProductById(id);
    return {
      "bg-info": product.price as number <= 1000,
      "bg-secondary": product.price as number > 1000,
      "text-center text-white": product.name as string == "Samsung S6"
    }
  }
  color: string = this.model.getProductById(1).price as number <= 1000 ? "green" : "red";
  fontSize: string = "25px";

  getStyles(id: number) {
    let product = this.model.getProductById(id);
    return {
      fontSize: "25px",
      color: this.model.getProductById(id).price as number <= 1000 ? "green" : "red"

    }
  }
  onSubmit($event: MouseEvent) {
    $event.stopPropagation();
    console.log("button was clicked");
    console.log($event);
  }
  onDivClicked() {
    console.log("Div was clicked");
  }
  onKeyUp() {

    console.log(this.email);

  }
  log(x: any) {
    console.log(x);
  }

  getValidationErrors(state: any) {
    let ctrlName: string = state.name;
    let messages: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case "required":
            messages.push("You must enter a "+ ctrlName);
            break;
          case "minlength":
            messages.push("Min. 3 charachters for "+ctrlName);
            break;
          case "pattern":
            messages.push("Contains illegal charachters for a "+ctrlName);
            break;

        }
      }
    }
    return messages;
  }

  submitForm(form:NgForm){
    this.formSubmitted = true;
    if(form.valid){
      this.addProduct(this.newProduct);
      this.newProduct = new Product();
      form.reset();
    }
  }
  formSubmitted:boolean=false;



  product: Product = this.model.getProductById(1) as Product;
}
