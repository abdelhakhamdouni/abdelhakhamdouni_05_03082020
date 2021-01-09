import DataHandler from '../src/js/dataHandler.js';
import { getproductsFromStorage } from '../src/js/utils.js';

let  dataFromApi ;
let datahandler = new DataHandler()
describe("application tests", function() {
    /**
     * get data from api 
     */
    it('get data from teddies api', function() {
      return datahandler.fetchData('http://localhost:3000/api/teddies').then(function (data) {
        expect(data.length).toEqual(5);
      });
    });
    /**
     * store products in localestorage 
     * if product existe add 1 to count of this product
     */

      it('add product to localstorage', function(){
        return datahandler.fetchData('http://localhost:3000/api/teddies').then(function (data) {
        data.forEach(ele =>{
          if(!ele.count){
              ele.count = 1
            }
            datahandler.addToStorage(ele)
        })    
        let dataFromStorage = getproductsFromStorage('products')
        expect(dataFromStorage).not.toBe(null);
    });

  })

  // it('add data to localstorage', function(){
  //   return datahandler.fetchData('http://localhost:3000/api/teddies').then(function (data) {
  //       datahandler.addToStorage(JSON.stringify(data[0]))
  //       let dataFromStorage = JSON.parse(getproductsFromStorage('products'))
  //       expect(dataFromStorage.count).toEqual(2);
  //   });
  // })
});