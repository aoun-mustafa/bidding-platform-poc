import { Routes } from '@angular/router';
import { FiltersComponent } from './filters/filters.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'filters',
    component: FiltersComponent
  }
];
