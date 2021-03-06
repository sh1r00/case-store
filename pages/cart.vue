<template>
  <main>
    <section style="margin-top: 5em;" class="section">
      <div class="container">
        <nuxt-link to="/" class="back-to-shopping has-text-weight-bold"> &#8592; Back to shopping</nuxt-link>
        <div class="box">
          <h1 class="title has-text-centered">
            Your Cart
          </h1>
          <hr>
          <div class="box" v-for="product in cart" :key="product._id">
            <article class="media cart-item">
              <div class="media-left">
                <figure class="image cart-image is-128x128">
                  <img :src="`https://heroku-cockpit.herokuapp.com${product.image.path}`" alt="">
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <h2 class="is-size-4 has-text-weight-bold">{{ product.title }}</h2>
                  <p class="is-size-5">
                    ${{product.price}} x {{ product.count }}
                  </p>
                  <button class="button is-outlined is-danger is-small is-rounded" @click="removeItem(product)">Remove Item</button>
                </div>
              </div>
              <div class="media-right">
                <div class="content">
                  <h2 class="is-size-4 has-text-weight-bold">$ {{ product.price * product.count }}</h2>
                </div>
              </div>
            </article>
          </div>
          <hr v-if="cartTotal">
          <h1 class="title has-text-centered" v-if="cartTotal"> Total : ${{ totalCost }}</h1>
          <button class="button is-medium is-fullwidth is-outlined is-rounded is-link checkout-button" :class="{'is-loading': submited}" @click="checkout" v-if="cartTotal">Checkout</button>
          <div class="box has-text-centered" v-if="!cartTotal">
            <article class="emptyCart">
              <h1 class="title">Cart is empty</h1>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      success: false,
      submited: false
    }
  },
  computed: {
    ...mapGetters(['cart', 'cartTotal']),
    totalCost () {
      return Object.values(this.cart)
        .reduce((sum, el) => sum + (el.count * el.price), 0)
        .toFixed(2)
    }
  },
  methods: {
    removeItem(item) {
      this.$store.commit('REMOVE_ITEM', item)
      this.$toast.info('Removed item from cart', {
           duration: 800
       })
    },
    checkout() {
      let amount = this.totalCost * 100
      let items = Object.keys(this.cart).map((key, index) => {
        return {
          id: this.cart[key]._id,
          title: this.cart[key].title,
          count: this.cart[key].count,
          slug: this.cart[key].slug
        }
      })
      this.$checkout.open({
        amount: amount,
        token: (token) => {
          axios
            .post('/charge', {
              token: token.id,
              email: token.email,
              name: token.card.name,
              address: token.card.address_line1,
              city: token.card.address_city,
              amount: amount,
              items: items
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(res => {
              this.success = true
              this.$toast.success('Order placed successfully', {
                duration: 800
              })
              this.$store.commit('CLEAR_CART')
            }).catch(err => {
              this.submited = false
              this.$toast.error('Order could not be placed', {
                duration: 1000
              })
            })
        }
      });
    }
  }
}
</script>

<style scoped>
.box, .back-to-shopping {
  box-shadow: none;
  max-width: 720px;
  margin: 0 auto;
}
.back-to-shopping {
  display: block;
  margin-bottom: 10px;
}
.cart-image img{
  height: 100px;
  width: auto;
  margin: 0 auto;
}
.cart-image {
  background: #eee;
  display: flex;
  align-items: center;
}
.cart-item {
  max-width: 400px;
  margin: 0 auto;
}
.checkout-button {
  margin: 0 auto;
  display: block;
}
button {
  margin: 0 auto;
}
@media screen and (max-width: 500px) {
  .media-left {
    display: none;
  }
}
</style>
