import { getproductsFromStorage, toEuro } from "./utils";

/**
 * class to handel data from api
 * fetch data
 * add data to storage 
 */
export default class DataHandler {
    /**
     * 
     * @param {string} url 
     * @return une promise data json de tous les teddies 
     */
    fetchData(url) {
        return fetch(url).then(data => data.json())
    }

    addToStorage(data) {
        let products = [];
        let produit_exist = false;
        if (window.localStorage.getItem('products')) {
            let products = JSON.parse(window.localStorage.getItem('products'))
            console.log(JSON.stringify(products).indexOf(JSON.stringify(data)))
            //check if a product exist in cart
            console.log(products)
            products.forEach(produit => {
                if (produit._id === data._id) {
                    produit_exist = true
                    produit.count += 1
                }
            })
            if (produit_exist) {
                window.localStorage.setItem('products', JSON.stringify(products))
            }
            else {
                products.push(data)
                window.localStorage.setItem('products', JSON.stringify(products))
            }
           
        } else {
                products.push(data)
                window.localStorage.setItem('products', JSON.stringify(products))
            }
            $('.spinner-border').hide();
            $('#mymodal').modal('show');

    }

    changeDataInStorage(){
        let js_moins = document.querySelectorAll('.js_moins')
        let js_plus = document.querySelectorAll('.js_plus')
        let total = document.querySelector('#total')

        console.log(getproductsFromStorage('products'))
        
        
        js_moins.forEach(ele => ele.addEventListener('click', (event)=>{
            
            let products = JSON.parse(window.localStorage.getItem('products'))
            let id = event.target.parentNode.parentNode.dataset.id
            let count = document.querySelector(`#count_${id}`)
            let price = document.querySelector(`#price_${id}`)
            products.forEach(ele=>{
                if(ele._id === id){
                    ele.count--
                    count.innerHTML = ele.count
                    price.innerHTML = ele.count * ele.price
                    total.innerHTML = parseInt(total.innerHTML) - ele.price
                }
                if(ele.count < 1){
                    products = products.filter(element=> element._id != id)
                }

            })
            window.localStorage.setItem('products', JSON.stringify(products))
            if(!getproductsFromStorage('products')){
                window.location.href = './panier.html'
            }
            window.location.reload()

        }))

        js_plus.forEach(ele => ele.addEventListener('click', (event)=>{

            let products = JSON.parse(window.localStorage.getItem('products'))
            let id = event.target.parentNode.parentNode.dataset.id
            let count = document.querySelector(`#count_${id}`)
            let price = document.querySelector(`#price_${id}`)

            products.forEach(ele=>{
                if(ele._id === id){
                    ele.count++
                    count.innerHTML = ele.count
                    price.innerHTML = toEuro(ele.count * ele.price)+"€"
                    total.innerHTML = parseInt(toEuro(total.innerHTML)) + parseInt(toEuro(ele.price))
                }
            })
            window.localStorage.setItem('products', JSON.stringify(products))
            if(!getproductsFromStorage('products')){
                window.location.href = './panier.html'
            }
            window.location.reload()
        }))
    }

    incrimentCountOfProduct(id){
        let products = JSON.parse(window.localStorage.getItem('products'))
        console.log(products)
        let pro = products.filter(product => product._id === id)
        console.log(pro)
    }
}