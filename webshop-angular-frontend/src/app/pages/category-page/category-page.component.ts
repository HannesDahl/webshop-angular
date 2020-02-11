import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
    @Output() public products: Array<Object>;
    @Output() public randomProducts: Array<Object>;
    @ViewChild('categoryNameHeader', { static: false }) public categoryNameHeader: ElementRef;
    @ViewChild('loaderWrapper', { static: false }) public loaderWrapper: ElementRef;

    constructor(private _http: HttpService) { }

    private url = window.location.href.replace(/^.*[\\\/]/, '');
    ngOnInit() {
        this._http.getCategoryProducts(this.url).subscribe(
            this._onProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));

        window.onload = () => {
            setTimeout(() => {
                this.fadeOut(this.loaderWrapper.nativeElement);
            }, 500);
        }
    }

    private _onRandomProductsLoaded(data: any): void {
        this.randomProducts = data;
        console.log(this.randomProducts);
    }

    private _onProductsLoaded(data: any): void {
        if (data.length == 0) {
            this._http.getRandomProducts().subscribe(
                this._onRandomProductsLoaded.bind(this),
                this._onProductsLoadFailed.bind(this));
        } else {
            this.products = data;
            console.log(this.products);
        }

        // this.categoryNameHeader.nativeElement.textContent = `Showing ${(this.url)}`;
    }

    private _onProductsLoadFailed(error: any): void {
        console.error(error);
    }

    public fadeOut(el) {
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    };
}
