import { Component, OnInit, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { QueryFilterService } from '../../services/query-filter.service';

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
    @Input() products: any;
    categories: any;
    mySubscription: any;
    categoryName: string;

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
        console.log(this.categories);
    }

    private _onCategoryPricesLoadFailed(error: any): void {
        console.error(error);
    }

    ngAfterViewInit(): void {
        // @ts-ignore
        M.FormSelect.init(this.selectElement.nativeElement);

        let prices = [];
        if (this.categories) {
            for (let i = 0; i < this.categories.length; i++) {
                prices.push(this.categories[i].price);
            }
        }
        let minPrice = (prices.sort(function (a, b) { return a - b }))[0];
        let maxPrice = (prices.sort(function (a, b) { return b - a }))[0];

        this.minInput.nativeElement.value = minPrice;
        this.maxInput.nativeElement.value = maxPrice;
        this.minInput.nativeElement.setAttribute('min', minPrice);
        this.minInput.nativeElement.setAttribute('max', maxPrice);
        this.maxInput.nativeElement.setAttribute('min', minPrice);
        this.maxInput.nativeElement.setAttribute('max', maxPrice);

        let slider = document.getElementById('price-slider');
        // @ts-ignore
        noUiSlider.create(slider, {
            start: [minPrice, maxPrice],
            connect: true,
            step: 1,
            orientation: 'horizontal',
            tooltips: true,
            disabled: true,
            range: {
                'min': minPrice,
                'max': maxPrice
            },
            margin: 10,
            // @ts-ignore
            format: wNumb({
                decimals: 0
            })
        });

        // @ts-ignore
        slider.noUiSlider.on('update', () => {
            // @ts-ignore
            let currentSliderValues = slider.noUiSlider.get();

            this.minInput.nativeElement.value = currentSliderValues[0];
            this.maxInput.nativeElement.value = currentSliderValues[1];

            history.pushState(null, null, this.url + this.QueryFilter.handleQueryParams(location.search, `pr=${currentSliderValues[0]}-${currentSliderValues[1]}`));
        });
    }

    public sortFilter(e) {
        if (e.target.value) {
            const queryValue = this.QueryFilter.handleQueryParams(location.search, `${e.target.name}=${e.target.value}`);
            history.pushState(null, null, this.url + queryValue);
        } else {
            history.pushState(null, null, this.url + this.QueryFilter.removeQueryParam(location.search, `${e.target.name}`));
        }
    }

}
