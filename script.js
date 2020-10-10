API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogURL: '/catalogData.json',
        imgCatalog: 'https://placehold.it/200x150',
        imgCart: 'https://placehold.it/50x100',
        products: [],
        basket: [],
        searchLine: ''
    },
    methods:{
        getJson(url){

            return fetch(url).then(result => result.json()).catch(error =>{console.log(error);})
        },
        updateBasket(value){
            this.basket = value
        },
        showBasket(){
            this.$refs.basketComponent.showBasket();
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