<template>
  <div v-if="data" class="backdrop-blur-sm bg-black/20 z-[10] fixed top-0 left-0 w-full h-full">
    <div class="flex w-full h-full justify-center items-center">
      <div class="relative flex bg-gray-700 h-[80%]">
        <img v-if="getFileName(data.postUrl) !== 'mp4'" class="object-cover" :src="data.postUrl" width="400" height="800"/>
        <video v-else class="object-cover" width="400" height="500" controls>
          <source :src="data.postUrl" type="video/mp4">
          <source :src="data.postUrl" type="video/ogg">
          Your browser does not support the video tag.
        </video>
        <div class="w-96">
          <span class="flex w-full justify-between items-center p-4 border-b-2 border-white">
            <span class="flex items-center">
              <img v-if="data.user.userImg" class="rounded-full object-cover mr-2" :src="data.user.userImg" alt="" width="30" height="30">
              <img v-else class="rounded-full mr-2" src="/user.jpg" alt="" width="30" height="30">
              <p class="text-white font-bold">{{ data.user.username }}</p>
            </span>
            <slot/>
          </span>
          <div class="overflow-auto p-3 h-[72%]">
            <div class="pb-2 mb-2 border-b-2 border-white" v-for="comment in comments">
              <span class="flex items-center">
                <img v-if="comment.user.userImg" class="rounded-full object-cover mr-2" :src="comment.user.userImg" alt="" width="30" height="30">
                <img v-else class="rounded-full mr-2" src="/user.jpg" alt="" width="30" height="30">
                <p class="text-white font-bold">{{ comment.user.username }}</p>
              </span>
              <p class="mt-2 leading-5 text-base text-white">{{ comment.text }}</p>
            </div>
          </div>
          <div class="flex justify-between w-full p-2 bg-gray-800">
            <div>
                <span v-if="!data.like" @click="like" class="cursor-pointer w-fit flex flex-col justify-center items-center">
                  <svg :id="data._id" fill="#fff" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 471.701 471.701" xml:space="preserve">
                  <g class="pointer-events-none">
                    <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                      c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                      l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                      C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                      s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                      c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                      C444.801,187.101,434.001,213.101,414.401,232.701z"/>
                  </g>
                  </svg>
                <p class="mt-1 text-white text-sm leading-3">{{ data.likes.length }}</p>
                </span>
                <span v-if="data.like" @click="removeLike" class="w-fit flex flex-col justify-center items-center -mt-0.5">
                  <svg :id="data._id" class="cursor-pointer" fill="#fff" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path class="pointer-events-none" fill-rule="evenodd" d="M12,20.9996 L3.847,13.2406 C2.656,12.1076 2,10.5986 2,8.9916 C2,7.3846 2.656,5.8756 3.847,4.7416 C6.067,2.6286 9.552,2.4386 12,4.1686 C14.448,2.4386 17.933,2.6286 20.153,4.7416 C21.344,5.8756 22,7.3846 22,8.9916 C22,10.5986 21.344,12.1076 20.153,13.2406 L12,20.9996 Z"/>
                  </svg>
                  <p class="mt-0 text-sm leading-3 text-white">{{ data.likes.length }}</p>
                </span>
            </div>
            <span v-if="profile" class="relative cursor-pointer">
              <span @click="deleteMyPost" id="deletePost" class="hidden rounded w-[316%] -left-10 p-2 bg-white absolute bottom-10">
                Delete Post
              </span>
              <svg @click="openDeleteList" class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M6 12h0m6 0h0m6 0h0"/>
              </svg>
              </span>
          </div>
          <form @submit="addComment" class="flex absolute bottom-0">
            <input id="commentText" class="outline-none text-white w-[334px] p-2 bg-gray-800" type="text" placeholder="Add comment">
            <button class="p-2 bg-gray-800">
              <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                <g id="SVGRepo_iconCarrier"> <path d="M20 4L3 11L10 14L13 21L20 4Z" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round"/> </g>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios'

  const { data, profile } = defineProps([ 'data', 'profile' ])

  const comments = ref(null)
  const token = ref(null)
  const getUser = ref(null)

  onMounted(async () => {
    const getToken = JSON.parse(localStorage.getItem('token'))
    if(getToken) {
      token.value = getToken
      const res = await axios.get('http://localhost:3001/users/get-me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer: ${token.value}` 
        }
      })
      getUser.value = res.data
    } else {
      navigateTo('/auth')
      return
    }
    getComments()
  })

  const getComments = async () => {
    const res = await axios.get(`http://localhost:3001/posts/comments/${data._id}`)
    comments.value = res.data.reverse();
  }

  const addComment = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:3001/posts/add-comment/${data._id}`, {
      text: commentText.value
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token.value}`
      }
    })
    if(res.status === 201) {
      e.target.reset()
      getComments()
    }
  }

  const like = async (e) => {
    e.target.disabled = true
    const res = await axios.put(`http://localhost:3001/posts/like/${data._id}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer: ${token.value}`
      }
    })
    if(res.status === 200) {
      data.likes.push(getUser.value._id)
      data.like = true
    } else {
      alert('Error')
    }
    e.target.disabled = false
  }

  const removeLike = async (e) => {
    e.target.disabled = true
    const res = await axios.put(`http://localhost:3001/posts/remove-like/${data._id}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer: ${token.value}`
      }
    })
    if(res.status === 200) {
      data.likes = data.likes.filter(e => e !== getUser.value._id)
      data.like = false
    } else {
      alert('Error')
    }
    e.target.disabled = false
  }

  const openDeleteList = () => {
    deletePost.classList.toggle('hidden')
  }

  const deleteMyPost = async () => {
    await axios.delete(`http://localhost:3001/posts/delete/${data._id}`, {
      headers: {
        "Authorization": `Bearer: ${token.value}`
      }
    })
    window.location.reload()
  }
</script>