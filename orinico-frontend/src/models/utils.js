import DataHandler from "./dataHandler"

/**
 * 
 * @param {String} str key in localstorage
 * change nombre of basket in the navbar
 */
export function getPanier(str) {

    let panierElement = document.querySelector('#panier')
    let panier = 0
    if (localStorage.getItem(str)) {
        let produit_count = JSON.parse(localStorage.getItem(str))
        produit_count.forEach(element => {
            panier += element.count
        })
        panierElement.innerHTML = panier
    } else {
        panierElement.innerHTML = panier
    }
    return panier
}

/**
 * 
 * @param {String} str key of entree in localstorage
 * get products from localstorage width key
 */

export function getproductsFromStorage(str) {
    let products = ""
    if (window.localStorage.getItem(str)) {
        products = JSON.parse(window.localStorage.getItem(str))
        if (products.length > 0) {
            products.forEach(produit => {
                produit.price = produit.price
            })
            return products

        }
        else {
            return false
        }
    }
    else {
        return products
    }

}

export function panierButtonAction() {
    let clearBasket = document.querySelector('#clearBasket');
    let btn_cleanBasket = document.querySelector('#btn-cleanBasket');

    clearBasket.addEventListener('click', () => {
        $('#clearBasketModal').modal('show');
    });

    btn_cleanBasket.addEventListener('click', () => {
        errazePanier('products')
        window.location.href = "./index.html";
    });
}

/**
 * 
 * @param {html contents} content 
 * @param {array} data 
 * 
 */
export function productElementHandler(content, data) {
    let datahandler = new DataHandler()
    let addtobasket = document.querySelector('#addToBasket');
    let selecColor = document.querySelector('#select-color');
    let panierElement = document.querySelector('#panier');
    /**
     * initialiser la couleur a la premiere couleur
     */
    data.color = selecColor.value;
    //addtobasket.style.display = "none"
    selecColor.addEventListener('change', (event) => {
        data.color = event.target.value;
        addtobasket.style.display = "block";
        console.log(data.color);
    });
    addtobasket.addEventListener('click', (event) => {
        event.preventDefault();
        data.count = 1;
        data.price = data.price
        let panier = getPanier('products');
        panierElement.innerHTML = ++panier;
        datahandler.addToStorage(data);
    });
}

/**
 * @param {string} str name of the data to remove
 * erase localstorage
 */
export function errazePanier(str) {
    window.localStorage.removeItem(str)
    getPanier(str)
}

/**
 * 
 * @param {Numbre} number transform Nubre in euro form
 * @returns {Number} number weth two digits after coma
 */
export function toEuro(number) {
    return number.toString().slice(0, -2) + "," + number.toString().slice(-2)
}