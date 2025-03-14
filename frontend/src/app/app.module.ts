import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { SigninAdminComponent } from './signin-admin/signin-admin.component';
import { ProductComponent } from './product/product.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { AuthInterceptor } from './auth.interceptor';
import { CategoryComponent } from './category/category.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    SigninComponent,
    HomeAdminComponent,
    RegisterAdminComponent,
    SigninAdminComponent,
    ProductComponent,
    ProductAdminComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
