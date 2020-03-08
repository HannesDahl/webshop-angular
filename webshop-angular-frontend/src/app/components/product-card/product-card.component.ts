import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

    @Input() public product: any;
    @Input() public randomProducts: any;

    constructor(
        private _cart: CartService
    ) { }

    ngOnInit() { }

    addToCart(e) {
        e.preventDefault();
        let id;
        if (this.product.product_id) id = this.product.product_id;
        else id = this.product.id;
        this._cart.addToCart(id);
    }

}
