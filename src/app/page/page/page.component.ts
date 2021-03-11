import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NewsService } from 'src/app/news/news.service';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { ScrollService } from 'src/app/shared/services/scroll.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewInit, OnDestroy {

    customOptions: OwlOptions = {
        loop: true,
        dots: true,
        autoplay: true,  
        navSpeed: 1000,
        autoplayTimeout: 5000,
        center: true,
        navText: ['<img src="assets/left-icon.png">','<img src="assets/right-icon.png">'],
        responsive: {
            0: {
                items: 1.2
            },
        },
        nav: true
    }

    carouselleNews = null;
    textLength = window.innerWidth / 5;
    headerLength = window.innerWidth / 20;
    cookieAccepted = true;
    cookieAcceptanceKey = 'cookiesInfoAccepted';
    isMobile: boolean;
    currentYear = new Date().getFullYear();

    constructor(
        private readonly newsService: NewsService,
        private readonly scrollService: ScrollService,
        private readonly location: Location,
        public auth: AuthService,
    ) {
        this.handleScroll = this.handleScroll.bind(this);
    }

    ngOnInit(): void {
        this.cookieAccepted = this.getCookie();

        this.handleNavbarView();

        document.addEventListener('scroll', this.handleScroll);
    }

    ngAfterViewInit(): void {
        this.newsService.getActiveNews().pipe(first()).subscribe((res) => {
            this.carouselleNews = res.map((news) => {
                const id = news.payload.doc.id;
                const {title, content, image} = news.payload.doc.data() as any;
                return {id, title, content, image};
            });
            
            setTimeout(() => {
                this.checkWindowScroll();
            }, 500);
        });
    }

    checkWindowScroll() {
        if(window.location.hash) {
            this.scrollToElement(window.location.hash.substring(1));
        }
    }

    handleScroll() {
        this.handleNavbarView();

        if(!this.scrollService.isScrolling()) {
            var currentHash = "#home";
            
            const anchorElements = document.querySelectorAll('.anchor_tags');
            anchorElements.forEach((elem) => {
                var distance = elem.getBoundingClientRect().top - 80;
                var hash = elem.id.substring(0, elem.id.length - 8);

                if (distance <= 80 && distance >= -80 && currentHash != hash) {
                    this.location.replaceState(`/#${hash}`);
                    currentHash = hash;
                    document.getElementById('animation').className = `start-${hash}`;
                }
            });
        }
    }

    handleNavbarView() {
        this.isMobile = window.innerWidth <= 960;
        
        if(!this.isMobile) {
            const offset = window.pageYOffset;

            const heightByOffset = (-19/15 * offset + 250);
            const leftByOffset = (-4/15 * offset + 50);
            const topByOffset = (-2/15 * offset + 30);
    
            const height = Math.max(heightByOffset, 60);
            const left = Math.max(leftByOffset, 10);
            const top = Math.max(topByOffset, 10);
    
            document.getElementById('logo').style.opacity = '1';
            document.getElementById('logo').style.height = `${height}px`;
            document.getElementById('logo').style.width = `${height}px`;
            document.getElementById('logo').style.left = `${left}px`;
            document.getElementById('logo').style.top = `${top}px`;
        } else {
            const offset = window.pageYOffset;
            const styleOpacity = offset > 350 ? '1' : '0';
    
            document.getElementById('logo').style.opacity = styleOpacity;
        }
    }

    scrollToElement(element): void {
        this.scrollService.scrollToElement(element);
    }
    
    getCookie() {
        var name = this.cookieAcceptanceKey + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return true;
            }
        }
        return false;
    }

    acceptCookie() {
        var d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = this.cookieAcceptanceKey + "=" + true + ";" + expires + ";path=/";
        this.cookieAccepted = this.getCookie();
    }

    ngOnDestroy() {
        document.removeEventListener("scroll", this.handleScroll);
        this.carouselleNews = null;
    }
}
