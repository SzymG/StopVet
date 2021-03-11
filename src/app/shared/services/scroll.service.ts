import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    scrollingState = new BehaviorSubject(false);

    constructor() { }

    scrollToElement(element, isSection = true): void {
        const el =  isSection ? document.getElementById(`${element}-section`) : document.getElementById(`${element}`);
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;

        this.scrollingState.next(true);
        window.scrollTo({top: isSection ? y : y - 40, behavior: 'smooth'});
        if(isSection) {
            document.getElementById('animation').className = `start-${element}`;
        }

        let intervalIterations = 0;
        const checkIfScrollToIsFinished = setInterval(() => {
            if (el.getBoundingClientRect().top < 81 || intervalIterations == 10) {
                clearInterval(checkIfScrollToIsFinished);
                this.scrollingState.next(false);
            }
            intervalIterations++;
        }, 100);
    }

    isScrolling() {
        return this.scrollingState.value;
    }
}
