import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: any = [];
  userName!: string | null;
  filteredCategories: any[] = [];
  searchTerm: string = '';
  constructor(private http: HttpClient , private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.userName = this.route.snapshot.paramMap.get('name');
   
    this.http.get<any[]>('https://localhost:7116/api/Category').subscribe((response: any) => {
      console.log(response);
      this.categories = response;
      this.filteredCategories = [...this.categories];
    });
  }   
  filterCategories() {
    
    if (this.searchTerm.trim()) {
      this.filteredCategories = this.categories.filter((category: { name: string }) =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCategories = [...this.categories]; 
    }
  } 
  onSelect(category: any) {
    console.log(category.name);
    if(category.name != null) {
      
    this.router.navigate(['product', category.name,this.userName]);
  }
  } 
  Home() {
    this.router.navigate(['home']);
  }                                         
}
      