import '../sass/main.scss';
import ControllerView from '../models/controllerView';
import {getPanier, getproductsFromStorage, panierButtonAction, toEuro} from '../models/utils'
import DataHandler from '../models/dataHandler';

getPanier('products');

let total = 0;
let controllerView = new ControllerView()
let dataHandler = new DataHandler()
let content = "";

if(getproductsFromStorage('products')){
    
    let products = getproductsFromStorage('products')

    content = `
    <table class="table bg-white border">
    <thead>
        <th class="border">Produit</th>
        <th class="border">Npm</th>
        <th class="border">Quontité</th>
        <th class="border">Prix</th>
        <th class=" border text-right">Sous-total</th>
    </thead>
    <tbody>`

    products.forEach(element => {
        total += (element.count * element.price)
        content += `
        <tr data-id="${element._id}">
        <td class="border"><img src="${element.imageUrl}" alt="${element.name}"></td>
        <td class="border">${element.name}</td>
        <td class="border">
            <span class="count js_moins">-</span>
            <span class="count" id="count_${element._id}">${element.count}</span>
            <span class="count js_plus">+</span>
        </td>    
        <td class="border">${toEuro(element.price)}</td>
        <td class="border text-right" id="price_${element._id}">${toEuro(element.price * element.count)}</td>
    </tr>
        `
    });

 content += `<tr class="bg-light">
                <td colspan="4" class="text-right"><strong>Total</strong></td>
                <td class="border bg-light text-right"><strong id="total">${toEuro(total)}€</strong></td>
                </tr>
                </tbody>
                <tfoot>
                    <td colspan="3" id="makeOrder" class="text-right"><a href="order.html" class="btn btn-primary">passer commande</a></td>
                    <td colspan="2" id="clearBasket" class="text-left"><button class="btn btn-danger">Vider mon panier</button></td>
                </tfoot>
            </table>
            `
}else{
    content = `
    <div class="container mt-3">
    <div class="jumbotron">
      <h1 class="display-4 font-weight-bold text-center">Votre panier est vide, commencez vos achat <a class="btn btn-primary text-uppercase display-4" href="./index.html">par içi</a></h1>
    </div>
  </div>
    `
}

/**
 * render le contenue dans le main
 */
    controllerView.render('main', content)
    dataHandler.changeDataInStorage()
    panierButtonAction();



