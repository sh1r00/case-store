<template>
  <div id="topId">
    <nav  style="margin-bottom: 5em;" :style="{ height: navEffect.navHeight }" class="navbar is-fixed-top is-centered is-white has-shadow">
      <div class="container">
        <button class="nav-logo button is-text is-large">
          <div class="navbar-brand is-text is-size-3 logo has-text-dark" @click="scrollToTop()">
            The<b>Case</b> Company
          </div>
        </button>
        <div :style="{ display: `${navEffect.cart}`}" class="nav-cart navbar-menu is-centered is-active">
          <div class="navbar-end">
            <div class="navbar-item">
              <nuxt-link :to="{name: 'cart'}"> Cart ({{ cartTotal }})</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nuxt />
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          Proudly Developed By <a href="https://cockpit.com" class="has-text-dark"><strong>sh1r00</strong></a>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import debounce from '~/components/utils/debounce.js'
  export default {
    data() {
      return {
        navEffect: {
          cart: 'none',
          navHeight: '6.25em'
        }
      }
    },
    computed: {
      ...mapGetters(['cartTotal'])
    },
    mounted() {
      this.handleDebouncedScroll = debounce(this.handleScroll, 5);
      window.addEventListener('scroll', this.handleDebouncedScroll)
    },
    destroyed() {
      this.handleDebouncedScroll = debounce(this.handleScroll, 5);
      window.removeEventListener('scroll', this.handleDebouncedScroll)
    },
    methods: {
      handleScroll(event) {
        console.log('scrolling ', window.scrollY)
        if (window.scrollY > 5) {
          this.navEffect.cart = 'inline'
          this.navEffect.navHeight = 'auto'
        } 
        if (window.scrollY <= 5) {
          this.navEffect.cart = 'none'
          this.navEffect.navHeight = '6.25em'
        }
      },
      scrollToTop() {
        document.getElementById('topId').scrollIntoView({behavior: 'smooth', block: 'start'})
      }
    }
  }
</script>

<style>
body {
  background: #DAE2DB;
}
</style>
