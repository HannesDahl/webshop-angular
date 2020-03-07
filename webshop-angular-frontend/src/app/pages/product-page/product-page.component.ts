import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AddToCartService } from '../../services/add-to-cart.service';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
    product: any;

    constructor(
        private _http: HttpService,
        private _cart: AddToCartService
    ) { }

    private url = window.location.href.replace(/^.*[\\\/]/, '');
    ngOnInit() {
        this._http.getPageProduct(this.url).subscribe(
            this._onProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));
        window.scrollTo(0, 0);
    }

    private _onProductsLoaded(data: any): void {
        this.product = data;
    }

    private _onProductsLoadFailed(error: any): void {
        console.log(error);
    }

    public addToCart(e) {
        e.preventDefault();
        this._cart.addToCart(this.product.id);
    }
}
