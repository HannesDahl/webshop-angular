import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { AddproductComponent } from './pages/adminpage/addproduct/addproduct.component';
import { ProductlistComponent } from './pages/adminpage/productlist/productlist.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: `adminpage/addproduct`, component: AddproductComponent },
  { path: 'category/:categoryname', component: CategoryPageComponent },
  { path: `product/:productname`, component: ProductPageComponent },
  { path: `search/:searchvalue`, component: SearchResultsComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
