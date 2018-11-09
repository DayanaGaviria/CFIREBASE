import { Component } from '@angular/core';
import {  NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AddShoppingPage } from '../add-shopping/add-shopping';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>

  /*
  creamos un constructor para  utilizar los diversos componentes que utilizaremos para 
  realizar las diferentes funciones 
  */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController) {
 
    this.shoppingListRef$ = this.database.list('shopping-list');
  }
  /*  
se muestra  una Hoja de acciones que puede realizar el usuario tales como:

    1. Edita el artículo de Shopping
    2. Eliminar el artículo de compra
    3. Cancelar la selección
  */
  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {

            /*
            Envíe al usuario a EditShoppingItemPage y pasa la clave como parámetro 
            */

            this.navCtrl.push(EditShoppingItemPage,
              { shoppingItemId: shoppingItem.$key });
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            /*
            Eliminar el ShoppingItem seleccionado  pasado a través del parámetro
            */
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("The user has selected the cancel button");
          }
        }
      ]
    }).present();
  }
  
  navigateToAddShoppingPage() {
    this.navCtrl.push(AddShoppingPage);
  }

}
