// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.css'
// })
// export class ProductComponent  {
//   categoryId!: string | null;
//   products: any = [];
//   constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router) {}
//     ngOnInit() {
//       this.categoryId = this.router.snapshot.paramMap.get('name');
//       console.log("id "+this.categoryId);
//       this.http.get<any[]>('https://localhost:7116/api/Product/category/' + this.categoryId).subscribe((response: any) => {
//         console.log(response);
//         this.products = response;
//       });
//     }
//     productfunction(product: any){
//       this.route.navigate(['product-detail',product.name]);
//     }

// }
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  categoryId!: string | null;
  products: any[] = [];
  currentPage = 1;
  pageSize = 2;
  totalItems = 0; 
  totalPages = 0; 

  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
   
    this.categoryId = this.router.snapshot.paramMap.get('name');
    if (this.categoryId) {
      this.loadProducts();
    }
  }

  loadProducts() {
   
    const url = `https://localhost:7116/api/Product/Category/${this.categoryId}?page=${this.currentPage}&pageSize=${this.pageSize}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        this.products = response.products;
        this.totalItems = response.totalCount; 
        this.totalPages = Math.ceil(this.totalItems / this.pageSize); 
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  productfunction(product: any) {
   
    this.route.navigate(['product-detail', product.name]);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts(); 
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts(); 
    }
  }
  Home() {
    this.route.navigate(['home']);
  } 
}
