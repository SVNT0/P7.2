<script>
import navigation from '../../components/navigation.vue'
import { mapState } from 'vuex';
import Axios from '../../config/axios-config.js'

export default {
    name: 'create',
    components: {
        navigation,
    },
    data() {
		return {
			formData: {
				userId: '',
				lastName: '',
				firstName:'',
        		title: '',
        		description: '',
				file:'',
				titleError:'',
				titleMinLength: 5,
				titleMaxLength: 50,
				},
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
		isTitleValid() {
		if (this.formData.title !== "" || 
			this.formData.title.length <= this.formData.titleMinlength || 
			this.formData.title.length >= this.formData.titleMaxlength) {
				this.formData.titleError = false;
			} else {
			this.formData.titleError = true;
			}
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

		createPost(e) {
			const token = this.$store.state.user.token;
			const userId = this.$store.state.user.userId;
			let input = this.$refs.fileInput
			let imageUrl = input.files
			Axios.post('/post/create', {
				userId: userId,
				title: this.formData.title, 
				description: this.formData.description,
				file: imageUrl[0]
				}, {
					headers: {
						['Authorization']: `Basic ${token}`,
						"Content-Type": "multipart/form-data"
					},
				})
			.then((res) => {
				alert("Votre publication a été ajoutée !");
				this.$router.push("/home")
			})
			.catch((err) => {
				alert("Echec de la publication");
			})
			e.preventDefault();
		},
	}
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
            <font-awesome-icon icon="fa-solid fa-arrow-left"/>
            </router-link>
        </div>

		<div>
			<h1>Nouvelle publication</h1>
			<form @submit.prevent="create">
				<div>
					<label for="title">Titre <span class="require">*</span></label>
					<input 
						type="text" 
						id="title" 
						v-model="formData.title"
						required
						@focusout="isTitleValid"
					/>
					<p v-if="formData.titleError">Le titre est obligatoire et doit contenir entre 5 et 50 caractères</p>
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
						<font-awesome-icon icon="fa-solid fa-plus"/> Choisir un fichier
					</label>  
					<input 
						ref="fileInput"
						@input="pickFile"
						type="file"
						accept="image/*, video/*"
						class="input"
						id="file"
					/>
						<div v-if="this.previewImage" :style="{ 'background-image': `url(${previewImage})` }" alt ="Image de la publication"></div>
				</div>
				<div>
					<button 
						type="submit" 
						:disabled="!validatedFields"
						class="ajouter-publication"
						:class="{'button-disabled' : !validatedFields}"
					>Ajouter la publication
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

main{
	background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)), url(https://www.stihle-freres.fr/wp-content/uploads/2020/07/open-space.jpg);
}

.ajouter-publication{
	background: linear-gradient(to right, #0189f8, #0091ff, #0022ff, #0003c6);
}

label small {
    color: #999;
    font-weight: normal;
}

p {
	color: black;
}

.input {
    display: none;
}

.imagePreview {
	max-width: 700px;
	height: 250px;
	display: block;
	cursor: pointer;
	background-size: cover;
	background-position: center center;
}

</style>