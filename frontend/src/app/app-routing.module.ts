import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { SigninComponent } from './signin/signin.component';
import { SigninAdminComponent } from './signin-admin/signin-admin.component';
import { ProductComponent } from './product/product.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'home', component : HomeComponent},
  {path : 'home-admin', component : HomeAdminComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'register-admin', component : RegisterAdminComponent },
  {path : 'signin', component : SigninComponent },
  {path : 'signin-admin', component : SigninAdminComponent },
  {path : 'product', component : ProductComponent },
  { path: 'product/:name', component: ProductComponent }, 
  {path : 'product-admin', component : ProductAdminComponent },
  {path : 'category/:name', component : CategoryComponent },
  {path : 'category', component : CategoryComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
