<template>
    <div class="container wrapper">
        <div class="container" id="container">

            <div class="form-container register-container">
                <form @submit.prevent="Register()" method="post">
                    <h1>Register</h1>
                    <input type="text" placeholder="Full Name" id="full-name" v-model="user.fullName">
                    <input type="text" placeholder="User Name" id="user-Name-Re" v-model="user.userName">
                    <input type="email" placeholder="Email" id="email" v-model="user.email">
                    <input type="password" placeholder="Password" id="password-Re" v-model="user.passWord">
                    <button type="submit">Register</button>
                    <span>or use your account</span>
                    <div class="social-container">
                        <a href="#" class="social"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
                        <a href="#" class="social"><font-awesome-icon :icon="['fab', 'github']" /></a>
                        <a href="#" class="social"><font-awesome-icon :icon="['fab', 'google']" /></a>
                    </div>
                </form>
            </div>

            <div class="form-container login-container">
                <form @submit.prevent="Login()">
                    <h1>Login</h1>
                    <input type="text" placeholder="User Name" id="user-Name" v-model="user.userName">
                    <input type="password" placeholder="Password" id="password" v-model="user.passWord">
                    <div class="content">
                        <div class="checkbox">
                            <input type="checkbox" name="checkbox" id="checkbox">
                            <label>Remember me</label>
                        </div>
                        <div class="pass-link">
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>
                    <button>Login</button>
                    <span>or use your account</span>
                    <div class="social-container">
                        <a href="#" class="social"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
                        <a href="#" class="social"><font-awesome-icon :icon="['fab', 'github']" /></a>
                        <a href="#" class="social"><font-awesome-icon :icon="['fab', 'google']" /></a>
                    </div>
                </form>
            </div>

            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1 class="title">Hello <br> friends</h1>
                        <p>if You have an account, login here.</p>
                        <button class="ghost" id="login">Login
                            <i class="lni lni-arrow-left login"></i>
                        </button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1 class="title">Get started <br> with a new account</h1>
                        <p>if you don't have an account yet, register here.</p>
                        <button class="ghost" type="submit" id="register">Register
                            <i class="lni lni-arrow-right register"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios';

export default {
  inject: ['checkAuth'],
    data() {
        return {
            user: {
                fullName: '',
                userName: '',
            }
        }
    },

    methods: {
        handleTransferForm() {
            const registerButton = document.getElementById("register");
            const loginButton = document.getElementById("login");
            const container = document.getElementById("container");

            registerButton.addEventListener("click", () => {
                container.classList.add("right-panel-active");
            });

            loginButton.addEventListener("click", () => {
                container.classList.remove("right-panel-active");
            });
        },

        async Register() {
            await axios.post(`http://localhost:3000/api/auth/register`, this.user)
                .then(() => {
                    alert('Dang ky thanh cong!!!!!')
                    this.$router.replace({ path: '/login' });
                })
                .catch(err => {
                    alert('Dang ky khong thanh cong!!!!!')
                    alert('Kiem tra lai thong tin va email')

                    console.log(err);
                })
        },



        async Login() {
            console.log(this.user);
            
            await axios.post(`http://localhost:3000/api/auth/login`, this.user)
                .then(res => {
                    localStorage.setItem('Token', JSON.stringify(res.data.accessToken))
                    localStorage.setItem('cart', JSON.stringify(res.data.cart))
                    if (res.data.admin == true) {
                        this.$router.push('/admin')
                    }
                    if (res.data.admin == false) {
                        this.$router.push('/home')
                    }
                    this.checkAuth = true
                    //this.$router.replace({path:})
                    alert('Dang nhap thanh cong!!!!!')
                  //  this.$router.replace({ path: '/home' })
                })
                .catch(err => {
                    console.log(err);
                    alert('Dang nhap khong thanh cong!!!!!')
                })
        },
        // hiddenHeader2(){
        //     const header = document.getElementsByClassName('header2')[0];
        //     header.style.display = 'none'
        // },
        // hiddenHeader1(){
        //     const header1 = document.getElementsByClassName('header1')[0];
        //     header1.style.display = 'none'
        // },
        // hiddenHeader3(){
        //     const header3 = document.getElementsByClassName('header3')[0];
        //     header3.style.display = 'none'
        // },
        // hiddenFooter(){
        //     const footer= document.getElementsByClassName('footers')[0];
        //     footer.style.display = 'none'
        // }
    },



    async mounted() {
        this.handleTransferForm()
    }

}
</script>
<style scoped>
* {
    box-sizing: border-box;
}

body {
    display: flex;
    background-color: #f6f5f7;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: "Poppins", sans-serif;
    overflow: hidden;
    height: 100vh;
}

h1 {
    font-weight: 700;
    letter-spacing: -1.5px;
    margin: 0;
    margin-bottom: 15px;
}

h1.title {
    font-size: 45px;
    line-height: 45px;
    margin: 0;
    text-shadow: 0 0 10px rgba(16, 64, 74, 0.5);
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
    text-shadow: 0 0 10px rgba(16, 64, 74, 0.5);
}

span {
    font-size: 14px;
    margin-top: 25px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
    transition: 0.3s ease-in-out;
}

a:hover {
    color: #333;
}

.content {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-around;
}

.content .checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
}

.content input {
    accent-color: #333;
    width: 12px;
    height: 12px;
}

.content label {
    font-size: 14px;
    user-select: none;
    padding-left: 5px;
}

button {
    position: relative;
    border-radius: 20px;
    border: 1px solid #333;
    background-color: #333;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    margin: 10px;
    padding: 12px 80px;
    letter-spacing: 1px;
    text-transform: capitalize;
    transition: 0.3s ease-in-out;
}

button:hover {
    letter-spacing: 3px;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background-color: rgba(225, 225, 225, 0.2);
    border: 2px solid #fff;
    color: #fff;
}

button.ghost i {
    position: absolute;
    opacity: 0;
    transition: 0.3s ease-in-out;
}

button.ghost i.register {
    right: 70px;
}

button.ghost i.login {
    left: 70px;
}

button.ghost:hover i.register {
    right: 40px;
    opacity: 1;
}

button.ghost:hover i.login {
    left: 40px;
    opacity: 1;
}

form {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

input {
    background-color: #eee;
    border-radius: 10px;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

.container {
    margin-top: 20px;
    background-color: #fff;
    border-radius: 25px;
    border: 1px solid #333;
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 500px;

}


.wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    border: none;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.login-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.right-panel-active .login-container {
    transform: translateX(100%);
}

.register-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.right-panel-active .register-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s linear;
}

@keyframes show {

    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 10;
}

.container.right-panel-active .overlay-container {
    transform: translate(-100%);
}

.overlay {
    background-image: url('../assets/images/hoa_cat.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(to top,
            rgba(46, 94, 109, 0.4) 40%,
            rgba(46, 94, 109, 0));
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
    transition: 0.3s ease-in-out;
}

.social-container a:hover {
    border: 1px solid #333;
}
</style>