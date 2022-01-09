import { Component, OnInit } from '@angular/core';
import { Product } from '../product.module';
import { ProductRepository } from '../repository.model';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent{

  products;
  model: ProductRepository;
  selectedProduct:any;
  constructor() {
    this.model = new ProductRepository();
    this.products = this.model.getProducts();


  }

  getSelected(product:Product):boolean{
    return product == this.selectedProduct;
    }
  editProduct(product:Product){
    this.selectedProduct = product;

  }
  parseNumber(value:string):number{
    return parseInt(value);
  }



}
