import { Injectable, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class GlobalitemsService {
  STORAGE_KEY:any="cartlist"

  constructor(private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    @Inject(LOCAL_STORAGE)private storage: StorageService) { }

  showSuccess(message, title){
    this.toastr.success(message, title)
  }

  showError(message, title){
    this.toastr.error(message, title)
  }

  setCartData(data){
    console.log("data inside :",data);
    this.storage.set(this.STORAGE_KEY, data);
  }
 async getCartData(){
   return this.storage.get(this.STORAGE_KEY)

  }

  clearstorage(){
    this.storage.set(this.STORAGE_KEY, null);
  }

  showSpinner(){
    this.spinner.show();
  }
  hideSpinner(){
    this.spinner.hide();
  }
}
