import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatExpansionModule, MatInputModule, MatProgressSpinnerModule, MatIconModule,
    MatCheckboxModule, MatGridListModule],
  exports: [MatButtonModule, MatToolbarModule, MatExpansionModule, MatInputModule, MatProgressSpinnerModule, MatIconModule,
    MatCheckboxModule, MatGridListModule]
})
export class MaterialModule { }
