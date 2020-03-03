import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
    @Output() public products: any;
    @Output() public randomProducts: any;
    @ViewChild('categoryNameHeader') public categoryNameHeader: ElementRef;

    mySubscription: any;
    productsLength: any;
    categoryName: string;

    constructor(private _http: HttpService, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.router.navigated = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    public url = window.location.href.replace(/^.*[\\\/]/, '');
    ngOnInit() {
        this._http.getCategoryProducts(this.url).subscribe(
            this._onProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));

        this._http.getRandomProducts().subscribe(
            this._onRandomProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));
    }

    public _capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private _onRandomProductsLoaded(data: any): void {
        this.randomProducts = data;
    }

    private _onProductsLoaded(data: any): void {
        this.products = data;
        this.productsLength = data.length

        this.categoryName = window.location.href.replace(/^.*[\\\/]/, '');
        this.categoryName = this.categoryName.replace(/\?.*$/, '');
    }

    private _onProductsLoadFailed(error: any): void {
        console.error(error);
    }
}
