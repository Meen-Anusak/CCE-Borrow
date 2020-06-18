import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [NavBarComponent, SideBarComponent, SideMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
  ],
  exports:[
    MatCardModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    SideBarComponent,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
  ]
})
export class MaterialModule { }
