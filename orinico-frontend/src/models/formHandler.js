/**
 * class to handel form
 * check for error 
 * log error
 * send data after check is ok
 */
export default class FormHandler {

    /**
     * 
     * @param {HTMLelement} element 
     * @param {HTMLInputElement type} type 
     * check the input data of a type 
     */
  formValidate(element, type) {
    let formvalide = [];
    if (element.getAttribute("id") === "address") {
      element.addEventListener("change", () => {
        var re = new RegExp("[a-zA-Z0-9-_s]+$", "g");
        this.onError(element, re, formvalide);
      });
      element.addEventListener("keyup", () => {
        var re = new RegExp("[a-zA-Z0-9-_s]+$", "g");
        this.onError(element, re, formvalide);
      });
      return;
    } else if (element.getAttribute("id") === "code-postale") {
      element.addEventListener("change", () => {
        var re = /^\d{5}$/;
        this.onError(element, re, formvalide);
      });
      element.addEventListener("keyup", () => {
        var re = /^\d{5}$/;
        this.onError(element, re, formvalide);
      });
      return;
    }
    switch (type) {
      case "text":
        element.addEventListener("change", () => {
          var re = new RegExp("^[a-zA-Z]+$", "g");
          this.onError(element, re, formvalide);
        });
        element.addEventListener("keyup", () => {
          var re = new RegExp("^[a-zA-Z]+$", "g");
          this.onError(element, re, formvalide);
        });
        break;
      case "email":
        element.addEventListener("change", () => {
          var re = /([\w-\.]+@[\w\.]+\.{1}[\w]+)/;
          this.onError(element, re, formvalide);
        });
        element.addEventListener("keyup", () => {
          var re = /([\w-\.]+@[\w\.]+\.{1}[\w]+)/;
          this.onError(element, re, formvalide);
        });
        break;
      case "tel":
        element.addEventListener("change", () => {
          var re = /^(33|0)?(6|7|9)\d{8}$/;
          this.onError(element, re, formvalide);
        });
        element.addEventListener("keyup", () => {
          var re = /^(33|0)?(6|7|9)\d{8}$/;
          this.onError(element, re, formvalide);
        });
        break;
    }
  }

  /**
   * 
   * @param {HTMLElement} element 
   * @param {RegExp} re 
   * @param {Boolean} formvalide 
   * log error and return true or false 
   */
  onError (element, re, formvalide) {
    console.log(element.getAttribute("id"));
    if (!re.test(element.value)) {
      element.classList.add("error");
      element.classList.remove("valide");
      element.style.border = "1px solid red";
      element.style.boxShadow = "0 0 5px red";
      formvalide = [...formvalide, false];
    } else {
      element.classList.remove("error");
      element.classList.add("valide");
      element.style.border = "1px solid lightgray";
      element.style.boxShadow = "0 0 5px var(--success)";
      formvalide = [...formvalide, true];
    }
    this.checkForm("input", formvalide);
    return formvalide;
  }

  /**
   * 
   * @param {HTMLelement} element 
   * @param {Boolean} valide 
   * check if form is valid and enabel button submit
   */

  async checkForm(element, valide) {
    let inputs = document.querySelectorAll(element);
    let show = false;
    inputs.forEach((input) => {
      input.value !== "" && valide ? (show = true) : (show = false);
    });
    document.querySelector("#submit").disabled = !show;
  }

  /**
   * 
   * @param { HTMLelement from } ele 
   * @param { Object } produtcs 
   * get product ordered from localstorage and make order
   */
  async sendOrder(ele, produtcs_) {
    let orderData = {};
    
    orderData.products = produtcs_;
    let contact = {}
    
    
    let date = new Date();
    let curentDate =
      date.getDate() +
      "-" +
      (1 * date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    let curentTime = date.getHours() + "H:" + date.getMinutes() + "m";
    orderData["date"] = curentDate + " " + curentTime; 
    
    document.querySelectorAll(ele).forEach((element) => {
      orderData[element.getAttribute("id")] = element.value;
      /**
       * create body to send on post request
       */
    });


    if (window.localStorage.getItem("order")) {
      let myOrder = JSON.parse(window.localStorage.getItem("order"));
      myOrder.push(orderData);
      window.localStorage.setItem("order", JSON.stringify(myOrder));
    } else {
      window.localStorage.setItem("order", JSON.stringify([orderData]));
    }
   
    /**
     * get list of products id and create the array
     */
    let products = [];
    orderData.products.forEach(prod =>{
      products.push(prod._id)
    })
    /**
   * 
   * do post request to the api 
   */
    return fetch('http://localhost:3000/api/teddies/order',
        { 
          headers: {
            "Content-type" : "application/json"
          },
          method: 'post',
          body: JSON.stringify({
            contact:{
                lastName: orderData.lastName,
                firstName: orderData.firstName,
                city: orderData.city,
                email: orderData.email,
                address: orderData.address,
            },
            products: products
          }),
        }
    )
  

  
  
  }
}
