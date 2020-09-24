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
        this.productList.push(Product)
        // return this.productList
        return
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

}


class Product {
    constructor (id, title, price, image_url='https://via.placeholder.com/150x80') {
        this.id=id;
        this.title=title;
        this.price=price;
        this.image_url=image_url;
    }
    renderProduct() {
        return `<div class="product-item">
        <img src=${this.image_url} alt=""> 
        <h3>${this.title}</h3>
        <p class='price'>${this.price} &#8381</p>
        <button class="by-btn">Добавить в корзину</button>
      </div>`;
    }

}

const product1 = new Product(1, 'Notebook', 20000)
const product2 = new Product(2, 'Mouse', 1500)
const product3 = new Product(3, 'Keyboard', 5000)
const product4 = new Product(4, 'Printer', 4500)

document.querySelector('.products').insertAdjacentHTML('beforeend', product1.renderProduct())
document.querySelector('.products').insertAdjacentHTML('beforeend', product2.renderProduct())
document.querySelector('.products').insertAdjacentHTML('beforeend', product3.renderProduct())
document.querySelector('.products').insertAdjacentHTML('beforeend', product4.renderProduct())

const basket1 = new Basket('user1')
basket1.addProduct(product1)
basket1.addProduct(product2)
basket1.addProduct(product4)

console.log('Quantity total: ' + basket1.basketQuantity) //Quantity total: 3
console.log('Price total: ' + basket1.basketPrice) //Price total: 26000

