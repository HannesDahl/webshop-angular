import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import Swiper from 'swiper';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
    product: any;
    productImage: Observable<string | null>;
    public images: any = [];
    public imagesUrl: any = [];

    constructor(
        private _http: HttpService,
        private _cart: CartService,
        private storage: AngularFireStorage
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
        this.finalizeImages()
    }

    private finalizeImages() {
        this.images = JSON.parse(this.product.image);
        for (let i = 0; i < this.images.length; i++) {
            const ref = this.storage.ref(this.images[i]);
            this.imagesUrl.push(ref.getDownloadURL());
        }
        setTimeout(() => {
            this.initSwiper();
        }, 1000)
    }

    private initSwiper() {
        new Swiper('.swiper-container', {
            loop: true,
            preloadImages: true,
            slidesPerView: 'auto',
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    private _onProductsLoadFailed(error: any): void {
        console.log(error);
    }

    public addToCart(e) {
        e.preventDefault();
        this._cart.addToCart(this.product.id);
    }
}
