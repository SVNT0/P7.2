<script>
import { mapState } from 'vuex'

export default {
  name: 'connect',
  data() {
    return {
      mode:'connect',
      email: '',
      emailError:'',
      password: '',
      passwordError:'',
      regEmail: /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/gim,
      regPassword: /^(?=.*\d).{8,}$/gim,
    }    
  },

  computed: {
    validatedFields() {
        if (this.email !== "" && this.password !== "" && this.emailError !== true && this.passwordError !== true) {
          return true
        } else {
          return false
        }
      },
    ...mapState(['status'])      
  },
  methods: {
    isEmailValid() {
      if (this.email !== "" && this.regEmail.test(this.email)) {
        this.emailError = false;
      } else {
        this.emailError = true;
      }
    },
    isPasswordValid() {
      if (this.password !== "" && this.regPassword.test(this.password)) {
        this.passwordError = false;
      } else {
      this.passwordError = true;
      }  
    },   

    handleSubmit(event) {
      event.preventDefault()
      this.$store.dispatch('connect', {
        email: this.email,
        password: this.password,
        })
        .then ((res) => this.$router.push('/home'))
        .catch ((err) => console.log(err))
    }
  }
} 

</script>

<template>
<main>

<div>
    <div>
      <div>
        <div class="drop-right"
        style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px);">
          <div>
            <div>
              <h2>Bienvenue sur</h2>
              <img src="../../assets/groupomania/icon-left-font-monochrome-white.png" style="width: 200px;" alt="Logo Groupomania">
            </div>
            <form @submit.prevent="handleSubmit">
            <h4>CONNEXION</h4>
              <div>
                <input 
                  v-model="email"
                  type="email" 
                  placeholder="Adresse mail"
                  @focusout="isEmailValid"/>
                <p v-if="emailError">Veuillez renseigner une adresse email correcte</p>
              </div>
              <div>
                <input 
                  autocomplete="on"
                  v-model="password"
                  type="password" 
                  placeholder="Mot de passe"
                  @focusout="isPasswordValid"/>
                <p v-if="passwordError">Votre mot de passe doit contenir au moins 8 caractères dont une majuscule et un chiffre</p>
              </div>

              <div>
                    <button 
                    :disabled="!validatedFields" 
                    class="bouton-connexion"
                    :class="{'button-disabled' : !validatedFields}"
                    type="button"
                    @click="handleSubmit">
                        <span v-if="status == 'loading'"> Connexion en cours...</span>
                        <span v-else>Se connecter</span>
                    </button>
              </div>
                    <div>
                    <p>Vous n'avez pas encore de compte ? </p>
                    <router-link to="/signup">
                        <button type="button">Inscrivez-vous</button>
                    </router-link>
                    </div>          
            </form>
          </div>
        </div>
      </div>
            <div> 
        <img src="../../assets/groupomania/icon.png"/>
            </div>
    </div>
  </div>

</main>
</template>


<style>

@media (min-width: 768px) {
  .drop-right {
    margin-right: -100px;
  }
}

.bouton-connexion {
  background: linear-gradient(to right, #0189f8, #0091ff, #0022ff, #0003c6);
}

@media (min-width: 768px) and (max-width: 992px) {
  .drop-right {
    margin: 50px;
  }
}

</style>