import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { NewsService } from '../news.service';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
    loading: boolean;
    news: any;

    constructor(
        private readonly newsService: NewsService,
        public auth: AuthService,
        ) {
            this.loading = true;
    }

    ngOnInit(): void {
        this.loading = true;
        this.newsService.getNews().pipe(first()).subscribe((res) => {
            this.news = res;
            this.loading = false;
        });
    }

    getUrl(news) {
        return news.payload.doc.data().image ? `url('${news.payload.doc.data().image}')` : 'url(/assets/cowshed.jpg)';
    }
}
