<script>
import login from './views/auth/login.vue'
import signup from './views/auth/signup.vue'
import home from './views/page/home.vue'
import profilbox from './components/profilbox.vue'
import user from './components/user.vue'
import wall from './components/wall.vue'
import create from './views/page/create.vue'
import navbar from './components/navbar.vue'
import myfooter from './components/myfooter.vue'


export default {
  name: 'App', 
  components: {
    login,
    signup,
    navbar,
    myfooter,
    home,
    profilbox,
    user,
    wall,
    create,
  },
  methods: {
    logoutExpiredToken() {
      Axios.interceptors.response.use(response => {
      return response
      }, error => {
      console.log(error)
    

    if(!error.response){
        store.commit('displayNotif', {d: true, mes: error})
        return Promise.reject(error)
    }else{
        if(error.response.status == 401){
            localStorage.removeItem('user')
            router.push('/connect')
        }else{
            store.commit('displayNotif', {d: true, mes: error.response.data.message})
            return Promise.reject(error)
        }
    }
})
    }
  }
} 
</script>

<template>
<router-view></router-view>
</template>

<style scoped>

</style>
