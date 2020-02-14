import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-filter-bar',
    templateUrl: './filter-bar.component.html',
    styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
    @ViewChild('selectElement') public selectElement: ElementRef;

    @ViewChild('lowHigh') public lowHighEl: ElementRef;
    @ViewChild('highLow') public highLowEl: ElementRef;
    @ViewChild('AtoZ') public AtoZEl: ElementRef;
    @ViewChild('ZtoA') public ZtoAEl: ElementRef;

    constructor(private router: Router) { }

    public url = window.location.pathname;
    ngOnInit(): void { }

    ngAfterViewInit(): void {
        console.log(this.url + `?pb=desc`);


        // @ts-ignore
        let instances = M.FormSelect.init(this.selectElement.nativeElement, {
            dropdownOptions: {
                coverTrigger: false
            }
        });

        var slider = document.getElementById('price-slider');
        // @ts-ignore
        noUiSlider.create(slider, {
            start: [0, 100],
            connect: true,
            step: 1,
            orientation: 'horizontal',
            tooltips: true,
            range: {
                'min': 0,
                'max': 100
            },
            margin: 10,
            // @ts-ignore
            format: wNumb({
                decimals: 0
            })
        });
    }

    public sortFilter(e) {
        // @ts-ignore
        let instance = M.FormSelect.init(this.selectElement.nativeElement, {
            dropdownOptions: {
                coverTrigger: false
            }
        });

        const clickedSelect = document.getElementsByClassName('selected')[0];
        console.log(clickedSelect.firstChild.textContent);

        if (clickedSelect.firstChild.textContent == 'Price ascending') {
            if (window.location.href.includes('?pb=asc')) return
            else this.router.navigate([this.url + '?pb=asc']);
        } else if (clickedSelect.firstChild.textContent == 'Price descending') {
            if (window.location.href.includes('?pb=desc')) return
            else this.router.navigate([this.url + '?pb=desc']);
        }
    }

}
