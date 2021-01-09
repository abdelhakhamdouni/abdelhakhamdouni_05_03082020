import DataHandler from "../models/dataHandler";
import { getPanier, productElementHandler, toEuro } from "../models/utils";
import "../sass/main.scss";
import ControllerView from "../models/controllerView";

getPanier("products");

let controllerView = new ControllerView();
const API_URL = "https://teddies-api.herokuapp.com/api/teddies/"

/**
 * charger la calsse DataHandler
 */
let datahandler = new DataHandler();

/**
 * get l'id from l'url
 */
let product_id = window.location.search.slice(4);

/**
 * get le produit depuis server avec l'id
 */
let url = API_URL + product_id;
datahandler
  .fetchData(url)
  .then((data) => {
    let content = `
            <article class="produit">
            <div class="row">
                <div class="col-md-6">
                    <img src="${data.imageUrl}" alt="${data.name}">
                </div>
                <div class="col-md-6">
                    <h2>${data.name}</h2>
                    <p>
                    `;
    data.colors.forEach((color) => {
      let color_ = "";
      if (color === "Dark brown") {
        color_ = "#4c1414";
      } else if (color === "Pale brown") {
        color_ = "#c88e62";
      } else {
        color_ = color;
      }
      content += `<span class="mr-1" id="color" style=" background-color: ${color_} " title="${color}"></span>`;
    });
    content += `</p>
                    <div class="form-group">
                    <div class="form-group">
                    <label for="exampleFormControlSelect1">Choisir la couleur</label>
                    <select class="form-control" id="select-color">
                    `;
    data.colors.forEach((color) => {
      content += `<option value="${color}">${color}</option>`;
    });

    content += `
                </select>
                </div>
                </div>
                    <p>${data.description}</p>
                    <p class="card-text"> prix : <strong>${toEuro(
                      data.price
                    )}€</strong></p>
                    <button class="btn btn-primary" id="addToBasket">Ajouter au panier </button>
                </div>

            </div>
        </article>
    `;

    controllerView.render("main", content);

    /***
     * inject le contenue dans le block main
     */
    productElementHandler(content, data);
  })
  .catch(() => {
    let content = `
        <div class="alert alert-info">Une erreur s'est produite, veuillez reéssayer plus tard</div>
    `;
    controllerView.render("main", content);
  });
