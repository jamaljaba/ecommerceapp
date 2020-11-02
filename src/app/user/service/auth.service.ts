import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";
import { Router } from '@angular/router';
import { Userdatamodel } from '../datamodal/userdatamodel';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Orderdatamodel } from 'src/app/products/datamodel/orderdatamodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userRef: AngularFireList<any>;
  currentUserID:any='';
  user:  any;
  constructor(public  afAuth:  AngularFireAuth, public router: Router,private db: AngularFireDatabase) {

    this.getcurrentuser();
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
}

async signup(email: string, password: string) {
  return this.afAuth.createUserWithEmailAndPassword(email, password)
}


  // Create user
  Adduser(userdata: Userdatamodel) {
    this.userRef = this.db.list("/users/"+this.currentUserID)
    let currentUserUid = this.getcurrentuser();
    console.log("user ids ",currentUserUid);

   return this.userRef.push({
      fullname: userdata.fullname,
      email: userdata.email,
      mobileNumber:userdata.mobileNumber
    })
  }


  // Returns true when user is looged in and email is verified
   isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['user/sign-in']);
    })
  }

  //set dynamic link address and place the order inside currently login user
  setUserOrders(orderdata:Orderdatamodel){
    this.userRef = this.db.list("/users/"+this.currentUserID+"/")
    let today = new Date().toLocaleDateString()
    return this.userRef.push({
       address: orderdata.deliver_Address,
       date:today,
       totalprice: orderdata.totalPrice,
       orderlist:orderdata.orderlist
     })
  }

  getcurrentuser(){
    return this.afAuth.authState.subscribe(auth => {
      if(auth) {
      this.currentUserID = auth.uid;
      return auth.uid
    }
    })

  }
}
