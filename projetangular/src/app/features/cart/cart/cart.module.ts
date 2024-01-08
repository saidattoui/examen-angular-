import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import {ShowShoppingComponent} from "../show/show-shopping.component";


@NgModule({
  declarations: [ShowShoppingComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
