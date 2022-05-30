<template>
  <div class="container">
    <div class="iconWrap">
      <i class="el-icon-arrow-left" @click="$router.push('/ProductList')"></i>
    </div>

    <div class="header">
      <div class="textBox">个人主页</div>
    </div>

    <div class="avatarBox">
      <div class="user_avatar">
        <img class="avatar" :src="`http://localhost:8080/common/download?name=` + user.userPtUrl" alt="" />
      </div>
      <div class="dashline"></div>
    </div>

    <div class="userInfoContainer">
      <div class="userInfo">
        <div class="username">用户名:&nbsp;&nbsp;{{userName}}</div>
        <div class="address">默认地址:&nbsp;&nbsp;{{userAd}}</div>
      </div>
    </div>

    <div class="buttonContainer">
      <div class="buttons">
        <button class="onSaleBtn" @click="$router.push(`/onSale`)">上架商品</button>
        <button class="changeInfoBtn" @click="$router.push(`/updateProfile`)">更改信息</button>
      </div>
    </div>

    <div class="recordContainer">
      <div class="records">
        <div class="recordsHeader">
          <div class="textBox">交易记录</div>
          <a class="textBox" style="margin-right: 20px" @click="goTickets"
            >更多</a
          >
        </div>
        <div class="record" v-for="item in this.ticketList.slice(0,2)" :key="item.id">
          <div class="imgBox">
            <img class="productPic" :src=" `http://localhost:8080/common/download?name=` + item.goodPtUrl" alt="no pic" />
          </div>
          <div class="infoBox">
            <div class="productName">{{item.goodName}}</div>
            <div class="productInfo">{{item.goodInfo}}</div>
          </div>
          <div class="priceBox">￥{{item.goodPrice}}</div>
          <div class="isBuy" v-text="item.isBuy === true ? '买': '卖'"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Personal",
  data(){
    return{
      ticketList: [],
    }
  },
  computed:{
    ...mapState(['user']),
    userAd(){
      // console.log(this.user.userAd === null)
      return this.user.userAd === null ? "你还没有地址快去设置吧" : this.user.userAd;
    },
    userName(){
      return this.user.userNickName === null ? this.user.userName : this.user.userNickName;
    },
    isBuy(flag){
      return flag === true ? "买": "卖"
    }
  },
  methods: {
    goTickets(){
      this.$router.push({
        name: 'Tickets',
        params: {
          tickets: this.ticketList
        }
      })
    }
  }
  ,
  mounted(){
    this.$http({
      method: "get",
      url: `/user/${this.user.id}`,
    }).then(
      (res) => {
        console.log( "data from /user/${this.user.id}", res.data);
        let ticketList = res.data.data.buyers;
        console.log("this.ticketList:", this.ticketList)
        for (let i = 0; i < ticketList.length; i++){
          this.$http({
            method: "get",
            url: `/good/${ticketList[i].goodId}`,
          }).then(
            (res) => {
              console.log("res:" , res);
              let data = res.data.data;
              data.isBuy = true;
              this.ticketList.push(data);
            }
          )
        }
        ticketList = res.data.data.sellers;
        for (let i = 0; i < ticketList.length; i++){
          this.$http({
            method: "get",
            url: `/good/${ticketList[i].goodId}`,
          }).then(
            (res) => {
              console.log("res:" , res);
              let data = res.data.data;
              data.isBuy = false;
              this.ticketList.push(data);
            }
          )
        }

        console.log("this.ticketList (after):", this.ticketList)
      },
      (err) => {
        console.log(err.message);
      }
    )
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(111, 111, 111);
}
a:hover{
  cursor: pointer;
}
.container {
  /* display: flex; */
  width: 100%;
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
.dashline {
  height: 1px;
  width: 80%;
  background: rgb(81, 81, 81);
  align-self: center;
}
.user_avatar {
  /* border: yellowgreen 2px solid; */
  position: relative;
  left: 45.5%;
  /* width: 20%; */
  display: flex;
  justify-content: center;
}
.avatar {
  position: relative;
  left: 8%;
  height: 125px;
  width: 125px;
  /* border: #333 1px solid; */
  border-radius: 50%;
  align-self: center;
}
.userInfoContainer, .buttonContainer {
  display: flex;
  justify-content: center;
  margin-top: -20px;
}
.buttonContainer{
  margin-top: 25px;
}
.userInfo,
.records,
.buttons {
  width: 70%;
  /* border: 1px salmon solid; */
  padding: 1%;
  font-size: 30px;
  /* font-weight: medium; */
  color: rgb(87, 87, 87);
  background: rgb(240, 240, 240);
  border-radius: 30px;
}
.buttons{
  display: flex;
}
.onSaleBtn, .changeInfoBtn{
  background: rgb(73, 197, 182);
  color: rgb(255, 255, 255);
  border: 0px;
  font-size: 15px;
  width: 100px;
  height: 50px;
  border-radius: 30px;
  transition: background-color 0.5s;
  outline: none;
  margin-right: 20px;
  margin-left: 20px;
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
  left: -20%;
  /* border: 1px saddlebrown solid; */
  width: 200px;

}
.priceBox {
  font-size: 50px;
  left: -3%;
  color: rgb(64, 170, 157);
}
.isBuy{
  position: absolute;
  right: 30%;
  color: rgb(64, 170, 157);
  font-size: 50px;
  /* top: 50%; */
}
</style>