import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DetailComponent} from "./details/detail.component";

const routes: Routes = [
  { path: 'home', component:HomeComponent },

  {
    path: 'product',
    loadChildren: () => import('./features/product/product-routing/product-routing.module')
      .then(m => m.ProductRoutingModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart/cart.module')
      .then(m => m.CartModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'details/:productId', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
