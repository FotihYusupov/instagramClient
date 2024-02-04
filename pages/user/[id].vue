<template>
  <div v-if="posts" class="container mx-auto px-36">
    <div class="mt-14 flex items-center w-[60%] mx-auto">
      <img v-if="user.userImg" class="rounded-full mr-20 object-cover" :src="user.userImg" alt="" width="200" height="200">
      <img v-else class="rounded-full mr-20" src="/user.jpg" alt="" width="200" height="200">
      <div class="w-[80%]">
        <div class="flex w-full justify-between items-center">
          <h2 class="text-4xl mb-3">{{ user.username }}</h2>
        </div>
        <h3 class="font-bold text-xl mb-2">{{ user.username }} {{ user.lastName }}</h3>
        <p v-if="user.userBio">{{ user.userBio }}</p>
      </div>
    </div>
    <p class="mt-12 ml-80 text-2xl text-gray-800">Posts</p>
    <div class="w-[75%] mx-auto border-t-4 mb-8 border-gray-800"></div>
    <div class="flex justify-between flex-wrap mb-12">
      <div v-if="posts.length > 0" v-for="post in posts">
        <button @click="findPost" :id="post._id">
          <img v-if="getFileName(post.postUrl) !== 'mp4'" class="pointer-events-none w-96 h-96 object-down rounded mb-6" :src="post.postUrl" alt="">
          <video v-else :src="post.postUrl" class="pointer-events-none w-96 h-96 object-cover rounded mb-6"></video>
        </button>
      </div>
      <p v-else class="mt-20 w-full text-center text-2xl text-gray-400">You have not posted anything.</p>
    </div>
    <PostComponent v-if="openModal" :data="modalData">
      <img @click="openModal = false" class="cursor-pointer" src="/Close-256.png" alt="" width="22" height="22">
    </PostComponent>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import PostComponent from '../../components/postComponent.vue'

  const { id } = useRoute().params
  
  const modalData = ref(null)

  const openModal = ref(false)

  const user = ref(null)
  const posts = ref(null)

  onMounted(async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const res = await axios.get(`http://localhost:3001/users/user/${id}`)
    user.value = res.data
    const getPosts = await axios.get(`http://localhost:3001/posts/user/${id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer: ${token}`
      }
    })
    posts.value = getPosts.data
  })

  const handleEscapeKeyPress = (event) => {
    if (event.key === 'Escape') {
      openModal.value = false
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', handleEscapeKeyPress);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEscapeKeyPress);
  });

  const findPost = (e) => {
    const id = e.target.id
    const findPost = posts.value.find(post => post._id === id)
    modalData.value = findPost
    openModal.value = true
  }
</script>