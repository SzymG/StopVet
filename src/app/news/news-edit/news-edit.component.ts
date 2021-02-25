import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { NewsService } from '../news.service';
import { first, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-news-edit',
    templateUrl: './news-edit.component.html',
    styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit {
    title: string;
    image: string = null;
    content: string;
    active = true;
    file: any;
    path: string;
    imageURL: string | ArrayBuffer;
    loading: boolean;
    id: any;
    initialImage: string;

    constructor(
        private readonly authService: AuthService,
        private readonly newsSerwice: NewsService,
        private readonly storage: AngularFireStorage,
        private readonly toastr: ToastrService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.newsSerwice.getSingleNewsData(this.id).pipe(first()).subscribe((data) => {
            if(!(!!data)) {
                this.router.navigate(['/error']);
            }
            else {
                this.title = data.title;
                this.content = data.content;
                this.active = data.active;
                this.image = data.image;
                this.imageURL = data.image;
                this.initialImage = data.image;
            }
        })
    }

    async editPost() {
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

        this.newsSerwice.update(this.id, data).then(() => {
            if(this.path && this.file) {
                this.storage.storage.refFromURL(this.initialImage).delete();
            }
        
            this.toastr.success('Pomyślnie dodano!', 'Sukces');
            this.router.navigate(['/news']);
        })
        .catch(() => {
            this.toastr.error('Nie udało się usunąć', 'Błąd');
        })
        .finally(() => {
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
