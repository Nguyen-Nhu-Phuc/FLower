<template>
    <div>
        <div class="">
            <div class="container-fluid">
                <div class="d-flex justify-content-between">
                    <div class="">
                        <router-link to="/admin" class="item-admin"> Kho sản phẩm </router-link>

                    </div>
                    <div class="">
                        <router-link to="/admin/listTrademark" class="item-admin"> DS thương hiệu </router-link>
                    </div>
                    <div class="">
                        <router-link to="/admin/List_Category" class="item-admin"> DS danh mục </router-link>
                    </div>
                    <div class="">
                        <router-link to="/admin/list_user" class="item-admin"> Tài khoản </router-link>
                    </div>
                    <div class="">
                        <router-link to="/admin/order" class="item-admin"> Order </router-link>
                    </div>
                    <div class="">
                        <router-link to="/admin/revenue" class="item-admin"> Doanh thu </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    methods: {
        async logOut2() {
            localStorage.clear()
            this.$router.replace({ path: '/home' });
        }
    }
}
</script>

<style scoped>
.container {
    position: relative;
}

.item-admin {
    position: relative;
    margin-top: 20px;
    padding: 20px;
    width: 200px;
    background-color: rgb(76, 96, 106);
    border-radius: 5px;
    color: rgb(255, 255, 255);
    text-decoration: none;
}


.item-admin2 {
    font-size: 12px;
    height: 60px;
    width: 60px;
    background-color: rgb(42, 55, 61);
    border-radius: 5px;
    color: rgb(255, 255, 255);
    text-decoration: none;
}

.form-admin {
    display: flex;
    justify-content: center; /* căn giữa theo chiều ngang */
    align-items: center; /* căn giữa theo chiều dọc */
    width: 1260px;
    height: 100px;
    margin: 20px auto;
    background-color: #353535;
}


.item-admin:hover {
    color: rgb(0, 0, 0);
    background-color: rgb(255, 127, 81);
}

.item-admin2:hover {
    color: rgb(0, 0, 0);
    background-color: rgb(134, 193, 255);
}

.logoutad {
    position: relative;
    bottom: 43px;
    left: 1120px;
    width: 60px;


}

.col-sm {
    position: relative;
}

.row {
    position: relative;
}</style>