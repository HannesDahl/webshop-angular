import { Component, OnInit, Input } from '@angular/core';
import { AddToCartService } from '../../services/add-to-cart.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

    @Input() public product: any;
    @Input() public randomProducts: any;

    constructor(
        private _cart: AddToCartService
    ) { }

    ngOnInit() { }

    addToCart(e) {
        e.preventDefault();
        this._cart.addToCart(this.product.id);
    }

}
