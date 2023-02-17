<script>
import navigation from '../../components/navigation.vue'
import footer from '../../components/footer.vue'
import wall from '../../components/wall.vue'
import profilbox from '../../components/profilbox.vue'
import users from '../../components/user.vue'

import jwt_decode from "jwt-decode"

export default {
    name: 'home',

    components: {
        navbar,
        profilecard,
        card,
        footerpage,
        userscard,
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

<div>
  <div>
    <div>
      <profilecard></profilecard>
      <userscard v-if="this.getUserData().role === 1"></userscard>
    </div>
    
    <div>
      <div>
        <div>
          <div>
            <h6>Qu'avez vous à dire aujourd'hui ?</h6>
          </div>
          <router-link to="/createpost">        
            <button type="button">
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


<div class="scroll" @click="scrollToTop()">
  <font-awesome-icon icon="fa-chevron-up"/>
</div>

<footerpage></footerpage>
</main>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap');

body {
  font-family: 'Inconsolata', sans-serif;
  animation-duration: 3s;
}

.home {
  background-color:#eee
  }


.scroll {
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