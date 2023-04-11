import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './features/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop';
  data: any[] = [];
  cart: any[] = [];
  cartItems: any[] = [];

  constructor(private apiService: ApiService) {}

  openCart() {
    window.open('/cart', '_blank');
  }

  ngOnInit() {
    this.apiService.getData().subscribe((data: any[]) => {
      this.data = data;
      this.cartItems = this.getCart();
      for (let i = 0; i < this.cartItems.length; i++) {
        this.cartItems[i].count = this.getItemCount(this.cartItems[i]);
      }
    });
  }

  getCart(): any[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  getItemCount(item: any): number {
    const cart = this.getCart();
    const cartItem = cart.find((cartItem: any) => cartItem.title === item.title);
    if (cartItem) {
      return cartItem.count;
    }
    return 0;
  }
  getTotalItemCount(): number {
    const cart = this.getCart();
    let totalCount = 0;
    for (let i = 0; i < cart.length; i++) {
      totalCount += cart[i].count;
    }
    return totalCount;
  }
}