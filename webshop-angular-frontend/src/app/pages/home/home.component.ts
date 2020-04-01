import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NavigationEnd, Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @Output() public products: Array<Object>;
    @ViewChild('categoryNameHeader') public categoryNameHeader: ElementRef;
    @ViewChild('loaderWrapper') public loaderWrapper: ElementRef;

    mySubscription: any;

    constructor(
        private _http: HttpService,
        private router: Router,
        private funtions: AngularFireFunctions
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.router.navigated = false;
            }
        });
    }

    ngOnInit() {
        this._http.getFrontPageProducts().subscribe(
            this._onProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));

        // @ts-ignore
        var mySwiper: any = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    ngAfterViewInit(): void { }

    private _onProductsLoaded(data: any): void {
        this.products = data;
    }

    private _onProductsLoadFailed(error: any): void {
        console.log(error);
    }
}
