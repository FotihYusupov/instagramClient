<template>
  <div v-if="posts" class="container mx-auto px-36">
    <div class="mt-12 flex justify-between flex-wrap mb-12">
      <div v-if="posts.length > 0" v-for="post in posts">
        <button @click="findPost" :id="post._id">
          <img v-if="getFileName(post.postUrl) !== 'mp4'" class="pointer-events-none w-96 h-96 object-down rounded mb-6" :src="post.postUrl" alt="">
          <video v-else :src="post.postUrl" class="pointer-events-none w-96 h-96 object-cover rounded mb-6"></video>
        </button>
      </div>
      <p v-else class="mt-20 w-full text-center text-2xl text-gray-400">You have not posted anything.</p>
    </div>
  </div>
  <PostComponent v-if="openModal" :data="modalData">
    <img @click="openModal = false" class="cursor-pointer" src="/Close-256.png" alt="" width="22" height="22">
  </PostComponent>
</template>

<script setup>
  import axios from 'axios'

  const modalData = ref(null)

  const openModal = ref(false)

  const posts = ref(null)
  onMounted(async () => {
    const getToken = JSON.parse(localStorage.getItem('token'))
    const res = await axios.get(`http://localhost:3001/posts`, {
      headers: {
        'Authorization': `Bearer: ${getToken}`
      }
    })
    posts.value = res.data
  })

  const findPost = (e) => {
    const id = e.target.id
    const findPost = posts.value.find(post => post._id === id)
    modalData.value = findPost
    openModal.value = true
  }

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
</script>