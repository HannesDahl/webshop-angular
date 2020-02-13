import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { RemoveLoader } from '../../services/remove-loader.service';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
    @ViewChild('loaderWrapper') public loaderWrapper: ElementRef;

    product: any;

    constructor(private _http: HttpService, private removeLoader: RemoveLoader) { }

    private url = window.location.href.replace(/^.*[\\\/]/, '');
    ngOnInit() {
        this._http.getPageProduct(this.url).subscribe(
            this._onProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));
        window.scrollTo(0, 0);
    }

    ngAfterViewInit() {
        this.removeLoader.remove(this.loaderWrapper.nativeElement);
    }

    private _onProductsLoaded(data: any): void {
        this.product = data;
    }

    private _onProductsLoadFailed(error: any): void {
        console.log(error);
    }
}
