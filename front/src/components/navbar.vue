<script>

export default {
    name: 'navbar',
    methods: {
        logout() {
            if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
                localStorage.removeItem('user');
                window.location.href  = "/login"
            } else {
                return false
            }
    }
}
}
</script>

<template>
<nav class="navbar navbar-expand-lg bg-gradient">
    <div class="container-fluid d-flex justify-content-between flex-row">
        <div>
            <router-link to="/home">
                <img src="../assets/groupomania/icon-left-font-monochrome-white.png" height="60" alt="Groupomania" loading="lazy" />
            </router-link>
        </div>
        <div>
                <div class="nav-item me-3 me-lg-0 d-flex justify-content-center align-items-center"  style="gap:10px">
                    <button 
                        type="button" 
                        class="btn btn-outline-light btn-sm"
                        @click="logout()">
                        Se deconnecter
                        </button>                   
                </div>
        </div>
    </div>
</nav>

</template>

<style>

nav {
    background-color: #0037ff;
}

a {
    text-decoration: none;
    color: black;
}

</style>