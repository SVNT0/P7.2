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
  <section class="card shadow rounded h-20 border mb-5 pb-4 position-relative" >
    <div class = "dropdown p-2 position-absolute top-0 end-0 m-2" >
      <div data-bs-toggle="dropdown" >
        <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
      </div>
      <ul class="dropdown-menu" >
        <li><a class="dropdown-item edit" @click="deleteUser()">Supprimer mon compte</a></li>
      </ul>
    </div>
    <div class="card-body text-center">
      <img src="../assets/groupomania/default-avatar.png" alt="avatar"
        class="rounded-circle img-fluid" style="width: 150px;">
      <h5 class="my-3">{{ users.firstName }} {{ users.lastName }}</h5>
      <p class="text-muted mb-1">{{ users.email }}</p>
    </div>
  </section>
</template>

<style>
</style>