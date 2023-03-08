<script>
import navbar from '../../components/navbar.vue'
import footer from '../../components/footer.vue'
import wall from '../../components/wall.vue'
import profilbox from '../../components/profilbox.vue'
import user from '../../components/user.vue'
import jwt_decode from "jwt-decode"

export default {
    name: 'home',

    components: {
        navbar,
        profilbox,
        wall,
        footer,
        user,
    },

    methods: {
      getUserData() {
        const token = this.$store.state.user.token
        const decoded = jwt_decode(token)
        this.users = decoded
        return this.users
      },

      scrollToTop() {
        window.scrollTo(0, top);
      }
    },

  mounted() {
    this.getUserData()
  }
}
</script>

<template>
<main class="home">

<navbar></navbar>

<div class="container mt-4 mb-5">
  <div class="d-flex justify-content-between allcards">
    <div class="container d-flex flex-column pb-4">
      <profilecard></profilecard>
      <userscard v-if="this.getUserData().role === 1"></userscard>
    </div>
    
    <div class="col-md-8">
      <div class="feed">
        <div class="d-flex justify-content-between align-items-center p-2 bg-white border">
          <div class="feed-text px-2">
            <h6 class="text-black-50 mt-2">Quoi de neuf ?</h6>
          </div>
          <router-link to="/createpost">        
            <button type="button" class="btn btn-danger gradient-custom-2  btn-sm">
              <font-awesome-icon icon="fa-solid fa-plus" />
                  Nouvelle publication
            </button>
          </router-link>
        </div>
            <card></card>
      </div>
    </div>
  </div>
</div>


<div class="bloc-button btn btn-d scrollToTop" @click="scrollToTop()">
  <font-awesome-icon icon="fa-chevron-up"/>
</div>

<footerpage></footerpage>
</main>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap');

body {
  font-family: 'Inconsolata';
  animation-duration: 3s;
}

.home {
  background-color:#eee;
  background-image: url(https://www.stihle-freres.fr/wp-content/uploads/2020/07/open-space.jpg)
  }

.gradient-custom-2 {
  background: linear-gradient(to right, #0189f8, #0091ff, #0022ff, #0003c6);
--bs-btn-border-color: none;
}

.scrollToTop {
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 500;
    & svg {
      font-size: 15px
    }
}

.btn-d,
.btn-d:hover,
.btn-d:focus {
    color: #FFF;
    background: rgba(0, 0, 0, .3);
}

@media (min-width: 320px) and (max-width: 768px) {
  .allcards {
    display: flex;
    flex-direction: column;
  }
}

</style>