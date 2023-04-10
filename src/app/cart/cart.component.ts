import { Component, OnInit } from '@angular/core';
import { FeaturesComponent } from '../features/features.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private featuresComponent: FeaturesComponent) {}

  ngOnInit(): void {
    this.cartItems = this.featuresComponent.getCart();
  }
  getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  getTotal(productId: any): { count: number, totalPrice: number } {
    let count = 0;
    let totalPrice = 0;
    const cart = this.getCart();
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId === productId) {
        count++;
        totalPrice += parseFloat(cart[i].price);
      }
    }
    return { count, totalPrice };
  }
  getSubtotal(): number {
    let subtotal = 0;
    const cart = this.getCart();
    for (let i = 0; i < cart.length; i++) {
      subtotal += parseFloat(cart[i].price);
    }
    return subtotal;
  }
  
  getEstimatedShipping(): number {
    const subtotal = this.getSubtotal();
    
    return 0;
  }
  
  getTotalPrice(): number {
    const subtotal = this.getSubtotal();
    const estimatedShipping = this.getEstimatedShipping();
    const totalPrice = subtotal + estimatedShipping;
    return totalPrice;
  }
  }
