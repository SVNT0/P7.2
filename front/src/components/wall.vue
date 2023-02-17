<script>
import Axios from '../config/axios-config.js';
import jwt_decode from "jwt-decode"

import moment from 'moment/min/moment-with-locales'
import 'moment/locale/fr'

export default {
    name:'wall',

    data() {
      return {
        posts : [],
      };    
    },

    methods: {
      dateTime(createAt) {
      moment.locale('fr');
        return moment(createAt).startOf('second').fromNow(createAt);
      },

      getUserData() {
        const token = this.$store.state.user.token
        const decoded = jwt_decode(token)
        this.users = decoded
        return this.users
      },

      getAllPosts() {
        const token = this.$store.state.user.token
        Axios.get('/post/home', {
					headers: {
						['Authorization']: `Basic ${token}`,
						"Content-Type": "multipart/form-data"            
					},            
        })
          .then(res => this.posts = res.data)
          .catch(err => console.log(err))
      }, 

      editPost(postId) {
        const token = this.$store.state.user.token;
        const userId = this.$store.state.user.userId
        Axios.get('/post/'+postId, {
          headers: {
            ['Authorization']: `Basic ${token}`,
          },   
        })
        .then(res => {
        this.posts.userId = res.data.userId
        })
        .catch(err => console.log(err))

        if (this.posts.userId == userId) { 
          return alert("Vous n'avez pas les droits pour modifier cette publication")     
        } else {
          return this.$router.push({name:'editPost', params: {id: postId}})
        }
      },

      deletePost(index) {
      const token = this.$store.state.user.token;
      let postId = this.posts[index].post._id
      if (
          window.confirm(
            "Êtes-vous sûr de vouloir supprimer cette publication ?"
          )
      ) 
      Axios.delete('/post/'+postId, {
					headers: {
						['Authorization']: `Basic ${token}`,
					},        
      })
      .then(res => this.posts.splice(index, 1))
      .catch(err => alert("Vous n'avez pas les droits pour supprimer cette publication"))
      },

      addLikes(index) {
        const token = this.$store.state.user.token  
        const userId = this.$store.state.user.userId 
        let postId = this.posts[index].post._id
        let liked = 1 
        if (this.posts[index].post.usersLiked.includes(userId)=== true) {
          liked = -1
        }
          Axios.post('/post/like', {
            userId: userId,
            _id: postId,
            likes: liked
          }, {
            headers: {
              ['Authorization']: `Basic ${token}`,
            },
          })
          .then(res => {
            this.isLiked = res.data
            this.getAllPosts();       

          })
          .catch(err => (console.log(err)))
        }
},

    mounted() {
      this.getAllPosts()
      this.getUserData()
    }

}

</script>

<template>
<main>


  <!------------------- Publication ------------------->
<section 
  v-for="(post, index) in posts" :key="post._id">   
  <div>
    <div><img style="width: 45px;" alt="Avatar" src="../assets/groupomania/default-avatar.png">
        <div>
            <span>{{ post.user.firstName }} {{ post.user.lastName }}</span>
            <span>Posté il y a {{ dateTime(post.post.createAt) }}</span>
        </div>
    </div>
    <button class= "menu-deroulant bouton"  v-if="post.user._id === this.$store.state.user.userId || this.getUserData().role === 1">
        <div data-bs-toggle="menu-deroulant">
        <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"/>
        </div>
        <ul class="menu-deroulant-menu">
            <li><a 
            @click="editPost(post.post._id)">Modifier</a></li>
            <li><hr></li>
            <li><a @click="deletePost(index)">Supprimer</a></li>
        </ul>
    </button>
  </div>
  <div>
    <div><h5>{{post.post.title}}</h5></div>
    <div><span>{{post.post.description}}</span></div>
    <div class="imageUrl" v-if="post.post.imageUrl">
        <div>
          <div class="feed-image">
            <img class="onlyimageUrl"
            :src="`http://localhost:3000/images/${post.post.imageUrl}`"
            alt = "image du post"/> 
          </div>   
        </div>
    </div>

    <div class="bouton">
      <div @click="addLikes(index)">
        <font-awesome-icon v-if="post.post.usersLiked.includes(this.$store.state.user.userId)" class="icon red" icon="fa-solid fa-heart"/>
        <font-awesome-icon v-else class="icon grey" icon="fa-solid fa-heart"/>
        <span id="count" data-count="0">{{post.post.likes}}</span> 
      </div>
    </div>

  </div>
</section>
</main>
</template>

<style lang="scss">

.feed-image img {
  width: 100%;
  height: auto;
}

.feed-text {
  gap: 10px;
}

.menu-deroulant {
  cursor: pointer;
}
.menu-deroulant-menu li {
  position: relative;
}
.menu-deroulant-menu {
  display: none;
  position: absolute;
  left: 100%;
  top: -7px;
}
.menu-deroulant-menu {
  right: 100%;
  left: auto;
}

.imageUrl {
  display: flex;
  margin: 10px 0px;
  max-width: 100%;
  min-height: 200px;
  background-color: transparent;
  border-radius: 4px;
}

.onlyimageUrl {
  padding: 10px 0px;
}

.bouton {
    margin: 20px 15px 15px 15px;
    position: relative;
    cursor: pointer;
    margin-right: 16px;
    position: absolute;
    background-color: transparent;
    border: none;
    font-size:22px;
    transition:200ms;
    }

.red {
  color: #FD2D01;
}

.grey {
  color: #d9d9d9;
}

</style>