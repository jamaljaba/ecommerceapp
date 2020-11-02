import { GlobalitemsService } from 'src/app/utility/globalitems.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/user/service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
// import {MatTableDataSource} from '@angular/material';

export interface Element {
  position:number
  name: string
  quantity: number;
  totalPrice: string;
}

const ELEMENT_DATA: Element[] = [
  {position:1,name: 'whole ', quantity: 3, totalPrice: '60 AED'},
  {position:1,name: 'chnna', quantity: 3, totalPrice: '60 AED'},
  {position:1,name: 'kheer', quantity: 3, totalPrice: '60 AED'},
  {position:1,name: 'Muhammad', quantity: 3, totalPrice: '60 AED'},

];
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  address:any=null;
  submitted:boolean;
  totalPrice:any=0;
  loading:any;
  checkoutData:any=[]
  displayedColumns = ['position','name', 'quantity', 'totalPrice','actions'];
  dataSource = ELEMENT_DATA;
  constructor(public authenticationService: AuthService,
    public globalitem:GlobalitemsService,
    public activate_route : ActivatedRoute,
    public router:Router) {
      this.globalitem.getCartData().then(data => {
        // console.log("data is ", data);
        this.checkoutData=data.data;
        this.totalPrice=data.totalPrice
      });
    }

  ngOnInit(): void {
  }

  onKey(value){
    this.address += value;
  }

  orderNow(){
    if(this.checkoutData.length > 0){
      let order:any={
        deliver_Address:this.address,
        totalPrice:this.totalPrice,
        orderlist:this.checkoutData,
      }
      this.authenticationService.setUserOrders(order)
      .then((res) => {
        this.globalitem.showSuccess("Order placed Successfully!","Success")
        this.router.navigate(['products']);
     }).catch((error) => {
       this.globalitem.showError(error.message,"Error")
     })
    }else{
      this.globalitem.showError("No product in your Cart","Error")
    }

  }

  productpage(){
    this.router.navigate(['products'])
  }

  decrement(index){
    // console.log("index --: ",index);
    for(var i=0;i<this.checkoutData.length;i++){
      if(i == index){
        let templength=this.checkoutData[i].num.slice(0, -1);
        this.checkoutData[i].price = this.checkoutData[i].unitprice;
        this.checkoutData[i].num=templength;
      }
    }
    this.totalPriceCalculation()
  }

  increment(index){
    // console.log("index ++: ",index);

    for(var i=0;i<this.checkoutData.length;i++){
      if(i === index){
        let templength=this.checkoutData[i].num+1;
        this.checkoutData[i].num=templength;
        this.checkoutData[i].price = this.checkoutData[i].unitprice;
        this.totalPriceCalculation()
      }
    }

  }

  removeItem(index){
    this.checkoutData.splice(index, 1);
    this.totalPriceCalculation()
    if(this.checkoutData.length < 1){
      this.globalitem.clearstorage()
    }
  }

  totalPriceCalculation(){
    let price=0;
    this.totalPrice=0;
    for(var i=0;i<this.checkoutData.length;i++){
      price+= Number(this.checkoutData[i].price) * this.checkoutData[i].num.length;
      // console.log("total price : ",price);
    }
    this.totalPrice=price
  }

}

