<script>
import navigation from '../../components/navigation.vue'
import { mapState } from 'vuex';
import Axios from '../../config/axios-config.js'
import {useRoute} from "vue-router";

export default {
    name: 'modify',
    components: {
        navbar,
    },
    data() {
		return {
			formData: {},
			previewImage: null,
		};
	},

	computed: {
		...mapState(['status']),  
		validatedFields() {
			if (this.formData.title !== "" && this.formData.titleError !== true) {
				return true
			} else {
            return false
			}
		},
	},

	methods: {
		selectImage() {
			this.$refs.fileInput.click()
		},

		pickFile() {
			let input = this.$refs.fileInput
			let imageUrl = input.files
			if (imageUrl && imageUrl[0]) {
				let reader = new FileReader
				reader.onload = e => {
					this.previewImage = e.target.result
				}
				reader.readAsDataURL(imageUrl[0])
				this.$emit('input', imageUrl[0])
			}
		},

        editPost() {
			const token = this.$store.state.user.token;
            let postId = this.formData._id;
			let input = this.$refs.fileInput
			let imageUrl = input.files
			Axios.put('/post/'+postId, {
				title : this.formData.title,
				description : this.formData.description,
				file: imageUrl[0]
			}, {
				headers: {
					'Authorization': `Basic ${token}`,
					"Content-Type": "multipart/form-data"
				},   				
			})
			.then((res) => {
				this.$router.push("/home")
			})
			.catch(err => console.log(err.message))
        },
	},

    mounted(){
		const token = this.$store.state.user.token;
        const route = useRoute();
        let postId = route.params.id;
        Axios.get('/post/'+postId, {
			headers: {
				['Authorization']: `Basic ${token}`,
				"Content-Type": "multipart/form-data"
			},   
		})
        .then(res => {
			this.formData = res.data
			if (res.data.imageUrl) {
			this.previewImage = 'http://localhost:3000/images/' + res.data.imageUrl
			}
		})
        .catch(err => console.log(err))
    }, 
}

</script>

<template>
<main>
<navbar></navbar>

<div>
	<div>

<!------------ Retour acceuil ------------>
        <div>
            <router-link to="/home"> 
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="mb-3" />
            </router-link>
        </div>		

		<div>
			<h1>Modifier la publication</h1>	
			<form @submit.prevent="editPost">
				<div>
					<label for="title">Titre <span class="require">*</span></label>
					<input 
						type="text" 
						id="title" 
						v-model="formData.title"
						required
						@focusout="isTitleValid"
					/>
					<p v-if="formData.titleError">Le titre est obligatoire et doit contenir entre 3 et 50 caractères</p>
				</div>	
				<div>
					<label for="description">Description</label>
					<textarea 
					rows="5" 
					id="description"
					v-model="formData.description"
					@focusout="isDescriptionValid"					 
					style="resize: none;">
					</textarea>
				</div>
				<div>
					<p><span class="require">*</span> - champs obligatoires</p>
					<label for="file">
						<font-awesome-icon icon="fa-solid fa-plus" /> Choisir un fichier
					</label>  
					<input 
						ref="fileInput"
						@input="pickFile"
						type="file"
						accept="image/*, video/*"
						class="input-file"
						id="file"
					/> 
					<div v-if="this.previewImage" id="imagePreview" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage"> 
					</div>					
				</div>

				<div>
					<button 
					type="submit" 
					:disabled="!validatedFields" 
					:class="{'button-disabled' : !validatedFields}"
					>
                        Modifier la publication
					</button>
					</div>
			</form>
		</div>
		
	</div>
</div>

</main>
</template>

<style>

.require {
    color: #666;
}
label small {
    color: #999;
    font-weight: normal;
}

p {
	color: black;
}

.input-file {
    display: none;
}

</style>