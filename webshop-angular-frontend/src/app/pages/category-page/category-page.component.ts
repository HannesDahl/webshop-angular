import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../http.service';
import { RemoveLoader } from '../../remove-loader.service';
import { NavigationEnd, Router } from '@angular/router';

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

    mySubscription: any;

    constructor(private _http: HttpService, private router: Router, private removeLoader: RemoveLoader) {
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

    private url = window.location.href.replace(/^.*[\\\/]/, '');
    ngOnInit() {
        this._http.getCategoryProducts(this.url).subscribe(
            this._onProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));
    }

    ngAfterViewInit() {
        let tabs = document.getElementsByClassName('tab')
        for (let i = 0; i < tabs.length; i++) {
            // @ts-ignore
            if (window.location.pathname == tabs[i].firstChild.pathname) {
                tabs[i].classList.add('active');
            } else {
                tabs[i].classList.remove('active');
            }
        }
        this.removeLoader.remove(this.loaderWrapper.nativeElement);
    }

    private _capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private _onRandomProductsLoaded(data: any): void {
        this.randomProducts = data;
    }

    private _onProductsLoaded(data: any): void {
        if (data.length == 0) {
            this._http.getRandomProducts().subscribe(
                this._onRandomProductsLoaded.bind(this),
                this._onProductsLoadFailed.bind(this));
        } else {
            this._http.getRandomProducts().subscribe(
                this._onRandomProductsLoaded.bind(this),
                this._onProductsLoadFailed.bind(this));
            this.products = data;
        }
    }

    private _onProductsLoadFailed(error: any): void {
        console.error(error);
    }
}
