import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  productName!: string | null;
  userName!: string | null;
  product:any;
  products: any = [];
  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router) {}
  
  ngOnInit() {
     
    this.productName = this.router.snapshot.paramMap.get('name');
    this.userName = this.router.snapshot.paramMap.get('userName');
    console.log("id "+this.productName);
    if(this.productName != null){
    this.http.get<any>('https://localhost:7116/api/Product/' + this.productName).subscribe((response: any) => {
      console.log("hello" + response.name);
      this.product = response;
         
      this.http.post('https://localhost:7116/api/Cart', this.product).subscribe({
        next: (response: any) => {
          alert('Product added to Cart successfully!');
        },
        error: (err) =>  alert('Register failed'),
      });

    });
  }
  else{
    this.http.get<any>('https://localhost:7116/api/Cart').subscribe((response: any) => {
      console.log(response);
      this.products = response;
    });
  }

  }
 orderfunction(){
  this.route.navigate(['order']);
 }

 Home() {
  this.route.navigate(['home']);
} 
   removeFromCart(productId : any){
    console.log(productId);
    this.http.delete('https://localhost:7116/api/Cart/' + productId).subscribe({
      next: (response: any) => {
        alert('Product removed from Cart successfully!');
      },
      error: (err) =>  alert('Register failed'),
    });

   }
 
}
