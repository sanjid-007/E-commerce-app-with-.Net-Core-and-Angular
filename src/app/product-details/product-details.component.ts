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
  userName!: string | null;
  product:any;
  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router) {}
    ngOnInit() {
     
      this.productName = this.router.snapshot.paramMap.get('name');
      this.userName = this.router.snapshot.paramMap.get('userName');

      console.log("id "+this.productName);
      this.http.get<any>('https://localhost:7116/api/Product/' + this.productName).subscribe((response: any) => {
        console.log(response);
        this.product = response;
        console.log(this.product.name);

      });
    }
   orderfunction(){
    this.route.navigate(['order']);
   }

   Home() {
    this.route.navigate(['home']);
  } 
   addtocart(){
    console.log(this.product.name);
    this.route.navigate(['cart',this.product.name, this.userName]);
   }
   carthistory(){
    this.route.navigate(['cart',this.userName]);
   }

}
