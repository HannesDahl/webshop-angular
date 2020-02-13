import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
    @Output() public products: Array<Object>;
    @Output() public randomProducts: Array<Object>;

    constructor(private _http: HttpService) { }

    public url = window.location.href.replace(/^.*[\\\/]/, '');
    ngOnInit() {
        this._http.getSearchProducts(this.url).subscribe(
            this._onProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));

        this._http.getRandomProducts().subscribe(
            this._onRandomProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));
    }

    private _onRandomProductsLoaded(data: any): void {
        this.randomProducts = data;
        console.log(this.randomProducts);
    }

    private _onProductsLoaded(data: any): void {
        this.products = data;
        console.log(this.products);
    }

    private _onProductsLoadFailed(error: any): void {
        console.error(error);
    }
}
