import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
    @Input() public product: any;
    @Input() public randomProducts: any;
    productImage: Observable<string | null>;

    constructor(
        private _cart: CartService,
        private storage: AngularFireStorage
    ) { }

    ngOnInit() {
        if (this.product) {
            const images = JSON.parse(this.product.image);
            for (let i = 0; i < images.length; i++) {
                const ref = this.storage.ref(images[0]);
                this.productImage = ref.getDownloadURL();
            }
        } else if (this.randomProducts) {
            const randomImages = JSON.parse(this.randomProducts.image);
            for (let i = 0; i < randomImages.length; i++) {
                const ref = this.storage.ref(randomImages[0]);
                this.productImage = ref.getDownloadURL();
            }
        }
    }

    addToCart(e) {
        e.preventDefault();
        let id;
        if (this.product.product_id) id = this.product.product_id; else id = this.product.id;
        this._cart.addToCart(id);
    }

    public checkNumber(num) {
        num = JSON.stringify(num);
        num = num.split('.');

        if (num[1] < 10) {
            return num[0] + ',' + num[1] + '0';
        } else {
            return num;
        }

        console.log(num);
    }
}
