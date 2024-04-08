<template>
    <header class="header">
        <nav class="header__container container">
            <div class="header__logo">
                <router-link :to="{ name: 'shop' }">
                    <h1>Huang</h1>
                </router-link>
            </div>
            <ul class="header__links">
                <li class="header__link">
                    <router-link :to="{ name: 'home' }">home</router-link>
                </li>
                <li class="header__link">
                    <router-link :to="{ name: 'home' }">new</router-link>
                </li>
                <li class="header__link">
                    <router-link :to="{ name: 'shop' }">shop</router-link>
                </li>
                <li class="header__link">
                    <router-link :to="{ name: 'trending' }">trending</router-link>
                </li>
                <li class="header__link">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item mr-4" v-if="!checkAuth">
                            <div class="login-cls" @click="logIn()">Đăng nhập</div>
                        </li>
                        <li class="nav-item mr-4" v-else>
                            <div class="dropdown">
                                <div type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    Xin chào, {{ user.fullName }}
                                </div>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" @click="logOut()">Đăng Xuất</a>
                                    <a class="dropdown-item">
                                        <router-link class="info-link" to="/info">Thông Tin Của Tôi</router-link>
                                    </a>
                                </div>
                            </div>
                        </li>
                        <!-- <li class="nav-item cart-item" v-if="checkAuth">
                            <router-link class="cart_header" to="/cart">
                                <span class="cart_icon">
                                    <i class="fas fa-shopping-cart mr-1 bx bx-cart cartNum"><span>{{
                    cart?.idProduct_item?.length ?? 0
                }}</span></i>
                                </span>
                            </router-link>
                        </li> -->
                    </ul>
                </li>
                <li class="header__link">
                    <router-link :to="{ name: 'home' }"><span class="cart_icon">
                            <i class="fas fa-shopping-cart mr-1 bx bx-cart cartNum"><span>{{
                    cart?.idProduct_item?.length ?? 0
                                    }}</span></i>
                        </span></router-link>
                </li>
            </ul>
            <div class="header__btn">
                <span style="--i: 0"></span>
                <span style="--i: 10"></span>
                <span style="--i: 20"></span>
            </div>
        </nav>
    </header>
</template>
<script>
import axios from "axios";
export default {
    inject: ["checkAuth"],
    data() {
        return {
            user: {},
            idcart: "",
            check: localStorage.getItem("Token"),
            cart: [],
        };
    },
    watch: {
        checkAuth(value) {
            console.log('auth')
            if (value) {
                this.showData();
                this.getCart()
            }
        },
    },
    methods: {
        async showData() {
            const token = JSON.parse(localStorage.getItem("Token"));
            if (token != undefined) {
                axios
                    .get(`http://localhost:3000/api/user/show`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("Token")}`, // Đính kèm Token vào tiêu đề
                        },
                    })
                    .then((res) => {
                        this.user = res.data;
                        this.check = true;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        async getCart() {
            this.idcart = JSON.parse(localStorage.getItem("cart"));
            if (this.idcart != undefined) {
                axios
                    .get(`http://localhost:3000/api/cart/show/${this.idcart}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("Token")}`, // Đính kèm Token vào tiêu đề
                        },
                    })
                    .then((res) => {
                        this.cart = res.data;
                        this.check = true;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        async logOut() {
            localStorage.clear();
            this.checkAuth = false;
            this.$router.replace({ path: "/login" });
        },

        async logIn() {
            this.$router.push('/login')
        }
    },
};
</script>
<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    /* scroll-behavior: smooth; */
    font-family: "lora", sans-serif;
}

.header {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    height: 70px;
    background-color: transparent;
    transition: background 300ms ease;
    z-index: 1000;
}

.header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
}

.header__logo h1 {
    color: #353535;
    font-size: 2rem;
}

.header__links {
    list-style: none;
    display: flex;
}

.header__link {
    position: relative;
    padding: 1rem;
    font-size: calc 1rem * 1.1;
    color: #353535;
    text-transform: uppercase;
}

.header__link a {
    color: #353535;
    position: relative;
}

.header__link a::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #353535;
    opacity: 0;
    transition: all var(--default-duration) ease;
}

.header__link a:hover::after,
.header__link a.active::after {
    bottom: -5px;
    opacity: 1;
}

.header__btn {
    display: none;
    flex-direction: column;
    position: relative;
    width: 30px;
    height: 20px;
    cursor: pointer;
}

.header__btn span {
    position: absolute;
    top: calc(var(--i) * 1px);
    width: 100%;
    height: 1px;
    background-color: var(--black-100);
    transition: all 300ms ease;
}

.menu-toggled .header__btn span:nth-child(1) {
    transform: rotate(-45deg);
    top: 10px;
}

.menu-toggled .header__btn span:nth-child(2) {
    opacity: 0;
}

.menu-toggled .header__btn span:nth-child(3) {
    transform: rotate(45deg);
    top: 10px;
}

@media screen and (max-width: 768px) {
    .header__btn {
        display: flex;
    }

    .header__links {
        position: fixed;
        flex-direction: column;
        align-items: center;
        row-gap: 1.5rem;
        top: 70px;
        left: -200%;
        bottom: 0;
        min-width: 240px;
        width: 100%;
        max-width: 300px;
        background-color: #ffffffd4;
        border: 1px solid #f5f5f5;
        transition: left 300ms ease;
    }

    .menu-toggled .header__links {
        left: 0;
    }
}
</style>