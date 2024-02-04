<template>
  <div v-if="user" class="container mx-auto px-36">
    <form @submit="editProfile" class="flex justify-center mt-16 pb-4 border-b-2 border-gray-800">
      <div class="flex justify-center items-baseline mr-28">
        <div>
          <label class="text-white border-blue hover:bg-blue flex h-64 w-64 cursor-pointer flex-col items-center justify-center rounded-full border bg-gray-700 uppercase tracking-wide shadow-lg hover:opacity-80">
            <img src="/add_a_photo_outlined.svg" alt="">
            <span class="mt-2 font-bold text-base leading-normal">Upload Photo</span>
            <input type="file" class="hidden" id="editProfileImg"/>
          </label>
        </div>
      </div>
      <div class="w-96 -mt-1">
        <label for="editUserName" class="font-bold text-sm m-0 place-self-start">User name</label>
        <input id="editUserName" class="block w-full mb-2 p-2 rounded focus:outline-none focus:ring focus:border-gray-800" type="text" :value="user.username" placeholder="User Name">
        <label for="editLastName" class="font-bold text-sm m-0 place-self-start">Last name</label>
        <input id="editLastName" class="block w-full mb-2 p-2 rounded focus:outline-none focus:ring focus:border-gray-800" type="text" :value="user.lastName"  placeholder="Last Name">
        <label for="editPassword" class="font-bold text-sm m-0 place-self-start">Password</label>
        <input id="editPassword" class="block w-full mb-2 p-2 rounded focus:outline-none focus:ring focus:border-gray-800" type="text" :value="user.password" placeholder="Password">
        <label for="editBio" class="font-bold text-sm m-0 place-self-start">Bio</label>
        <textarea id="editBio" class="block w-full mb-2 p-2 rounded focus:outline-none focus:ring focus:border-gray-800 resize-none" :value="user.userBio"></textarea>
        <button class="mt-2 ml-[78.5%] p-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-600">Submit</button>
      </div>
    </form>
    <div class="px-60">
      <p class="mt-2 block font-bold text-2xl text-red-600">Danger Zone</p>
      <div class="flex justify-between items-center p-2 border-2 border-red-600 rounded">
        <p class="text-lg m-0">Delete Profile</p>
        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios'

  const token = ref(null)

  const user = ref(null)
  onMounted(async () => {
    const getToken = JSON.parse(localStorage.getItem('token'))
    if(getToken) {
      token.value = getToken
      const res = await axios.get('https://instagramserver-n7xg.onrender.com/users/get-me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer: ${token.value}` 
        }
      })
    user.value = res.data
    } else {
      navigateTo('/auth')
    }
  })
  const editProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('username', editUserName.value)
    formData.append('lastName', editLastName.value)
    formData.append('password', editPassword.value)
    formData.append('userBio', editBio.value)
    if(editProfileImg.files[0]) {
      formData.append('img', editProfileImg.files[0])
    }
    const res = await axios.put(`https://instagramserver-n7xg.onrender.com/users/edit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer: ${token.value}`
      }
    })
  }
</script>