import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  // product: any;
  // constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router) {}
  // ngOnInit() {
     
  //   // this.product = this.router.snapshot.paramMap.get('product');
  //   // console.log(this.product)
  // }

  productName!: string | null;
  product:any;
  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router) {}
    ngOnInit() {
     
      this.productName = this.router.snapshot.paramMap.get('name');
      console.log("id "+this.productName);
      this.http.get<any>('https://localhost:7116/api/Product/' + this.productName).subscribe((response: any) => {
        console.log(response);
        this.product = response;
      });
    }
   orderfunction(){
    this.route.navigate(['order']);
   }

   Home() {
    this.route.navigate(['home']);
  } 
   

}
