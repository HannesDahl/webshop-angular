import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Partials
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// Components
import { ProductCardComponent } from './components/product-card/product-card.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';

// Pages
import { PublicViewComponent } from './pages/public-view/public-view.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ProfileComponent } from './pages/profile/profile.component';

// Admin Pages
import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import { ProductlistComponent } from './pages/adminpage/productlist/productlist.component';
import { AddproductComponent } from './pages/adminpage/addproduct/addproduct.component';
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
        LoginComponent,
        SignupComponent,
        ProfileComponent,
        VerifyEmailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        AngularFireAnalyticsModule,
        AngularFireFunctionsModule,
        AngularFireDatabaseModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
