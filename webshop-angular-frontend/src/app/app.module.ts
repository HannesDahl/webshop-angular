import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

import { HttpClientModule } from '@angular/common/http';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { ProductlistComponent } from './pages/adminpage/productlist/productlist.component';
import { AddproductComponent } from './pages/adminpage/addproduct/addproduct.component';
import { CartComponent } from './pages/cart/cart.component';
import { PublicViewComponent } from './pages/public-view/public-view.component';
import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { DashboardComponent } from './pages/adminpage/dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        ProductCardComponent,
        CategoryPageComponent,
        HomeComponent,
        ProductPageComponent,
        SearchResultsComponent,
        PreloaderComponent,
        FilterBarComponent,
        PageNotFoundComponent,
        ProductlistComponent,
        AddproductComponent,
        CartComponent,
        PublicViewComponent,
        AdminViewComponent,
        AdminSidenavComponent,
        DashboardComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
