import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent  {
  categoryId!: string | null;
  products: any = [];
  constructor(private http: HttpClient, private router: ActivatedRoute) {}
    ngOnInit() {
     
      this.categoryId = this.router.snapshot.paramMap.get('name');
      console.log("id "+this.categoryId);
      this.http.get<any[]>('https://localhost:7116/api/Product/category/' + this.categoryId).subscribe((response: any) => {
        console.log(response);
        this.products = response;
      });
    }

}
