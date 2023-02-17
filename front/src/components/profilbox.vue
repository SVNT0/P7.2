<script>
import jwt_decode from "jwt-decode"
import Axios from '../config/axios-config.js';

export default {
    name: 'profilbox',

    data() {
      return {
        users : [],
      };
    },

    methods: {
      getUserData() {
        const token = this.$store.state.user.token
        const decoded = jwt_decode(token)
        this.users = decoded
      },

      deleteUser() {
        alert("Cette fonctionnalité n'est pas encore disponible")
      }
    },

    mounted() {
      this.getUserData()
    }
}


</script>

<template v-for="user in users" :key="user._id">
  <section class="card">
    <div class = "menu-deroulant">
      <div data-bs-toggle="menu-deroulant" >
        <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
      </div>
      <ul class="menu-deroulant-menu" >
        <li><a @click="deleteUser()">Supprimer mon compte</a></li>
      </ul>
    </div>
    <div>
      <img src="../assets/groupomania/default-avatar.png" alt="avatar"
         style="width: 150px;">
      <h5>{{ users.firstName }} {{ users.lastName }}</h5>
      <p>{{ users.email }}</p>
    </div>
  </section>
</template>

<style>
</style>