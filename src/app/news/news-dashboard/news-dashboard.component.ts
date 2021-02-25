import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { NewsService } from '../news.service';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-news-dashboard',
    templateUrl: './news-dashboard.component.html',
    styleUrls: ['./news-dashboard.component.scss']
})
export class NewsDashboardComponent implements OnInit {

    title: string;
    image: string = null;
    content: string;
    active = true;
    file: any;
    path: string;
    imageURL: string | ArrayBuffer;
    loading: boolean;

    constructor(
        private readonly authService: AuthService,
        private readonly newsSerwice: NewsService,
        private readonly storage: AngularFireStorage,
        private readonly toastr: ToastrService,
        private readonly router: Router,
    ) { }

    ngOnInit(): void {
    }

    async createPost() {
        this.image = null;
        this.loading = true;

        if(this.path && this.file) {
            const task = this.storage.upload(this.path, this.file);
            this.image = await this.getDownloadUrl(task, this.path).toPromise();
        }

        const data = {
            content: this.content,
            image: this.image,
            active: this.active,
            published: new Date(),
            title: this.title,
            author: this.authService.authState.displayName || this.authService.authState.email,
            authorId: this.authService.currentUserId,
        }

        this.newsSerwice.create(data).then(() => {
            this.toastr.success('Pomyślnie dodano!', 'Sukces');
            this.router.navigate(['/news']);
        }).finally(() => {
            this.loading = false;
        });
    }

    uploadImage(event) {
        this.file = event.target.files[0];
        this.path = `news/${this.file.name}`;
        if (this.file.type.split('/')[0] !== 'image') {
            return alert('Możesz dodać tylko obraz!');
        } else {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);

            reader.onload = async () => {
                 this.imageURL = reader.result;
            };
        }
    }

    private getDownloadUrl(
        uploadTask: AngularFireUploadTask,
        path: string,
      ): Observable<string> {
        return from(uploadTask).pipe(
          switchMap((_) => this.storage.ref(path).getDownloadURL()),
        );
      }
}
