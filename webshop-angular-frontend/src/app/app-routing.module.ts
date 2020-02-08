import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'c/:categoryname', component: CategoryPageComponent },
  { path: `p/:productname`, component: ProductPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
