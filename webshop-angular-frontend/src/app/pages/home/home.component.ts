import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @Output() public products: Array<Object>;
    @ViewChild('categoryNameHeader', { static: false }) public categoryNameHeader: ElementRef;
    @ViewChild('loaderWrapper', { static: false }) public loaderWrapper: ElementRef;

    constructor(private _http: HttpService) { }

    ngOnInit() {
        this._http.getFrontPageProducts().subscribe(
            this._onProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));

        window.onload = () => {
            setTimeout(() => {
                this.fadeOut(this.loaderWrapper.nativeElement);
            }, 500);
        }

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

    private _onProductsLoaded(data: any): void {
        this.products = data;
    }

    private _onProductsLoadFailed(error: any): void {
        console.log(error);
    }
}
