<script>
import { mapState } from 'vuex'

export default {
    name: 'inscription',
    data() {
      return {
        mode:'login',
        lastName: '',
        lastNameError: '',
        firstName: '',
        firstNameError: '',
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
          if (this.lastName != "" && this.firstName != "" && this.email != "" && this.password != "" && this.emailError !== true && this.passwordError !== true) {
            return true;
          } else {
            return false;
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
      handleSubmit() {
        const self = this;
        this.$store.dispatch('signup', {
          lastName: this.lastName,
          firstName: this.firstName,
          email: this.email,
          password: this.password,
          }).then ((response) => {
          console.log(response);
          self.$router.push('/login');
        }, function(error) {
          console.log(error)
        })
        },
  }
}
</script>

<template>
<main>

<div>
    <div>
      <div>
        <div class="drop-right" style="background: hsla(0, 0%, 100%, 0.55); backdrop-filter: blur(30px);">
          <div>
            <div>
              <h2>Bienvenue sur</h2>
              <img src="../../assets/groupomania/icon-left-font-monochrome-white.png" style="width: 200px;" alt="Logo_Groupomania">
            </div>
            <form @submit="handleSubmit">
            <h4>INSCRIPTION</h4>
                <div>
                  <div>
                    <div>
                      <input 
                        v-model="lastName"
                        type="text"  
                        placeholder="Nom"
                        />
                    </div>
                  </div>
                  <div>
                    <div>
                      <input 
                        v-model="firstName"
                        type="text" 
                        placeholder="Prénom" 
                        />
                    </div>
                  </div>
                </div>
              <div>
                <input 
                  v-model="email"
                  type="email" 
                  placeholder="Adresse mail"
                  @focusout="isEmailValid"
                />
                <p v-if="emailError">Veuillez renseigner une adresse email correcte</p>
              </div>
              <div>
                <input 
                  autocomplete="on"
                  v-model="password"
                  type="password" 
                  placeholder="Mot de passe" 
                  @focusout="isPasswordValid"
                  />
                  <p v-if="passwordError">Votre mot de passe doit contenir au moins 8 caractères dont une majuscule et un chiffre</p>
              </div>
              <div>
                    <button 
                    :disabled="!validatedFields"  
                    :class="{'button-disabled' : !validatedFields}"
                    type="button"
                    @click="handleSubmit()">
                        <span v-if="status == 'loading'">Inscription en cours...</span>
                        <span v-else>S'inscrire</span>
                    </button>
              </div>
                                <div>
                    <p>Vous avez déjà un compte? </p>
                    <router-link to="/login">
                        <button type="button">Connectez-vous</button>
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