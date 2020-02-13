import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

    product: Object;

    constructor(private _http: HttpService) { }

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
}
