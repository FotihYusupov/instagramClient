<template>
  <div class="container px-36">
    <form @submit="searchUsers" class="mt-2">
        <label for="defaultSearch" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="defaultSearch" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required>
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
    </form>
    <div class="flex justify-between mt-2 w-full" v-if="users">
      <div class="bg-gray-800 text-white flex items-center justify-between p-2 rounded border border-1 border-gray-800" v-for="user in users">
        <img v-if="user.userImg" class="rounded-full object-cover mr-2" :src="user.userImg" alt="" width="50" height="50">
        <img v-else class="rounded-full mr-2" src="/user.jpg" alt="" width="50" height="50">
        <span>
          <p class="font-bold ">{{ user.username }}</p>
          <p>{{ user.username }} {{ user.lastName }}</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios'

  const users = ref(null)

  onMounted(async () => {
    const res = await axios.get('https://instagramserver-n7xg.onrender.com/users')
    users.value = res.data;
  })

  const searchUsers = async (e) => {
    e.preventDefault();
    const res = await axios.get(`https://instagramserver-n7xg.onrender.com/users/${defaultSearch.value}`)
    users.value = res.data;
  }
</script>