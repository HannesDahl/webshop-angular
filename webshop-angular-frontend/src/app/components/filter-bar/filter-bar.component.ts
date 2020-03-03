import { Component, OnInit, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
    mySubscription

    constructor(private router: Router, private QueryFilter: QueryFilterService) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
            }
        });
    }

    public url = window.location.pathname;
    ngOnInit(): void { }

    ngAfterViewInit(): void {
        // @ts-ignore
        M.FormSelect.init(this.selectElement.nativeElement);

        let prices = [];
        for (let i = 0; i < this.products.length; i++) {
            prices.push(this.products[i].price);
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
        });
    }

    ngOnDestroy() {
        if (this.mySubscription) {
            this.mySubscription.unsubscribe();
        }
    }

    public sortFilter(e) {
        if (e.target.value) {

            const queryValue = this.QueryFilter.handleQueryParams(location.search, `${e.target.name}=${e.target.value}`);

            console.log(queryValue);

            history.pushState(null, null, this.url + queryValue);

            // this.router.navigate([this.url], queryValue);

            // this.router.navigate([this.url], {
            //     queryParams: {}
            // });
        }
    }

}
