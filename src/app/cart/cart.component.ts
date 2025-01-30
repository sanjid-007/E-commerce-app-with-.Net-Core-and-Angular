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
    console.log("id "+this.productName + " " + this.userName);
    const productCart = {
      userName : this.userName,
      productName : this.productName,
      quantity : "1"
     };
    if(this.productName != null){
    this.http.get<any>('https://localhost:7116/api/Product/' + this.productName).subscribe((response: any) => {
      console.log("hello" + response.name);
      this.product = response;
      
     
      this.http.post('https://localhost:7116/api/Cart', productCart).subscribe({
        next: (response: any) => {
          alert('Product added to Cart successfully!');
        },
        error: (err) =>  alert('Register failed'),
      });

    });
  }
  else{
    this.http.get<any>('https://localhost:7116/api/Cart/' + this.userName).subscribe((response: any) => {
      console.log(response);
      this.products = response;


      this.products.forEach((item: any) => {
        item.productDetails.price = parseFloat(item.productDetails.price);
        item.quantity = parseInt(item.quantity, 10);
        item.netPrice = item.productDetails.price * item.quantity; 
      });




    });
  }

  }
 orderfunction(){
  this.route.navigate(['order']);
 }

 Home() {
  this.route.navigate(['home']);
} 
   
   getTotalPrice() {
    let total = 0;
    this.products.forEach((item: any) => {
      total+= item.netPrice;
    });
    
    return total;
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.http.post('https://localhost:7116/api/Cart', { 
        userName: this.userName, 
        productName: product.productDetails.name, 
        quantity: "-1" 
      }).subscribe({
        next: (response: any) => console.log('Quantity decreased'),
        error: (err) => alert('Failed to update cart'),
      });
    } else {
     
      this.removeFromCart(product.id);
    }
   
  }
  
  removeFromCart(productId: any) {
    this.http.delete('https://localhost:7116/api/Cart/' + productId).subscribe({
      next: (response: any) => {
        alert('Product removed from Cart successfully!');
        this.products = this.products.filter((item: any) => item.id !== productId);
      },
      error: (err) => alert('Failed to remove product from cart'),
    });
  }
}
