import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { UserComponent } from './users/users.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
  { path: '', component: DescriptionComponent},
  { path: 'users', component: UserComponent },
  { path: 'products', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
