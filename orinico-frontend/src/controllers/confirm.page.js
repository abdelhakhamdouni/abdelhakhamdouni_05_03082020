import '../sass/main.scss'
import ControllerView from '../models/controllerView'
import { getproductsFromStorage, getPanier, errazePanier, toEuro } from '../models/utils'
let controllerView = new ControllerView()

let orders = getproductsFromStorage('order')
//////////////////////////////////////////////////////////
/**
 * get order id from reponse stored in localstorage
 */
let lastorder_id = JSON.parse(localStorage.getItem('lastOrder'))
let order_id = lastorder_id.orderId
console.log(lastorder_id)
////////////////////////////////////////////////////////////
let lastOrder = orders[orders.length -1 ]

let products = lastOrder.products


/**
 * recuperer les articles dans le panier
 */

getPanier('products');
let content = "";
let total = 0;
content = `
<div class="row bg-light p-4">
<div class="text-center w-100"><img src="images/logo.png" alt="logo du site" height="70"></div>
<div class="m-5" style="height:1px; width: 100%; background-color: gray;"></div>
<h3 class="text-center ml-5">Facture N°: ${order_id}</h3>
<h3 class="pl-5">Date: ${lastOrder.date} </h3>

<div class="m-5" style="height:1px; width: 100%; background-color: gray;"></div>
<h2 class="text-center w-100 my-2">Mes coordonnées</h2>

    <p  class="pl-5"><strong style="font-size: 1em; ">Nom: </strong> ${lastOrder.lastName +' ' +lastOrder.firstName} </p>
    <p  class="pl-5">
        <span class=""><strong style="font-size: 1em; ">Téléphone: </strong>${lastOrder.telephone}</span>
    </p>    
    <p class="pl-5">
        <span class=""><strong style="font-size: 1em; ">E-mail: </strong>${lastOrder.email}</span>
    </p>    
    <p  class="pl-5"><strong style="font-size: 1em; ">Adressede livraison: </strong>${lastOrder.address 
        + ' ' + lastOrder.city + ' ' + lastOrder['code-postale']}</p>
</div>
<div class="row bg-light">

<div class="m-5" style="height:1px; width: 100%; background-color: gray;"></div>

<h2 class="text-center w-100 mx-2">Détails de ma commande</h2>
            <table class="table bg-white border w-100">
                <thead>
                    <th class="border">Nom</th>
                    <th class="border">Quontité</th>
                    <th class="border">Prix</th>
                    <th class=" border text-right">Sous-total</th>
                </thead>
            <tbody>`

    products.forEach(element => {
        total += (element.count * element.price)
        content += `
        <tr>
        <td class="border">${element.name}</td>
        <td class="border">
            <span class="">${element.count}</span>
        </td>    
        <td class="border">${toEuro(element.price)}</td>
        <td class="border text-right">${toEuro(element.price * element.count)}</td>
    </tr>
        `
    });

 content += `<tr class="bg-light">
                <td colspan="3" class="text-right"><strong>Total</strong></td>
                <td class="border bg-light text-right"><strong>${toEuro(total)}€</strong></td>
                </tr>
                </tbody>
                <tfoot>
                    <td colspan="4" class="text-right pr-5"><button class="btn btn-dark" id="imprimer">Imprimer</button></td>
                  </tfoot>
            </table>
            </div>
            `
controllerView.render('main', content)
errazePanier('products')

document.querySelector('#imprimer').addEventListener('click', ()=>{
    window.print()
})
