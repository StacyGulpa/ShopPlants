import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})

export class FeaturesComponent implements OnInit {
  data?: any[];
   cart: any[] = [];
   cartItems: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData().subscribe((data) => {
      this.data = data;
      this.cartItems = this.getCart(); // Set cartItems to be the result of getCart()
    for (let i = 0; i < this.cartItems.length; i++) {
      this.cartItems[i].count = this.getItemCount(this.cartItems[i]);
    }
    });
  }

  addToCart(item: any) {
    const cartItem = {
      title: item.title,
      price: item.price,
      imgurl: item.imgurl,
      count: 1 // Добавляем новое свойство count со значением 1 при добавлении нового товара в корзину
    };
    if (localStorage.getItem('cart')) {
      const existingCart = JSON.parse(localStorage.getItem('cart')!);
      const itemIndex = existingCart.findIndex((cartItem: any) => cartItem.title === item.title);
      if (itemIndex !== -1) {
        // Если товар уже есть в корзине, то увеличиваем его количество на 1
        existingCart[itemIndex].count++;
      } else {
        existingCart.push(cartItem);
      }
      localStorage.setItem('cart', JSON.stringify(existingCart));
    } else {
      localStorage.setItem('cart', JSON.stringify([cartItem]));
    }
    console.log(`Додано до кошика: ${item.title}`);
  }

  getCart() {
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

  getTotal(): number {
    let total = 0;
    const cart = this.getCart();
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].count;
    }
    return total;
  }

}
