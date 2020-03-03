import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
    @ViewChild('loaderWrapper') public loaderWrapper: ElementRef;

    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        if (window.location.pathname == '/') {
            this.loaderWrapper.nativeElement.style.width = '70%';
        }
        this.remove(this.loaderWrapper.nativeElement);
    }

    public remove(el) {
        setTimeout(() => {
            el.style.opacity = 1;

            (function fade() {
                if ((el.style.opacity -= .1) < 0) {
                    el.style.display = "none";
                } else {
                    requestAnimationFrame(fade);
                }
            })();
        }, 250);
    }
}
