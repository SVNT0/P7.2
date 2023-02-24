<script>
import { mapState } from 'vuex'

export default {
    name: 'inscription',
    data() {
      return {
        mode:'inscription',
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
        this.$store.dispatch('inscription', {
          lastName: this.lastName,
          firstName: this.firstName,
          email: this.email,
          password: this.password,
          }).then ((response) => {
          console.log(response);
          self.$router.push('/connect');
        }, function(error) {
          console.log(error)
        })
        },
  }
}
</script>

<template>
<main>

<div class="container py-4">
    <div class="row g-0 align-items-center">
      <div class="col-lg-6 mb-5 mb-lg-0">
        <div class="card cascading-right" style="
            background: hsla(0, 0%, 100%, 0.55);
            backdrop-filter: blur(30px);
            ">
          <div class="card-body p-5 shadow-5">
            <div class = "text-center">
              <h2 class="fw-bold">Bienvenue sur</h2>
              <img class= "mb-5" src="../../assets/groupomania/icon-left-font-monochrome-white.png" style="width: 200px;" alt="Logo_Groupomania">
            </div>
            <form @submit="handleSubmit">
            <h4 class="text-secondary mb-4">INSCRIPTION</h4>

                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input 
                        v-model="lastName"
                        type="text" 
                        class="form-control" 
                        placeholder="Nom"
                        />
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input 
                        v-model="firstName"
                        type="text" 
                        class="form-control" 
                        placeholder="Prénom" 
                        />
                    </div>
                  </div>
                </div>

              <!-- Email -->
              <div class="form-outline mb-4">
                <input 
                  v-model="email"
                  type="email" 
                  class="form-control" 
                  placeholder="Adresse mail"
                  @focusout="isEmailValid"
                />
                <p class="font-italic" v-if="emailError">Veuillez renseigner une adresse email correcte</p>
              </div>

              <!-- Mot de passe -->
              <div class="form-outline mb-4">
                <input 
                  autocomplete="on"
                  v-model="password"
                  type="password" 
                  class="form-control" 
                  placeholder="Mot de passe" 
                  @focusout="isPasswordValid"
                  />
                  <p class="font-italic" v-if="passwordError">Votre mot de passe doit contenir au moins 8 caractères dont une majuscule et un chiffre</p>
              </div>

              <!-- Bouton -->
              <div class="d-flex justify-content-between flex-column">
                    <button 
                    :disabled="!validatedFields" 
                    class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-5" 
                    :class="{'button-disabled' : !validatedFields}"
                    type="button"
                    @click="handleSubmit()">
                        <span v-if="status == 'loading'">Inscription en cours...</span>
                        <span v-else>S'inscrire</span>
                    </button>
              </div>
                                <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Vous avez déjà un compte? </p>
                    <router-link to="/login">
                        <button type="button" class="btn btn-outline-danger">Connectez-vous</button>
                    </router-link>
                  </div>
            </form>
          </div>
        </div>
      </div>
                  <div class="col-lg-6 mb-5 mb-lg-0 d-none d-lg-block d-xl-block"> 
        <img src="../../assets/groupomania/icon.png" class="w-100 rounded-4 shadow-4"
          alt="" />
            </div>
    </div>
  </div>

</main>
</template>