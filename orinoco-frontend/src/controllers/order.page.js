import "../sass/main.scss";
import ControllerView from "../models/controllerView";
import FormHandler from "../models/formHandler";
import { getPanier, getproductsFromStorage, toEuro } from "../models/utils";

getPanier("products");

let total = 0;
let formHandler = new FormHandler();
/**
 * get products in basket
 */
let products = getproductsFromStorage("products");

let content = `
<section class="row w-100 bg-light p-5">
    <article class="col-md-6">
        <h2 class="title text-center mb-3 text-uppercase">
            Mes coordonnées
        </h2>
        <form class="order_formulaire" novalidate>
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="name">Nom</label>
                <input type="text" class="form-control" id="lastName"><span class="validecheck"></span>
                <div class="alert alert-danger">Le nom est invalide</div>
                </div>
                <div class="form-group col-md-6">
                <label for="prenom">Prénom</label>
                <input type="text" class="form-control" id="firstName"><span class="validecheck"></span>
                <div class="alert alert-danger">Le prénom est invalide</div>
                </div>
            </div>

            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" class="form-control" id="email" placeholder="jean.dao@exemple.com"><span class="validecheck"></span>
                <div class="alert alert-danger">L'adresse email n'est pas valide! </div>
            </div>
            <div class="form-group">
                <label for="telephone">Téléphone</label>
                <input type="tel" class="form-control" id="telephone" placeholder="0612345678"><span class="validecheck"></span>
                <div class="alert alert-danger">Le numero de téléphone n'est pas valide! </div>
            </div>
            <div class="form-group">
                <label for="adresse">Adresse</label>
                <input type="text" class="form-control" id="address" placeholder="6 rue de paris"><span class="validecheck"></span>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="code-postale">Code postale</label>
                    <input type="text" class="form-control" id="code-postale" placeholder="75000"><span class="validecheck"></span>
                    <div class="alert alert-danger">Le code postale n'est pas valide! </div>
                </div>
                <div class="form-group col-md-6">
                    <label for="ville">Ville</label>
                    <input type="text" class="form-control" id="city" placeholder="Paris"><span class="validecheck"></span>
                    <div class="alert alert-danger">Le ville n'est pas valide! </div>
                </div>
            </div>

            <button type="submit" id="submit" class="btn btn-primary" disabled >Passer ma commande</button>
        </form>
    </article>
    <article class="col-md-6">
        <h2 class="title text-center mb-3 text-uppercase">
            Recapétulatif de votre commande
        </h2>
        <table class="table bg-white border">
        <thead>
            <th class="border">Produit</th>
            <th class="border">Npm</th>
            <th class="border">Quontité</th>
            <th class="border">Prix</th>
            <th class=" border text-right">Sous-total</th>
        </thead>
        <tbody>`;

products.forEach((element) => {
  total += element.count * element.price;
  content += `
                        <tr>
                            <td class="border"><img src="${
                              element.imageUrl
                            }" alt="${element.name}"></td>
                            <td class="border">${element.name}</td>
                            <td class="border">
                                <span class="">${element.count}</span>
                            </td>    
                            <td class="border">${toEuro(element.price)}</td>
                            <td class="border text-right">${toEuro(
                              element.price * element.count
                            )}</td>
                        </tr>
                    `;
});

content += `<tr class="bg-light">
                    <td colspan="4" class="text-right"><strong>Total</strong></td>
                    <td class="border bg-light text-right"><strong>${toEuro(
                      total
                    )}€</strong></td>
                    </tr>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
        <div>
            <p class="text-muted text-center">
                Tous nos prix sont exprimés avec la TVA incluse
            </p>
        </div>
    </article>
</section>`;

let controllerView = new ControllerView();
controllerView.render("main", content);

window.addEventListener("DOMContentLoaded", () => {
  let formValide;
  document.querySelector("#submit").disabled = true;
  document.querySelectorAll("input").forEach((element) => {
    formValide = formHandler.formValidate(
      element,
      element.getAttribute("type")
    );
  });

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    formHandler
      .sendOrder("input", products)
      .then((response) => response.json())
      .then((order) => {
        localStorage.setItem("lastOrder", JSON.stringify(order));
        window.location.href = "./confirm.html";
      })
      .then((err) => console.error(err));
  });
});
