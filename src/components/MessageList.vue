<template>
  <div class="container">
    <div class="iconWrap">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
    </div>

    <div class="header">
      <div class="textBox">我的消息</div>
    </div>

    <div class="recordContainer" v-for="item in toUserList" :key="item.id">
      <div class="records">
        <!-- <div class="recordsHeader">
          <div class="textBox">交易记录</div>
        </div> -->
        <div class="record" @click="$router.push('/message/' + item.id)">
          <div class="imgBox">
            <img class="productPic" :src="`http://localhost:8080/common/download?name=` + item.userPtUrl" alt="pic" />
          </div>
          <div class="infoBox">
            <div class="productName">{{item.userName}}</div>
          </div>
          <div class="priceBox">new!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: "Message",
    data(){
      return {
        toUserList: [],
        toUserNum: 0,
      }
    },
    methods: {
      initUserList(){
        
      }
    },
    computed: {
      ...mapState(['user', 'sseMessage']),
      
    }
    ,
    created(){
      this.$http({
        method: "get",
        url: "/sse/" + this.user.id + "/target",
      }).then(
        res => {
          this.initUserList()
        }
      )
    },
    updated(){
      // if (this.toUserNum === 0){
      //   this.toUserNum = 1;
      //   for (let i = 0; i < this.sseMessage.length; i++){

      //       this.$http({
      //         method: "get",
      //         url: "/user/info/" + this.sseMessage[i],
      //       }).then(
      //         res => {
      //           console.log("/user/ssemessage", res.data)
      //           this.toUserList.push(res.data.data)
      //         }
      //       )
      //     }
      // }
    },
    mounted(){
      for (let i = 0; i < this.sseMessage.length; i++){
            this.$http({
              method: "get",
              url: "/user/info/" + this.sseMessage[i],
            }).then(
              res => {
                console.log(res.data)
                this.toUserList.push(res.data.data)
              }
            )
          }
    }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(111, 111, 111);
}
.container {
  /* display: flex; */
  width: 100%;
  height: 100%;
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
  font-size: 35px;
  /* font-weight: medium; */
  color: rgb(37, 37, 37);
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
}
.textBox {
  margin-left: 30px;
}
.productPic {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  /* box-shadow:whitesmoke 10px; */
}
.record {
  /* margin-top: 30px; */
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
  /* border: 1px saddlebrown solid; */
}
.infoBox {
  left: -15%;
  /* border: 1px saddlebrown solid; */
  display: flex;
  align-items: center;
}
.priceBox {
  font-size: 50px;
  left: -3%;
  color: rgb(64, 170, 157);
}

</style>