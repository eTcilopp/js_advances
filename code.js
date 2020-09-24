const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
let catalogDict = {}; // формируется после получения данных о товарах с сервера. Используется для связи между кнопкой "добавить в корзину"
                        // и объектом товара.

class Basket {
    constructor (client){
        this.client=client;
        this.productList=[];
    }

    renderBasket = function(){
        let basketHTML=[`
            <h2>Корзина (${this.client}).</h2>
            <h3> Всего ${this.basketQuantity} товара(ов) на сумму ${this.basketPrice} &#8381</h3>
            <a class="close" href="#">&times;</a>
            <hr>
            `
        ];
        this.productList.forEach(product => {
            basketHTML += `
            <div class="basket-item">
                <h2>${product.title}</h2>
                    <div class="basket-item-text">
                        <p class='price'>Price: ${product.price} &#8381</p>
                        <p> Quantity: ${product.quantity}</p>
                    </div>
                    <div class="basket-item-image">
                        <img src=${product.image_url} alt="${product.title}"> 
                    </div>
                <hr>
            </div>
            `;
        
        });
        return basketHTML;
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
        let basketQuantity = 0;
        this.productList.forEach(product => {
            basketQuantity += product.quantity
        })
        return basketQuantity;
    }

    get basketPrice() {
        let total=0;
        this.productList.forEach(product => {
            total += product.price * product.quantity
        });
        return total;

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
        <button class="by-btn button" id="${this.id}" >Добавить в корзину</button>
      </div>`;
    }

}


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
  
// Функция для получения списка товаров с сервера, формирования словаря-каталога с этим списком ({id товара: объект товара}),
// отрисовывания товаров на странице
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

// Навешиваем события клика на кнопку "Добавить в корзину"
function events () {
    document.querySelectorAll('.by-btn').forEach(button => {
        button.addEventListener('click', event => {
            basket.addProduct(catalogDict[event.target.id])

        })
    })
}

// я предполагаю, что пользователь должен появиться после авторизации, которой у нас (пока) нет. Поэтому делаю вручную.
const basket = new Basket('Anonimus');

// на клик по кнопке "корзина" навешено событие - отрисовать корзину.
document.getElementById('basket_button').addEventListener('click', event => document.querySelector('.basket_content').innerHTML=basket.renderBasket());


// Promise я не смог победить. Цепочка срабатывает, но без костыля в виде задержки (последняя строка) events() не находит ни одной кнопки.
// Если у Вас будет минута свободная, напишите, пожалуйста, как нужно то было?
const fetchPromise = new Promise((resolve)=>{fetchGoods()});
fetchPromise.then(response => {
    return response.json();
  }).then(setTimeout(()=> {events()}, 800));