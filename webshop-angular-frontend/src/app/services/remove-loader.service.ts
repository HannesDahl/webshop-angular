import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RemoveLoader {

    constructor() { }

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
