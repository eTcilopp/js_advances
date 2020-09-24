const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const renderProduct = (title='Товар', price=5000) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p class='price'>${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};


class Basket {
    constructor (client){
        this.client=client;
        this.productList=[];
    }


    addProduct = function(Product){
        let productExist = false;
        this.productList.forEach(product => {
            if (product.id == Product.id){
                product.quantity++;
                productExist = true;
                return;
            }
        })
        if (!productExist){
            this.productList.push(Object.assign({}, Product));
        }
    }



    get basketQuantity() {
        return this.productList.length;
    }

    get basketPrice() {
        let total=0;
        this.productList.forEach(product => {
            total += product.price
        });
        return total;

    }

    get getProductList(){
        
    }

}


class Product {
    constructor (id, title, price, image_url='https://via.placeholder.com/150x80') {
        this.id=id;
        this.title=title;
        this.price=price;
        this.image_url=image_url;
        this.quantity = 1;
    }
    renderProduct() {
        return `<div class="product-item">
        <img src=${this.image_url} alt=""> 
        <h3>${this.title}</h3>
        <p class='price'>${this.price} &#8381</p>
        <button class="by-btn" id="${this.id}" >Добавить в корзину</button>
      </div>`;
    }

}


// ------------------------------------------------------


function makeGETRequest(url, callback) {
    var xhr;
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.responseText);
      }
    }
    xhr.open('GET', url, true);
    xhr.send();
  }
  



let catalogDict = {}
function fetchGoods(){
    makeGETRequest(`${API}/catalogData.json`, (items) => {
        this.items = JSON.parse(items);
        this.items.forEach(item => {
            const product = new Product(item.id_product, item.product_name, item.price);
            catalogDict[item.id_product] = product;
            document.querySelector('.products').insertAdjacentHTML('beforeend', product.renderProduct());
        }

        )
    }

    )
}







function events () {
    console.log('events started');
    temp = document.querySelectorAll('.by-btn');
    console.log(temp);
    document.querySelectorAll('.by-btn').forEach(button => {
        console.log('beep')
        button.addEventListener('click', event => {
            console.log(event.target.id);
            basket1.addProduct(catalogDict[event.target.id])

        })
    })
}

const basket1 = new Basket('user1');
// // fetchGoods()
// // setTimeout(()=> {events()}, 3000);

// const promise = new Promise(resolve => {
//     resolve();
// })

// promise.then(fetchGoods).then(events());

const fetchPromise = fetch(`${API}/catalogData.json`);

fetchPromise.then(response => {
    return response.json();
  }).then(items => {
    items.forEach(item => {
        const product = new Product(item.id_product, item.product_name, item.price);
        catalogDict[item.id_product] = product;
        document.querySelector('.products').insertAdjacentHTML('beforeend', product.renderProduct());
})
  }).then(setTimeout(()=> {events()}, 100));