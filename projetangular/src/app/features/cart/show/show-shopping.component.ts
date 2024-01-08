import {Component, Input} from '@angular/core';
import {Product} from "../../../core/model/Product";
import {ProductserviceService} from "../../../core/ProductService/productservice.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-show-shopping',
  templateUrl: './show-shopping.component.html',
  styleUrls: ['./show-shopping.component.css']
})
export class ShowShoppingComponent {
  products: Product[] = [];
  isEditMode: boolean = false;
  formVisible: boolean = false;
  bookToUpdate: Product | null = null;
  formProduct!: FormGroup;
  constructor(private productService: ProductserviceService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.formProduct = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.productService. getCarts()
      .subscribe((data: Product[]) => {
        this.products = data;
      });
  }
}
