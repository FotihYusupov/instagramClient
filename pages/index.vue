<template>
  <div v-if="profile" class="container mx-auto px-36 relative">
    <div class="flex justify-around mt-4">
      <div class="w-96">
      </div>
      <div>
        <div v-if="posts" class="post-item relative" v-for="post in posts" :id="post._id">
          <div class="mt-2 flex items-center bg-white p-2 rounded-t-lg border-b-4 border-gray-900">
            <img v-if="post.user.userImg" class="rounded-full object-cover mr-2" :src="post.user.userImg" alt="" width="30" height="30">
            <img v-else class="rounded-full mr-2" src="/user.jpg" alt="" width="30" height="30">
            <p class="text-xl">{{ post.user.username }}</p>
          </div>
          <img v-if="getFileName(post.postUrl) !== 'mp4'" :src="post.postUrl" alt="" width="400" height="500">
          <video controls v-else width="400" height="500" autoplay muted>
            <source :src="post.postUrl" type="video/mp4">
            <source :src="post.postUrl" type="video/ogg">
            Your browser does not support the video tag.
          </video>
          <div class="p-2 bg-white rounded-b-lg border-t-4 border-gray-900">
            <div class="flex">
              <div>
                <span v-if="!post.like" class="cursor-pointer w-fit flex flex-col justify-center items-center">
                  <svg @click="like" :id="post._id" fill="#000000" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
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
                <p class="mt-1 text-sm leading-3">{{ post.likes.length }}</p>
                </span>
                <span v-if="post.like" class="w-fit flex flex-col justify-center items-center -mt-0.5">
                  <svg @click="removeLike" :id="post._id" class="cursor-pointer" fill="rgb(17 24 39)" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path class="pointer-events-none" fill-rule="evenodd" d="M12,20.9996 L3.847,13.2406 C2.656,12.1076 2,10.5986 2,8.9916 C2,7.3846 2.656,5.8756 3.847,4.7416 C6.067,2.6286 9.552,2.4386 12,4.1686 C14.448,2.4386 17.933,2.6286 20.153,4.7416 C21.344,5.8756 22,7.3846 22,8.9916 C22,10.5986 21.344,12.1076 20.153,13.2406 L12,20.9996 Z"/>
                  </svg>
                  <p class="mt-0 text-sm leading-3">{{ post.likes.length }}</p>
                </span>
              </div>
              <div @click="openComments" :id="post._id" class="cursor-pointer">
                <svg class="pointer-events-none block w-fit h-fit -mt-1 ml-2" width="33px" height="33px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="comment"><path class="block w-full h-full" fill="#231F20" d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"></path></svg>
              </div>
            </div>
            <p class="text-slate-800">{{ post.postDesc }}</p>
          </div>
          <div :id="'comment-' + post._id" class="overflow-auto hidden absolute rounded text-white w-80 h-[85%] bg-gray-900 -left-[85%] top-4">
            <form @submit="addComment" class="flex">
              <input :id="'commentText-' + post._id" class="outline-none text-white w-[268px] p-2 bg-gray-800" type="text" placeholder="Add comment">
              <button class="p-2 bg-gray-800">
                <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                  <g id="SVGRepo_iconCarrier"> <path d="M20 4L3 11L10 14L13 21L20 4Z" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round"/> </g>
                </svg>
              </button>
            </form>
            <div class="p-4 pb-2 mb-2 border-b-2 border-white" v-for="comment in post.comments">
              <span class="flex items-center">
                <img v-if="comment.user.userImg" class="rounded-full object-cover mr-2" :src="comment.user.userImg" alt="" width="30" height="30">
                <img v-else class="rounded-full mr-2" src="/user.jpg" alt="" width="30" height="30">
                <p class="text-white font-bold">{{ comment.user.username }}</p>
              </span>
              <p class="mt-2 leading-5 text-base text-white">{{ comment.text }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="sticky top-3 h-full  w-80 ml-4">
        <nuxtLink to="/profile" class="flex items-center pb-2 mb-2 border-b-2 border-gray-800">
          <img v-if="profile.userImg" class="rounded-full object-cover mr-2" :src="profile.userImg" alt="" width="60" height="60">
          <img v-else class="rounded-full mr-2" src="/user.jpg" alt="" width="60" height="60">
          <p class="ml-4">{{ profile.username }}</p>
        </nuxtLink>
        <p class="mb-2">Recommendations for you</p>
        <nuxtLink class="flex items-center mb-2" v-for="user in users" :to="'/user/' + user._id">
          <img v-if="user.userImg" class="rounded-full object-cover mr-2" :src="user.userImg" alt="" width="60" height="60">
          <img v-else class="rounded-full mr-2" src="/user.jpg" alt="" width="60" height="60">
          <div>
            <p>{{ user.username }}</p>
            <p>{{ user.username }} {{ user.lastName }}</p>
          </div>
        </nuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios';

  const posts = ref(null)
  const token = ref(null)
  const users = ref(null)
  const profile = ref(null)

  onMounted(async () => {
    token.value = JSON.parse(localStorage.getItem('token'))
    if(!JSON.parse(localStorage.getItem('token'))) {
      navigateTo('/auth')
    }
    const res = await axios.get('http://localhost:3001/users')
    users.value = res.data.reverse().slice(0, 8)
    const user = await axios.get('http://localhost:3001/users/get-me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${token.value}` 
      }
    })
    profile.value = user.data
    getData()
  })

  const getData = async () => {
    const res = await axios.get('http://localhost:3001/posts', {
      headers: {
        'Authorization': `Bearer: ${token.value}`
      }
    })
    for(let i = 0; i < res.data.length; i++) {
      const response = await axios.get(`http://localhost:3001/posts/comments/${res.data[i]._id}`)
      res.data[i].comments = response.data.reverse();
      posts.value = res.data.reverse();
    }
  }

  const like = async (e) => {
    e.target.disabled = true
    const res = await axios.put(`http://localhost:3001/posts/like/${e.target.id}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer: ${token.value}`
      }
    })
    if(res.status === 200) {
      getData()
    } else {
      alert('Error')
    }
    e.target.disabled = false
  }

  const removeLike = async (e) => {
    e.target.disabled = true
    const res = await axios.put(`http://localhost:3001/posts/remove-like/${e.target.id}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer: ${token.value}`
      }
    })
    if(res.status === 200) {
      getData()
    } else {
      alert('Error')
    }
    e.target.disabled = false
  }

  const openComments = async (e) => {
    const id = `comment-${e.target.id}`
    const comment = document.getElementById(id)
    comment.classList.toggle('hidden')
  }

  const addComment = async (e) => {
    e.preventDefault();
    const id = e.target.closest('.post-item').id
    const commentText = document.querySelector(`#commentText-${id}`)
    const res = await axios.post(`http://localhost:3001/posts/add-comment/${id}`, {
      text: commentText.value
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token.value}`
      }
    })
    if(res.status === 201) {
      e.target.reset()
      getData()
      console.log(posts.value);
    }
  }
</script>

<style>
  body {
    background-color: #e9e9e9;
  }
</style>