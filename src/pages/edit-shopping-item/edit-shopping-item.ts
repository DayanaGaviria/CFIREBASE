import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';

import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase) {
    
    // Capture el shoppingItemId como un parámetro de navegación
    const shoppingItemId = this.navParams.get('shoppingItemId');

    // Salir del NavParam
    console.log(shoppingItemId);

    // Establecer el alcance de nuestro objeto en Firebase igual a nuestro elemento seleccionado
    this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);

    // Suscríbir el objeto y asignar el resultado a this.shoppingItem
    this.shoppingItemSubscription =
      this.shoppingItemRef$.subscribe(
      shoppingItem => this.shoppingItem = shoppingItem);
  }

  editShoppingItem(shoppingItem: ShoppingItem) {
    // Actualizar nuestro nodo en Firebase con nuevos datos de artículos
    this.shoppingItemRef$.update(shoppingItem);

    // Enviar de regreso a nuestro usurio a  ShoppingListPage
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    // Darse de baja del Observable al salir de la página.
    this.shoppingItemSubscription.unsubscribe();
  }

}
