import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FeaturesComponent } from './features/features.component';

import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ApiService } from 'C:/Users/nastu/Desktop/shop/src/app/features/apiservice.service';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'cart', component: CartComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    MainComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ApiService,
    FeaturesComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };
