<template>
  <section class="section shop" id="shop">
    <div class="section__title">
      <h1>shop</h1>
    </div>
    <div class="container">
      <div v-for="(item, index) in this.danhmuc" :key="index">
        <h1>{{ item.nameDM }}</h1>
        <div class="card-container">
          <div type="button" data-toggle="modal" data-target="#exampleModalCenter" class="col-lg-4 ml-1 col-md-6"
            v-for="product in filteredProducts" :key="product.id">
            <div @click="copyID(product._id)" class="card d-flex flex-column align-items-center">
              <div class="discount-tt">EXTRA SALE</div>
              <div class="discount-pt">-{{ product.discount }}%</div>
              <div class="card-img"> <img class="img-product" :src="product.image.url" alt=""> </div>
              <div class="product-name">{{ product.gen }}</div>
              <div class="product-name">{{ product.name }}</div>
              <div class="card-body pt-5">
                <div class="d-flex align-items-center price">
                  <div class="del mr-2"><span class="text-dark">{{ (product.priceR).toLocaleString('en-US', {
        style:
          'currency', currency: 'VND'
      }) }}</span></div>
                  <div class="font-weight-bold">{{ (product.price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'VND'
                    }) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>
<script>
import axios from 'axios';
import Header from '../components/Header.main.vue';
import fotter from '../components/footer.vue';
export default {
  components: {
    fotter,
    Header
  },
  data() {
    return {
      money: 0,
      thuonghieu: [],
      danhmuc: [],
      selectedBrands: [],
      cart: {
        idProduct_item: [
          {
            quantity: 1,
            id_item: '',
          }
        ]
      },
      search: [],
      search2: [],
      product: [],
      id: '',
      gen: '',
      element: {
        image: {
          url: ''
        }
      },
      discount: '',

    }
  },

  created() {
    // console.log(this.totalPages);
    this.IDcart = JSON.parse(localStorage.getItem('cart'));
    axios.get(`http://localhost:3000/api/picture/stored`)
      .then(res => {
        // if (this.selectedBrands.length === 0) {
        // Nếu không có tên `nameTH` nào được chọn, hiển thị tất cả sản phẩm
        this.product = res.data;
        // } else {
        // Nếu có tên `nameTH` được chọn, lọc danh sách sản phẩm theo tên `nameTH`
        // this.product = res.data.filter(item => this.selectedBrands.includes(item.nameTH));
        // }
      })
      .catch(err => {
        console.log(err);
      });
    axios.get(`http://localhost:3000/api/thuonghieu/stored`)
      .then(res => {
        this.thuonghieu = res.data
      })
      .catch(err => {
        console.log(err);
      })
    axios.get(`http://localhost:3000/api/danhmuc/stored`)
      .then(res => {
        this.danhmuc = res.data
      })
      .catch(err => {
        console.log(err);
      })
  },

  methods: {
    copyID(id) {
      this.id = id
      axios.get(`http://localhost:3000/api/picture/product/${this.id}`)
        .then(res => {
          this.element = res.data
        })
        .catch(err => {
          console.log(err);
        })
    },

    addCart(id) {
      this.cart.idProduct_item[0].id_item = this.id
      const dataItem = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('Token')}`, // Đính kèm Token vào tiêu đề
        },
        product: this.cart,
      }
      console.log(dataItem);
      axios.post(`http://localhost:3000/api/cart/add/${id}`, dataItem)
        .then(() => {
          alert('Thêm vào giỏ hàng thành công')
        })
        .catch(err => {
          console.log(err);
        })
    },

    TTien(a, b) {
      if (a != undefined && b != undefined)
        return a * b
    },

    checklogin() {
      if (this.IDcart == undefined) {
        alert('Bạn cần đăng nhập khi thêm vào giỏ hàng')
        this.$router.replace({ path: '/login' });
      }
      return;
    }
  },

  mounted() {
    document.addEventListener("DOMContentLoaded", function () {
      $('#filterbar').collapse(true);
      $('#inner-box').collapse(true);
      $('#inner-box2').collapse(true);
    });
  },

  computed: {
    filteredProducts() {
      return this.product.filter((product) => {
        const searchLower = this.search.toString().toLowerCase();
        const searchLower2 = this.search2.toString().toLowerCase();
        return (
          product.address && product.address.toLowerCase().includes(searchLower) &&
          (product.gen && product.gen.some(category => category.toLowerCase().includes(searchLower2)))

        )
      });
    }
  },
}
</script>

<style>
.shop {
  padding: calc(3rem * 1.3) 0;
  min-height: 100vh;
}

.shop__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
}

.shop__categories {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.shop__category {
  text-transform: capitalize;
  padding: calc(1rem / 2) 1rem;
}

.shop__category.selected {
  background-color: #000000;
  color: #ffffff !important;
}

.shop__products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.shop__product {
  width: 100%;
  max-width: 268px;
}

.shop__product.hide {
  display: none;
}

/* ================================================= */
.nut {
  position: relative;
  float: left;
  margin-right: 10px;
  bottom: 5px;
  width: 25px;
  height: 25px;
  margin: 5px 5px 5px 5px;

}

.my-1 {
  position: relative;
  margin-left: 5px;

}

.my-2 {
  position: relative;
  margin-left: 5px;

}

/* CSS cho phân trang begin*/
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  border: 1px solid #333;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #fff;
}

.pagination button.active {
  background-color: #16c79a;
  color: #fff;
}

/* CSS cho phân trang end*/
.discount-pt {
  position: relative;
  border: 1px solid rgb(255, 255, 255);
  width: 40px;
  text-align: center;
  background-color: rgb(212, 48, 48);
  color: rgb(255, 255, 255);
  margin-left: 190px;
  bottom: 25px;
}

.discount-tt {
  position: relative;
  border: 1px solid rgb(255, 255, 255);
  width: 100px;
  text-align: center;
  background-color: rgb(212, 48, 48);
  color: rgb(255, 255, 255);
  margin-left: -130px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  /* Adjust as needed */
}

.col-lg-4 {
  flex: 0 0 calc(33.33% - 20px);
  /* 3 cards per row, adjust the width and margins as needed */
  margin: 0 10px;
  /* Adjust as needed */
}

body {
  background-color: #f4f4f4
}

.home {
  width: 1400px;
  position: relative;
  height: auto;
  margin-top: 10px;
  min-height: 830px;
  margin-left: auto;
  margin-right: auto;

}

.bt-gia {
  display: none;
}

.number_TT {
  border: none;
}

.modal {
  left: none;
}

.container {
  margin: 40px auto
}

#header {
  width: 100%;
  height: 150px;
  box-shadow: 5px 5px 15px #e8e8e8
}

.col-lg-4,
.col-md-6 {
  padding-right: 0
}

button.btn.btn-hide {
  height: inherit;
  background-color: #ff935d;
  color: #fff;
  font-size: 0.82rem;
  padding-left: 40px;
  padding-right: 40px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px
}

.btn:focus {
  box-shadow: none
}

.box-label .btn {
  background-color: #fff;
  padding: 0;
  font-size: 0.8rem
}

.btn-red {
  background-color: #e00000ce
}

.btn-orange {
  background-color: #ffa500
}

.btn-pink {
  background-color: #e0009dce
}

.btn-green {
  background-color: #00811c
}

.btn-blue {
  background-color: #026bc2
}

.btn-brown {
  background-color: #994a00
}

.navbar {
  display: inline-flex
}

.pagination .page-item .page-link {
  color: #333;
  border: none;
  width: 40px;
  text-align: center
}

.pagination .page-item.active .page-link {
  background-color: #fff;
  border: 1px solid #333
}

select {
  outline: none;
  padding: 6px 12px;
  margin: 0px 4px;
  color: #999;
  font-size: 0.85rem;
  width: 140px
}

#select2 {
  border: 1px solid #777;
  color: #999
}

#pro {
  border: none;
  color: #333;
  font-weight: 700;
  padding-left: 0px;
  width: initial
}

#filterbar1 {
  margin-right: 5px;
  width: 30%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
  float: left
}

#filterbar1 input[type="radio"] {
  visibility: hidden
}

#filterbar1 input[type='radio']:checked {
  background-color: #16c79a;
  border: none
}

#filterbar1 .btn.btn-success {
  background-color: #ddd;
  color: #333;
  border: none;
  width: 115px
}

#filterbar1 .btn.btn-success:hover {
  background-color: #aff1e1;
  color: #444
}

#filterbar1 .btn-success:not(:disabled):not(.disabled).active,
#filterbar1 .btn-success:not(:disabled):not(.disabled):active {
  background-color: #16c79a;
  color: #fff
}

label {
  cursor: pointer
}

.tick {
  display: block;
  position: relative;
  padding-left: 23px;
  cursor: pointer;
  font-size: 0.9rem;
  margin: 0
}

.tick input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0
}

.check {
  position: absolute;
  top: 1px;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px
}

.tick:hover input~.check {
  background-color: #f3f3f3
}

.tick input:checked~.check {
  background-color: #ffffff
}

.check:after {
  content: "";
  position: absolute;
  display: none
}

.tick input:checked~.check:after {
  display: block;
  transform: rotate(45deg) scale(1)
}

.tick .check:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid rgb(0, 0, 0);
  border-width: 0 3px 3px 0;
  transform: rotate(45deg) scale(2)
}

.box {
  padding: 10px
}

.box-label {
  color: #11698e;
  font-size: 0.9rem;
  font-weight: 800
}

#inner-box,
#inner-box2 {
  height: 150px;
  overflow-y: scroll
}

#inner-box2 {
  height: 132px
}

#inner-box::-webkit-scrollbar,
#inner-box2::-webkit-scrollbar {
  width: 6px
}

#inner-box::-webkit-scrollbar-track,
#inner-box2::-webkit-scrollbar-track {
  background-color: #ddd;
  border-radius: 2px
}

#inner-box::-webkit-scrollbar-thumb,
#inner-box2::-webkit-scrollbar-thumb {
  background-color: #333;
  border-radius: 2px
}

#price {
  height: 45px
}

#size input[type="checkbox"] {
  visibility: hidden
}

#size input[type='checkbox']:checked {
  background-color: #16c79a;
  border: none
}

#size .btn.btn-success {
  background-color: #ddd;
  color: #333;
  border: none;
  width: 40px;
  font-size: 0.8rem;
  border-radius: 0
}

#size .btn.btn-success:hover {
  background-color: #aff1e1;
  color: #444
}

#size .btn-success:not(:disabled):not(.disabled).active,
#size .btn-success:not(:disabled):not(.disabled):active {
  background-color: #16c79a;
  color: #fff
}

#size label {
  margin: 10px;
  margin-left: 0px
}

.card {
  position: relative;
  padding: 5px;
  cursor: pointer;
  transition: .3s all ease-in-out;
  height: 350px;
  margin-bottom: 20px;
  background-color: rgb(250, 250, 250);
}

.card:hover {
  box-shadow: 2px 2px 15px #fd9a6ce5;
  transform: scale(1.02)
}

.card .product-name {
  position: relative;
  font-weight: 700;
  font-size: 13px;
  top: 20px;
}

.card-body {
  position: relative;
  padding-bottom: 0;
  top: 0px;
}

.card .text-muted {
  font-size: 0.82rem
}

.card-img img {
  padding-top: px;
  width: inherit;
  height: 180px;
  object-fit: contain;
  display: block
}

.card-body .btn-group .btn {
  padding: 0;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 50%;
  position: relative
}

.card-body .btn-group>.btn-group:not(:last-child)>.btn,
.card-body .btn-group>.btn:not(:last-child):not(.dropdown-toggle) {
  border-radius: 50%;
  transition: ease-in all .4s
}

.card-body input[type="radio"] {
  visibility: hidden
}

.card-body .btn:not(:disabled):not(.disabled).active::after,
.card-body .btn:not(:disabled):not(.disabled):active::after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 4px;
  left: 4.2px;
  background-color: #fff;
  position: absolute;
  transition: ease-in all .4s
}

.card-body .btn.btn-light:not(:disabled):not(.disabled).active::after,
.card-body .btn.btn-light:not(:disabled):not(.disabled):active::after {
  background-color: #000
}

#avail-size input[type="checkbox"] {
  visibility: hidden
}

#avail-size input[type='checkbox']:checked {
  background-color: #16c79a;
  border: none
}

#avail-size .btn.btn-success {
  background-color: #ddd;
  color: #333;
  border: none;
  width: 20px;
  font-size: 0.7rem;
  border-radius: 0;
  padding: 0
}

#avail-size .btn.btn-success:hover {
  background-color: #aff1e1;
  color: #444
}

#avail-size .btn-success:not(:disabled):not(.disabled).active,
#avail-size .btn-success:not(:disabled):not(.disabled):active {
  background-color: #16c79a;
  color: #fff
}

#avail-size label {
  margin: 10px;
  margin-left: 0px
}

#shirt {
  height: 170px
}

.middle {
  position: relative;
  width: 100%;
  margin-top: 25px
}

.slider {
  position: relative;
  z-index: 1;
  height: 5px;
  margin: 0 15px
}

.slider>.track {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: #ddd
}

.slider>.range {
  position: absolute;
  z-index: 2;
  left: 25%;
  right: 25%;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: #36a31b
}

.slider>.thumb {
  position: absolute;
  top: 2px;
  z-index: 3;
  width: 20px;
  height: 20px;
  background-color: #36a31b;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(63, 204, 75, 0.705);
  transition: box-shadow .3s ease-in-out
}

.slider>.thumb::after {
  position: absolute;
  width: 8px;
  height: 8px;
  left: 28%;
  top: 30%;
  border-radius: 50%;
  content: '';
  background-color: #fff
}

.slider>.thumb.left {
  left: 25%;
  transform: translate(-15px, -10px)
}

.slider>.thumb.right {
  right: 25%;
  transform: translate(15px, -10px)
}

.slider>.thumb.hover {
  box-shadow: 0 0 0 10px rgba(125, 230, 134, 0.507)
}

.slider>.thumb.active {
  box-shadow: 0 0 0 10px rgba(63, 204, 75, 0.623)
}

input[type=range] {
  position: absolute;
  pointer-events: none;
  /* -webkit-appearance: none; */
  z-index: 2;
  height: 10px;
  width: 100%;
  opacity: 0
}

input[type=range]::-webkit-slider-thumb {
  pointer-events: all;
  width: 30px;
  height: 30px;
  border-radius: 0;
  border: 0 none;
  background-color: red;
  -webkit-appearance: none
}

.del {
  text-decoration: line-through;
  color: red
}

@media(min-width:1199.6px) {
  #filterbar1 {
    width: 25%
  }
}

@media(max-width:1199.5px) {
  #filterbar1 {
    width: 28%
  }

  .card {
    height: 350px
  }

  .price {
    font-size: 0.9rem
  }

  .product-name {
    font-size: 0.8rem
  }
}

@media(max-width: 991.5px) {
  .navbar-nav {
    min-width: 290px;
    position: absolute;
    left: -168px;
    bottom: -146px;
    padding: 20px 10px;
    display: block;
    background-image: none;
    z-index: 2;
    background-color: #1d1c1cb2
  }

  #filterbar1 {
    width: 36%
  }

  #sort {
    background-color: inherit;
    color: #fff;
    margin: 0;
    margin-bottom: 20px;
    width: 100%
  }

  #sort option,
  #pro option {
    color: #000
  }

  #pro,
  #select2,
  .result {
    background-color: inherit;
    color: #fff
  }

  .card {
    height: 345px
  }

  .price {
    font-size: 0.85rem
  }
}

@media(max-width: 767.5px) {
  #filterbar1 {
    width: 50%
  }
}

@media(max-width: 525.5px) {
  #filterbar1 {
    float: none;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 5px
  }

  #content.my-5 {
    margin-top: 20px !important;
    margin-bottom: 20px !important
  }

  .col-lg-4,
  .col-md-6 {
    padding-left: 0
  }
}

@media(max-width: 500.5px) {
  .pagination {
    display: none
  }
}
</style>