import { CartService } from './service/cart.service';
import { AuthService } from './../user/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { GlobalitemsService } from '../utility/globalitems.service';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products:any=[]
  lowValue: number = 0;
  highValue: number = 10;
  length: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[]
  cart_counter:any=0;
  cartlist:any=[]
 totalprice:any=0;;
  tempData={
    key:'',
    imgurl:'',
    price:0,
    productName:'',
    unitprice:0,
    num:""
  }
  tempArray:any=new Array()

  constructor(public auth: AuthService,public cartservice: CartService,public globalitem:GlobalitemsService,public router:Router) {
    this.getProductListdata()
  }

  ngOnInit() {
// this.pageSize=this.products.length;
}

  getProductListdata(){
  this.cartservice.getproductlist().snapshotChanges().subscribe(data => {
    this.products = [];
    data.forEach(item => {
      let a = item.payload.toJSON();
      a['$key'] = item.key;
      this.products.push(a);
    })
    console.log("product data : ",this.products);
    this.pageSizeOptions = [3,5,10,15,this.products.length];
  })
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
  addtoCart(imgUrl:string,price:any,productName:any,key){
    this.totalprice+=Number(price);
    this.tempData={
      key:key,
      imgurl:imgUrl,
      price:price,
      productName:productName,
      unitprice:price,
      num:""
    }
    this.cartlist.push(this.tempData)
    this.cart_counter++;
  }

  logout(){
    this.auth.SignOut();
    this.globalitem.showSuccess("you have successfully sign out","Success")
    this.router.navigate(["user"])
  }

  //this function will used for iterate unique items and its quantity
  tempcartservice(){
    if(this.cart_counter > 0){
      let counter=0;
      for(var index=0;index<this.cartlist.length;index++){
        let temData={
          key:this.cartlist[index]["key"],
          imgurl:this.cartlist[index]["imgUrl"],
          price:this.cartlist[index]["price"],
          unitprice:this.cartlist[index]["price"],
          productName:this.cartlist[index]["productName"],
          num:0
        }
        counter++;
        this.refineCart(temData)
      }
      if(counter === this.cartlist.length){
        this.filterArray()
        console.log("loop complete ");
      }
    }else{
      this.globalitem.showError("No product in your Cart","Failed")
    }
  }

  refineCart(product){
    const productExistInCart = this.cartlist
    .find(({key}) => key === product.key); // find product by key
       if (!productExistInCart) {
         this.cartlist.push({...product, num:1});
         // enhance "porduct" object with "num" property
         return;
       }
       productExistInCart.num = productExistInCart.num + 1;
       this.tempArray.push(productExistInCart)
       console.log("productExistInCart : ",productExistInCart);
  }
  filterArray() {
    var unique = this.tempArray.filter(function (elem, index, self) {
      return index === self.indexOf(elem);})
     this.cartlist = unique;
    let data={
      data:this.cartlist,
      totalPrice:this.totalprice
    }
    this.globalitem.setCartData(data)
     this.router.navigate(['cart']);
  }
}
