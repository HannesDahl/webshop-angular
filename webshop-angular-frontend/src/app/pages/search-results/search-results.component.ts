import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
    @Output() public products: Array<Object>;

    constructor(private _http: HttpService) { }

    public url = window.location.href.replace(/^.*[\\\/]/, '');
    ngOnInit() {
        this._http.getSearchProducts(this.url).subscribe(
            this._onProductsLoaded.bind(this),
            this._onProductsLoadFailed.bind(this));
    }

    private _onProductsLoaded(data: any): void {
        this.products = data;
        console.log(this.products);

    }

    private _onProductsLoadFailed(error: any): void {
        console.log(error);
    }
}
