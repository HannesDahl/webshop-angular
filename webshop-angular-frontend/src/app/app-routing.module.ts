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
import { PublicViewComponent } from './pages/public-view/public-view.component';
import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import { DashboardComponent } from './pages/adminpage/dashboard/dashboard.component';

const routes: Routes = [
	{
		path: ``, component: PublicViewComponent, children: [
			{ path: ``, component: HomeComponent },
			{ path: `category/:categoryname`, component: CategoryPageComponent },
			{ path: `product/:productname`, component: ProductPageComponent },
			{ path: `search/:searchvalue`, component: SearchResultsComponent },
			{ path: 'cart', component: CartComponent },
		]
	},
	{
		path: `adminpage`, component: AdminViewComponent, children: [
			{ path: `productslist`, component: ProductlistComponent },
			{ path: `dashboard`, component: DashboardComponent },
			{ path: `addproduct`, component: AddproductComponent },
		]
	},
	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
