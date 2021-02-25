import { NgModule } from '@angular/core';
import { NewsDashboardComponent } from './news-dashboard/news-dashboard.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsListComponent } from './news-list/news-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { NewsEditComponent } from './news-edit/news-edit.component';

const routes: Routes = [
  {path: '', component: NewsListComponent, pathMatch: 'full'},
  {
    path: 'create',
    component: NewsDashboardComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {path: '', component: NewsListComponent, pathMatch: 'full'},
  {
    path: 'edit/:id',
    component: NewsEditComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {path: ':id', component: NewsDetailComponent},
]

@NgModule({
  declarations: [NewsDashboardComponent, NewsDetailComponent, NewsListComponent, NewsEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
})

export class NewsModule {}