import { Component } from '@angular/core';
import {Product} from "../../../core/model/Product";
import {ProductserviceService} from "../../../core/ProductService/productservice.service";



@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  showSuccessMessage = false;
  product: Product = new Product();

  constructor(private productService: ProductserviceService) {}


  addProduct(): void {

    this.productService.addProduct(this.product).subscribe(
      response => {

        // Reset the form
        this.product = new Product();
        alert('Product added successfully');

      })
  }

}
