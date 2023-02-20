<script>
import connect from './views/auth/connect.vue'
import inscription from './views/auth/inscription.vue'
import home from './views/page/home.vue'
import profilbox from './components/profilbox.vue'
import users from './components/user.vue'
import wall from './components/wall.vue'
import create from './views/page/create.vue'
import navigation from './components/navigation.vue'
import footer from './components/footer.vue'


export default {
  name: 'App', 
  components: {
    connect,
    inscription,
    navigation,
    footer,
    home,
    profilbox,
    users,
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
            localStorage.removeItem('users')
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
