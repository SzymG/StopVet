import { NgModule } from '@angular/core';
import { PageComponent } from './page/page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { OfferComponent } from './offer/offer.component';
import { StoreComponent } from './store/store.component';
import { HowtoComponent } from './howto/howto.component';

const routes: Routes = [
  {path: '', component: PageComponent},
]

@NgModule({
  declarations: [PageComponent, ContactComponent, AboutComponent, OfferComponent, StoreComponent, HowtoComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CarouselModule,
  ]
})
export class PageModule { }
