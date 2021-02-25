import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './page/page.module#PageModule'},
  {path: 'news', loadChildren: './news/news.module#NewsModule'},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', pathMatch: 'full'},
  {path: 'not-found', loadChildren: './error/error.module#ErrorModule'},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
