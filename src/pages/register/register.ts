import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user= {} as User;

  constructor( private auuth:AngularFireAuth,
    
    public navCtrl: NavController, public navParams: NavParams) {
  }

async  register(user:User){
  try{ 

const result = await this.auuth.auth.createUserWithEmailAndPassword(user.email, user.password);
this.navCtrl.push(LoginPage);
console.log(result);
 }
 catch (e){
 console.error(e);
 }
}
}
