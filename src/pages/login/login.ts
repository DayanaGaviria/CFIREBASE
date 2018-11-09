import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { ShoppingListPage } from '../shopping-list/shopping-list';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private auuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

async login(user: User){
  try{ 
const result =  this.auuth.auth.signInWithEmailAndPassword(user.email, user.password);
if(result){
  this.navCtrl.push(ShoppingListPage);
}
}
catch (e){
  console.error(e);
}
}

register(){
  this.navCtrl.push(RegisterPage);
}
}
