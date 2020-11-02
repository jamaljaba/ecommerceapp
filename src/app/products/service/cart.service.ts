import { ProductsComponent } from './../products.component';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productlistRef:any=[]
  constructor(public router: Router,private db: AngularFireDatabase) { }

 getproductlist() {
    this.productlistRef = this.db.list('productlist');
    return this.productlistRef;
  }

}
