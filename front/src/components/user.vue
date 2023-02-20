<script>
import Axios from '../config/axios-config.js';
import { mapState } from "vuex";

export default {
    name: 'users',

    data() {
      return {
        users : [],
      };
    },

    computed : {
      numberOfUsers() {
        return (this.users.length == 0) ? 'Aucun utilisateur' : `${this.users.length}`
      },
      ...mapState(["status", "users"]),
    },

    methods: {
    getAllUsers() {
      Axios.get('/users')
      .then(res => this.users = res.data)
      .catch(err => console.log(err))
    },

    deleteUsers(index) {
      alert("Cette fonctionnalité n'est pas encore disponible")
    }
  },

    mounted() {
      this.getAllUsers()
    },
}


</script>

<template >
  <section class="userlist" >
    <div class="userbox">
      <h5 class="list">Liste des utilisateurs({{ numberOfUsers }})</h5>
      <div class="cardusers" v-for="(user,index) in users" :key="user._id">
        <div class="delete" @click="deleteUsers(index)">
          <font-awesome-icon class="icon" icon="fa-solid fa-trash-can" />
        </div>
        <div>
          <p>{{ user.firstName }} {{ user.lastName }}</p>
          <p>{{ user.email }} </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>

.userlist {
  background-color: #D9D9D9;
  height: 400px;
}


.cardusers:hover {
  cursor: pointer;
  opacity: 0.8;
}

.icon{
  opacity: 0;
  position: absolute;
  padding: 10% 46%;
  font-size: 20px;
  right: 0px;
}

.icon:hover{
  opacity: 1;
}


@media (max-width: 768px) {
  .icon{
    padding: 5% 48%;
    right: 0px;
  }
}

@media (max-width: 480px) {
  .icon{
    padding: 7% 48%;
    right: 0px;
  }
}


</style>