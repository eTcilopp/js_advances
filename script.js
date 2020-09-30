API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogURL: '/catalogData.json',
        imgCatalog: 'https://placehold.it/200x150',
        products: [],
        filteredGoods: [],
        basket: [],
        basketVisible: 'none',
        searchLine: ''
    },
    methods:{
        getJson(url){

            return fetch(url).then(result => result.json()).catch(error =>{console.log(error);})
        },
        addProduct(product){
            console.log(product.id_product);
        },
        addToBasket(product){
            if (this.basket.indexOf(product) == -1){
                product.product_quantity = 1;
                this.basket.push(product);
            }else{
                product.product_quantity++;
            }
        },
        filterGoods(productName){
            this.products.forEach(product => {
                if (product.product_name.match(this.searched)) {
                    this.filteredGoods.push(product);
                }
            })
        },
        showBasket(){
            this.basketVisible = (this.basketVisible == "none") ? "block" : "none";
        },
        total_basket_cost(){
            let sum = 0;
            this.basket.forEach(product => {
                sum += product.product_quantity * product.price;
            });
            return sum;
        }

    },
    computed: {
        searched() {
            return new RegExp(this.searchLine, 'i');
        },
    },

    mounted(){
        this.getJson(`${API + this.catalogURL}`)
            .then(data =>
                {for (let el of data)
                    {this.products.push(el);}
                });
    }
});