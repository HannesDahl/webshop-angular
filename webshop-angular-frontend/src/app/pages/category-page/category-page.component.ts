import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

    @Output() public products: Array<Object>;

    @ViewChild('categoryNameHeader', { static: false }) public categoryNameHeader: ElementRef;

    constructor(private _http: HttpService) { }

    private url = window.location.href.replace(/^.*[\\\/]/, '');
    ngOnInit() {

        this._http.getCategoryProducts(this.url).subscribe(
            this._onProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));
    }

    private _capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    private _onProductsLoaded(data: any): void {
        this.products = data;
        this.categoryNameHeader.nativeElement.textContent = `Showing: ${(this.url)}`;
        console.log(this.products);
    }

    private _onProductsLoadFailed(error: any): void {
        console.error(error);
    }
}
