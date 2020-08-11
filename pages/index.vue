<template>
  <main>
    <section  style="margin-top: 5em;"  class="hero is-medium" :style="{ backgroundImage: `url(${hero})` }">
      <div class="hero-body">
        <div class="container">
          <h1 class="title"> Celebrate Uniquesness</h1>
          <h2 class="is-size-3 has-text-weight-light">
            Beautiful mobile covers that <br>
            reflects your personality.
          </h2>
        </div>
      </div>
    </section>
    <section class="section category-list">
      <div class="container">
        <div class="columns">
          <div class="column is-one-fifth">
            <div class="box">
              <h2 class="subtitle has-text-weight-bold has-text-black">Filter by type:</h2>
              <div class="field" v-for="type in types" :key="type">
                <b-checkbox v-model="selectedTypes"
                  :native-value="type" class="is-warning"> {{ type }}</b-checkbox>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="columns is-multiline is-variable is-2">
              <div class="column is-one-third" v-for="(product, index) in products" :key="index">
                <product-item :product="product"></product-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductItem from '@/components/ProductItem.vue'
export default {
  components : {
    ProductItem
  },
  data () {
    return {
      types: ['Painted', 'Pattern', 'Gradient'],
      selectedTypes: [],
      hero: '/images/hero.jpg'
    }
  },
  computed: {
    products() {
      return this.$store.state.products.filter(el =>
        this.selectedTypes.length
        ? this.selectedTypes.includes(el.value)
        : el
      )
    }
  },
  created() {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style scoped>
.hero {
  background-position: center center;
  background-size: cover;
}
.box {
  background: #f4f2f3;
  box-shadow: none;
}
</style>
