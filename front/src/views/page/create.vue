<script>
import navbar from '../../components/navbar.vue'
import { mapState } from 'vuex';
import Axios from '../../config/axios-config.js'

export default {
    name: 'create',
    components: {
        navbar,
    },
    data() {
		return {
			formData: {
				userId: '',
				nom: '',
				prénom:'',
        		title: '',
        		description: '',
				file:'',
				titleError:'',
				titleMinLength: 2,
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

		create(e) {
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

<div class="container mt-3 mb-5">
	<div class="d-flex justify-content-center row">

        <div class="border-bottom mt-4">
            <router-link to="/home" class="link-secondary"> 
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="mb-3" />
            </router-link>
        </div>	

		<div class="col-md-8 col-md-offset-2 ">
			<h1 class="mt-3 mb-4">Nouvelle publication</h1>
			<form @submit.prevent="create">
				<div class="form-group">
					<label for="title">Titre <span class="require">*</span></label>
					<input 
						type="text" 
						class="form-control"
						id="title" 
						v-model="formData.title"
						required
						@focusout="isTitleValid"
					/>
					<p class="font-italic" v-if="formData.titleError">Le titre est obligatoire et doit contenir entre 3 et 50 caractères</p>
				</div>
				<div class="form-group">
					<label for="description">Description</label>
					<textarea 
						rows="5" 
						class="form-control" 
						id="description"
						v-model="formData.description"
						@focusout="isDescriptionValid"					 
						style="resize: none;">
					</textarea>
				</div>
				<div class="form-group mb-2">
					<p><span class="require">*</span> - champs obligatoires</p>
					<label for="file" class="btn btn-outline-danger btn-sm" >
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
						<div v-if="this.previewImage" class="m-4 imagePreview" :style="{ 'background-image': `url(${previewImage})` }" alt = "Image de la publication"></div>
				</div>
				<div class="form-group  d-flex justify-content-end">
					<button 
						type="submit" 
						:disabled="!validatedFields" 
						class="btn btn-danger gradient-custom-2"
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

main {
	height: 100%;
}

.btn btn-danger gradient-custom-2 {
	background: linear-gradient(to right, #0189f8, #0091ff, #0022ff, #0003c6);
}

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

.imagePreview {
	max-width: 700px;
	height: 250px;
	display: block;
	cursor: pointer;
	background-size: cover;
	background-position: center center;
}

</style>