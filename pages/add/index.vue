<template>
  <div class="container mx-auto px-36">
    <div class="mt-12 flex justify-center">
      <div class="text-gray-800 p-4 rounded-lg border-2 border-gray-800">
        <h2 class="mt-4 mb-2 text-2xl font-bold">Add New Post</h2>
        <form @submit="addPost" id="addPostForm">
          <label class="font-bold text-sm m-0 place-self-start" for="postDesc">Post Description</label>
          <input class="block w-full mb-2 p-2 rounded focus:outline-none focus:ring focus:border-gray-800" type="text" name="postDesc" id="postDesc" placeholder="Post Description" required>
          <p class="font-bold text-sm">Post File</p>
          <div class="mt-2 flex items-center justify-center w-96">
            <label for="dropzoneFile" class="p-4 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-800"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-800">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
            </label>
            <input id="dropzoneFile" name="file" type="file" class="hidden" required/>
          </div>
          <button type="submit" class="w-full mt-4 p-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-600">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
  import axios from 'axios'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  const token = ref(null)
  onMounted(async () => {
    const getToken = JSON.parse(localStorage.getItem('token'))
    if(!getToken) {
      navigateTo('/auth')
      return
    }
    token.value = getToken
  })

  const addPost = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('file', dropzoneFile.files[0])
    formData.append('postDesc', postDesc.value)
    const res = await axios.post('https://instagramserver-n7xg.onrender.com/posts/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer: ${token.value}`
      }
    })
    if(res.status === 201) {
      const notify = () => {
        toast.success("New post added!", {
          autoClose: 1000,
        });
      }
      e.target.reset()
      notify()
    }
  }
</script>