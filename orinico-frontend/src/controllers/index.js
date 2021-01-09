import DataHandler from "../models/dataHandler";
import { getPanier, toEuro } from "../models/utils";
import "../sass/main.scss";
import ControllerView from "../models/controllerView";

$(function () {
  let dataHandler = new DataHandler();
  getPanier("products");

 const API_URL = "https://teddies-api.herokuapp.com/api/teddies"


  /**
   * fetche datas from server et construire les cards avec les datas
   */

  let data_from_api = dataHandler.fetchData(
    API_URL
  );
  data_from_api
    .then((data) => {
      let content = `<div class="card-deck">`;
      console.log(data);
      data.forEach((element) => {
        /**
         * remplacer le protocole http par https pour eviter les warnings
         */
        //element.imageUrl = element.imageUrl.replace('http', 'https')
        content += `
                    <div class="card">
                        <img src="${
                          element.imageUrl
                        }" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text ">${element.description}.</p>
                        <p class="card-text"><strong>${toEuro(
                          element.price
                        )}€</strong></p>
                        <p class="card-text"><small class="text-muted">disponible en :  `;

        element.colors.forEach((color) => {
          let color_ = "";
          if (color === "Dark brown") {
            color_ = "#4c1414";
          } else if (color === "Pale brown") {
            color_ = "#c88e62";
          } else {
            color_ = color;
          }
          content += `<span id="color" style=" background-color: ${color_}" title="${color}"></span>`;
        });
        content += ` </small></p>
                        <a href="./product.html?id=${element._id}" class="btn btn-primary">Acheter</a>
                        </div>
                    </div>`;
      });

      content += "</div>";
      /**
       * charger les cards dans le wrapper main
       */
      let controllerView = new ControllerView();
      controllerView.render("main", content);
    })
    .catch((err) => {
      let content = `<div class="w-100 h-100">
        <div class="alert alert-warning d-block"  role="alert">
        <h5 class="font-weight-bold text-center">
        Impossible de recuperer les produits depuis l'api, 
        veuillez verifier que vous avez bien lancer le serveur nodejs sur le port 3000
        <br>
        erreur : "${err}"</a></h5>
        </div>
    </div>`;
      /**
       * charger les cards dans le wrapper main
       */
      let controllerView = new ControllerView();
      controllerView.render("main", content);
    });
});
