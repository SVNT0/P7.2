<script>

export default {
    name: 'navigation',
    methods: {
        logout() {
            if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
                localStorage.removeItem('users');
                window.location.href  = "/connect"
            } else {
                return false
            }
    }
}
}
</script>

<template>
<nav>
    <div>
        <div>
            <router-link to="/home">
                <img src="../assets/groupomania/icon-left-font-monochrome-white.png" height="60" alt="Groupomania Logo" loading="lazy" />
            </router-link>
        </div>

        <div>
                <div style="gap:10px">
                    <button 
                        type="button" 
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