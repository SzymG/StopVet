import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../news';
import { NewsService } from '../news.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/core/auth.service';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements AfterViewInit {

    news: News;
    id: string;

    constructor(
        public auth: AuthService,
        private readonly route: ActivatedRoute,
        private readonly toastr: ToastrService,
        private readonly router: Router,
        private readonly storage: AngularFireStorage,
        private readonly newsService: NewsService,
    ) { }

    ngAfterViewInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.newsService.getSingleNewsData(this.id).pipe(first()).subscribe((data) => {
            if(!(!!data)) {
                this.router.navigate(['/error']);
            }
            else {
                this.news = data;
            }
        })
    }

    getUrl() {
        return this.news.image ? `url('${this.news.image}')` : 'url(/assets/cowshed.jpg)';
    }

    deleteNews() {
        const r = confirm("Czy na pewno chcesz usunąć tę aktualność?");

        if (r == true) {
            const id = this.route.snapshot.paramMap.get('id');
            const news = this.news;
            this.newsService.delete(id).then(() => {
                if(news.image) {
                    this.storage.storage.refFromURL(news.image).delete();
                }
                this.toastr.success('Pomyślnie usunięto!', 'Sukces');
                this.router.navigate(['/news']);
            }).catch(() => {
                this.toastr.error('Nie udało się usunąć', 'Błąd');
            })
        }
    }
}
