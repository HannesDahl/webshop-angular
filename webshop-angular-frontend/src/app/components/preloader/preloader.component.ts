import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RemoveLoader } from '../../services/remove-loader.service';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
    @ViewChild('loaderWrapper') public loaderWrapper: ElementRef;

    constructor(private removeLoader: RemoveLoader) { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        if (window.location.pathname == '/') {
            this.loaderWrapper.nativeElement.style.width = '70%';
        }
        this.removeLoader.remove(this.loaderWrapper.nativeElement);
    }

}
