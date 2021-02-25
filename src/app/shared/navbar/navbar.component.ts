import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { ScrollService } from '../services/scroll.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    menuExpanded = false;
    isHomePage: boolean;

    constructor(
        public auth: AuthService,
        private scrollService: ScrollService,
        private router: Router,
        private location: Location,
    ) {
        this.router.events.subscribe((val) => {
            if(val instanceof NavigationEnd) {
                this.isHomePage = (val.url === '/' || val.url.substring(0, 2) === '/#');
            }
        });
    }

    ngOnInit(): void {
    }

    toggleMenu() {
        this.menuExpanded = !this.menuExpanded;
    }

    scrollToElement(e, element): void {
        if(e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.location.replaceState(`/#${element}`);
        this.scrollService.scrollToElement(element);
        this.menuExpanded = false;
    }

    scrollToHome() {
        if(this.isHomePage) {
            this.scrollToElement(null, 'home');
        }
    }
}
