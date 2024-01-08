import { Component } from '@angular/core';
import {Product} from "../core/model/Product";
import {ActivatedRoute} from "@angular/router";
import {ProductserviceService} from "../core/ProductService/productservice.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  product: Product = new Product();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductserviceService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('productId');
      if (productId) {
        this.fetchProductDetails(productId);
      }
    });
  }

  private fetchProductDetails(productId: string): void {
    this.productService.getProductById(productId).subscribe({
      next: (response: Product) => {
        this.product = response;
      },
      error: (err: any) => console.error(err),
    });
  }
}

