import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingRoutingModule } from './product-routing-routing.module';
import {AddproductComponent} from "../add/addproduct.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [    AddproductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductRoutingModule { }
