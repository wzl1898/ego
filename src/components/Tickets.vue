<template>
  <div class="container">
    <div class="iconWrap">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
    </div>

    <div class="header">
      <div class="textBox">交易记录</div>
    </div>

    <div class="recordContainer">
      <div class="records">
        <div class="recordsHeader">
          <div class="textBox">交易记录</div>
        </div>
        <div
          class="record"
          v-for="(item) in this.ticketls"
          :key="item.id"
        >
          <div class="imgBox">
            <img class="productPic" :src=" `http://localhost:8080/common/download?name=` + item.goodPtUrl" alt="no pic" />
          </div>
          <div class="infoBox">
            <div class="productName">{{item.goodName}}</div>
            <div class="productInfo">{{item.goodInfo}}</div>
          </div>
          <div class="priceBox">￥{{item.goodPrice}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Tickets",
  data() {
    return {
      ticketls: [],
    };
  },
  computed: {
    ...mapState(['user']),
  },
  mounted() {
    if (!this.$route.params.tickets) {
      console.log("no params")
      this.$http({
        method: "get",
        url: `/user/${this.user.id}`,
      }).then(
        (res) => {
          console.log("buyers" , res.data.data.buyers);
          this.ticketls = res.data.data.buyers;
          console.log("ticketls:", this.ticketls)
        },
        (err) => {
          console.log(err.message);
        }
      );
    }else{
      this.ticketls = this.$route.params.tickets
      console.log("ticketls:", this.ticketls)
    }
    
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(111, 111, 111);
}
.container {
  /* display: flex; */
  width: 100%;
  /* height: 100%; */
  /* height: 100%; */
  background: url("../assets/productDetailBg.png") repeat-y !important;
  background-size: 100% 100%;
}
.header {
  /* border: 1px salmon solid; */
  height: 10%;
  text-align: center;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin-bottom: 30px;
}
.textBox {
  /* border: 1px salmon solid; */
  align-self: center;
  font-size: 30px;
  /* font-weight: 500; */
}
.iconWrap {
  height: 100px;
  width: 100px;
  /* border: 1px saddlebrown solid; */
  /* margin-left: 3%; */
  position: absolute;
  top: 0%;
  left: 3%;
  font-size: 50px;
  color: rgb(111, 111, 111);
  text-align: center;
  line-height: 100px;
}
.avatarBox {
  margin-top: -1%;
  display: flex;
  /* justify-content: center; */
  /* border: rgb(73, 79, 61) 2px solid; */
}

.records {
  width: 70%;
  /* border: 1px salmon solid; */
  padding: 1%;
  font-size: 30px;
  /* font-weight: medium; */
  color: rgb(87, 87, 87);
  background: rgb(240, 240, 240);
  border-radius: 30px;
}
.recordsHeader {
  display: flex;
  justify-content: space-between;
}
.username {
  margin-left: 50px;
  margin-bottom: 20px;
}
.address {
  margin-left: 20px;
}
.recordContainer {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  /* border: 1px salmon solid; */
}
.textBox {
  margin-left: 30px;
}
.productPic {
  height: 150px;
  width: 150px;
  border-radius: 20px;
  /* box-shadow:whitesmoke 10px; */
}
.record {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.imgBox,
.infoBox,
.priceBox {
  position: relative;
}
.imgBox {
  left: 5%;
}
.infoBox {
  width: 200px;
  left: -20%;
}
.priceBox {
  font-size: 50px;
  left: -3%;
  color: rgb(64, 170, 157);
}
</style>