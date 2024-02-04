<template>
  <div class="body">
    <div class="main">  	
      <input type="checkbox" id="chk" aria-hidden="true">
        <div class="signup">
          <form @submit="signUp">
            <label class="label" for="chk" aria-hidden="true">Sign up</label>
            <input class="input" type="text" name="txt" placeholder="User name" id="SignUpUserName" required="">
            <input class="input" type="text" name="lastName" placeholder="Last name" id="SignUpLastName" required="">
            <input class="input" type="password" name="password" placeholder="Password" id="SignUpPassword" required="">
            <button class="button">Sign up</button>
          </form>
        </div>
        <div class="login">
          <form @submit="LogIn">
            <label class="label" for="chk" aria-hidden="true">Login</label>
            <input class="input" type="text" name="username" placeholder="User name" id="LoginUserName" required="">
            <input class="input" type="password" name="password" placeholder="Password" id="LoginPassword" required="">
            <button class="button">Login</button>
          </form>
        </div>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios'

  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  definePageMeta({
    layout: false
  })

  onMounted(() => {
    const token = localStorage.getItem('token')
    if(token) {
      navigateTo('/')
    }
  })

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: SignUpUserName.value,
        lastName: SignUpLastName.value,
        password: SignUpPassword.value
      }
      const res = await axios.post('https://instagramserver-n7xg.onrender.com/users/sign-up', data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(res.status === 201) {
        localStorage.setItem('token', JSON.stringify(res.data))
        navigateTo('/')
      } else {
        toast.error("User Not Found!", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const LogIn = async (e) => {
    e.preventDefault();
    const data = {
      username: LoginUserName.value,
      password: LoginPassword.value
    }
    const res = await axios.post('https://instagramserver-n7xg.onrender.com/users/log-in', data, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(res.status === 201) {
      localStorage.setItem('token', JSON.stringify(res.data))
      toast.success("Welcome!", {
        autoClose: 1000,
      });
      navigateTo('/')
    } else {
      toast.error("User Not Found!", {
        autoClose: 1000,
      });
    }
  }

</script>

<style>
  .body{
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Jost', sans-serif;
    background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
  }
  .main{
    width: 400px;
    height: 500px;
    background: red;
    overflow: hidden;
    background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover;
    border-radius: 10px;
    box-shadow: 5px 20px 50px #000;
  }
  #chk{
    display: none;
  }
  .signup{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .label{
    color: #fff;
    font-size: 2.3em;
    justify-content: center;
    display: flex;
    margin: 60px;
    font-weight: bold;
    cursor: pointer;
    transition: .5s ease-in-out;
  }
  .input{
    width: 80%;
    height: 40px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 15px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  .button{
    width: 60%;
    height: 40px;
    margin: 10px auto;
    justify-content: center;
    display: block;
    color: #fff;
    background: #573b8a;
    font-size: 1em;
    font-weight: bold;
    margin-top: 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: .2s ease-in;
    cursor: pointer;
  }
  .button:hover{
    background: #6d44b8;
  }
  .login{
    height: 460px;
    background: #eee;
    border-radius: 60% / 10%;
    transform: translateY(-180px);
    transition: .8s ease-in-out;
  }
  .login label{
    color: #573b8a;
    transform: scale(.6);
  }

  #chk:checked ~ .login{
    transform: translateY(-500px);
  }
  #chk:checked ~ .login label{
    transform: scale(1);	
  }
  #chk:checked ~ .signup label{
    transform: scale(.6);
  }
</style>