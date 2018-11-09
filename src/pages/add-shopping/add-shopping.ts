import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  // creacion de un nuevo objeto 

  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.shoppingItemRef$ = this.database.list('shopping-list');
  }
  
  addShoppingItem(shoppingItem: ShoppingItem) {
    /*
      creacion de un nuevo objeto anonimo y convertir el itemNumber  a number.
      agregando a nuestra base de datos
    */
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });

    // reiniciamos nuestro ShoppingItem
    this.shoppingItem = {} as ShoppingItem;

    // llevamos al usuario de regreso a ShoppingListPage
    this.navCtrl.pop();
  }

}
