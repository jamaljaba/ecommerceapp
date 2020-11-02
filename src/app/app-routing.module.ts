import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './products/cart/cart.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignupComponent } from './user/signup/signup.component';
import { AuthGuard } from './authguard/auth.guard';

const routes: Routes = [
  { path: '', component: UserComponent},
 { path: 'user', component: UserComponent,
     children: [
       { path: '', component: SignInComponent },
       { path: 'sign-in', component: SignInComponent},
       { path: 'signup', component: SignupComponent}
     ]
 },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]
  },{ path: 'cart', component: CartComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
