import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

    @Input() public product: Object;
    @Input() public randomProducts: Object;

    constructor() { }

    ngOnInit() { }

    public replaceSpaces(str: string): string {
        return str.replace(/\s/g, '-');
    }

}
