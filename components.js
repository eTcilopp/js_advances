Vue.component('basket-component', {
    props:['basket', 'imgcart'],
    data () {
        return {
            display: {'display': 'none'},
        }
    },
    methods:{
        showBasket() {
            this.display = (this.display['display'] == 'none') ? {'display': 'block'} : {'display': 'none'}
        },
    },
    computed:{
        total_basket_cost() {
            let sum = 0;
            this.basket.forEach(product => {
                sum += product.product_quantity * product.price;
            });
            return sum;
        }
    },
    template:`
    <div id="myModal" class="modal" :style="display">
        <div class="modal-content">
            <span class="close" @click="showBasket()">&times;</span>
            <div v-if="basket.length == 0">
                <h3>Корзина пуста</h3>
            </div>
            <div class='basket-item' v-for='good in basket'>    
                <img :src=imgcart alt="">
                <h3>{{ good.product_name }} x {{ good.product_quantity }} шт</h3>
                <p class='price'>Цена:{{ good.price }} &#8381</p>
                <p class='price'>Стоимость: {{ good.price*good.product_quantity }} &#8381</p>
                <hr>
            </div>
        <p class='price' v-if="basket.length != 0">Общая стоимость корзины {{ total_basket_cost }} &#8381</p>
        </div>
    </div>
    `
});

Vue.component('goods-list-component',{
    props: ['products', 'imgcatalog', 'searched'],
    data () {
        return {
            basket: [],
        }
    },
    methods: {
        addtobasket(product){
            let exist;
            this.basket.forEach(product_in_basket => {
                if (product_in_basket.id_product == product.id_product){
                        product_in_basket.product_quantity++;
                        exist = true;
                }
            })
            if (!exist){
                this.basket.push({...product, product_quantity: 1})
            }
            this.$emit('clicked', this.basket)
        }
    },
    template:`
    <div class='goods-list'>
        <div class='goods-item' v-if="good.product_name.match(searched)" v-for='good in products'>
            <img :src=imgcatalog alt="">
            <h3>{{ good.product_name }}</h3>
            <p class='price'>{{ good.price }} &#8381</p>
            <button class='button' @click='addtobasket(good)'>Добавить в корзину</button>
        </div>
    </div>  
    `
})