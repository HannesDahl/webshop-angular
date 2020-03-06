import { Component, OnInit, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { QueryFilterService } from '../../services/query-filter.service';
declare var noUiSlider: any;
declare var M: any;

@Component({
    selector: 'app-filter-bar',
    templateUrl: './filter-bar.component.html',
    styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
    @ViewChild('selectElement') public selectElement: ElementRef;
    @ViewChild('lowHigh') public lowHighEl: ElementRef;
    @ViewChild('highLow') public highLowEl: ElementRef;
    @ViewChild('AtoZ') public AtoZEl: ElementRef;
    @ViewChild('ZtoA') public ZtoAEl: ElementRef;
    @ViewChild('minInput') public minInput: ElementRef;
    @ViewChild('maxInput') public maxInput: ElementRef;
    @ViewChild('priceSlider') public priceSlider: ElementRef;
    @ViewChild('categorySearch') public categorySearch: ElementRef;
    @ViewChild('categorySearchLabel') public categorySearchLabel: ElementRef;
    @Input() products: any;
    categories: any;
    mySubscription: any;
    categoryName: string;
    prices = [];
    minPrice: any;
    maxPrice: any;
    priceRangeValues: any;

    constructor(private router: Router, private QueryFilter: QueryFilterService, private _http: HttpService) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.router.navigated = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    public url = window.location.pathname;
    ngOnInit(): void {
        this.categoryName = window.location.href.replace(/^.*[\\\/]/, '');
        this.categoryName = this.categoryName.replace(/\?.*$/, '');
        this._http.getCategoryPrices(this.categoryName).subscribe(
            this._onCategoryPricesLoaded.bind(this),
            this._onCategoryPricesLoadFailed.bind(this));
    }

    private _onCategoryPricesLoaded(data: any): void {
        this.categories = data;

        M.FormSelect.init(this.selectElement.nativeElement);
        let slider = document.getElementById('price-slider');

        this.prices = [];
        for (let i = 0; i < this.categories.length; i++) {
            this.prices.push(this.categories[i].price);
        }

        this.minPrice = (this.prices.sort(function (a, b) { return a - b }))[0] - 1;
        this.maxPrice = (this.prices.sort(function (a, b) { return b - a }))[0] + 1;

        this.minInput.nativeElement.value = this.minPrice;
        this.maxInput.nativeElement.value = this.maxPrice;
        this.minInput.nativeElement.setAttribute('min', this.minPrice);
        this.minInput.nativeElement.setAttribute('max', this.maxPrice);
        this.maxInput.nativeElement.setAttribute('min', this.minPrice);
        this.maxInput.nativeElement.setAttribute('max', this.maxPrice);

        noUiSlider.create(this.priceSlider.nativeElement, {
            start: [this.minPrice, this.maxPrice],
            connect: true,
            step: 1,
            orientation: 'horizontal',
            tooltips: false,
            disabled: true,
            range: {
                'min': this.minPrice,
                'max': this.maxPrice
            },
            margin: 10,
            // @ts-ignore
            format: wNumb({
                decimals: 0
            })
        });

        // @ts-ignore
        this.priceSlider.nativeElement.noUiSlider.on('update', () => {
            // @ts-ignore
            let currentSliderValues = slider.noUiSlider.get();
            this.minInput.nativeElement.value = currentSliderValues[0];
            this.maxInput.nativeElement.value = currentSliderValues[1];
        });

        if (window.location.search.includes('pr=')) {
            this.priceRangeValues = this.getParameterByName('pr', window.location);
            this.priceRangeValues = this.priceRangeValues.split('-');
            // @ts-ignore
            slider.noUiSlider.set([parseInt(this.priceRangeValues[0]), parseInt(this.priceRangeValues[1])]);
            this.minInput.nativeElement.value = this.priceRangeValues[0];
            this.maxInput.nativeElement.value = this.priceRangeValues[1];
        } else {
            this.minPrice = this.minPrice;
            this.maxPrice = this.maxPrice;
        }

        // @ts-ignore
        slider.noUiSlider.on('change', () => {
            // @ts-ignore
            let currentSliderValues = slider.noUiSlider.get();
            history.pushState(null, null, this.url + this.QueryFilter.handleQueryParams(location.search, `pr=${currentSliderValues[0]}-${currentSliderValues[1]}`));
        });
    }

    ngAfterViewInit(): void {
        if (this.getParameterByName('s', window.location)) {
            this.categorySearch.nativeElement.value = this.getParameterByName('s', window.location);
            this.categorySearchLabel.nativeElement.classList.add('active');
        }
    }

    private _onCategoryPricesLoadFailed(error: any): void {
        console.error(error);
    }

    public sortFilter(e) {
        if (e.target.value) {
            const queryValue = this.QueryFilter.handleQueryParams(location.search, `${e.target.name}=${e.target.value}`);
            history.pushState(null, null, this.url + queryValue);
        } else {
            history.pushState(null, null, this.url + this.QueryFilter.removeQueryParam(location.search, `${e.target.name}`));
        }
    }

    public setPrice(e): void {
        e.preventDefault();
        if (parseInt(this.minInput.nativeElement.value, 10) > parseInt(this.maxInput.nativeElement.value, 10)) {
            M.toast({
                html: 'Minimum price can\'t be higher than maximum'
            })
        } else {
            this.priceSlider.nativeElement.noUiSlider.set([this.minInput.nativeElement.value, this.maxInput.nativeElement.value]);
            history.pushState(null, null, this.url + this.QueryFilter.handleQueryParams(location.search, `pr=${this.minInput.nativeElement.value}-${this.maxInput.nativeElement.value}`));
        }
    }

    public getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    public reloadWindow(): void {
        window.location.reload();
    }
}
