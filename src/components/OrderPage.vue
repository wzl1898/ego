<template>
  <div class="container">
    <div class="header">
      <div class="textBox">确认订单</div>
    </div>
    <div class="buyerInfo">
      <div class="avatarBox">
        <img src="../assets/LoginFormBg.jpg" alt="avatar" />
      </div>
      <div class="userInfo">
        <div class="userContainer">
          <div class="userName">{{user.userName}}</div>
          <div class="phone">{{user.id}}</div>
        </div>
        <div class="address">
            {{user.userAd}}
        </div>
      </div>
    </div>
    <div class="orderInfo">
        <div class="sellerInfo">
            <div class="avatarBox">
                <img src="../assets/LoginFormBg.jpg" alt="sellerAvatar">
            </div>
            <div class="sellerName">
                Ego卖家
            </div>
            <div class="sellerId">
                #{{this.$route.params.good.sellerId}}
            </div>
        </div>
        <div class="productInfo">
            <div class="productPic">
                <img :src="`http://localhost:8080/common/download?name=` + good.goodPtUrl" alt="pic">
            </div>
            <div class="productContainer">
                <div class="productName">
                    {{good.goodName}}
                </div>
                <div class="productIntroduction">
                    #{{good.goodInfo}}
                </div>
            </div>
            <div class="priceContainer">
                ￥{{good.goodPrice}}
            </div>
        </div>
        <div class="total">
            <div class="totalTextBox">
                合计 : 
            </div>
            <div class="totalPrice">
                ￥{{good.goodPrice}}
            </div>
        </div>
    </div>
    <el-button type="submitOrder" round @click="createTicket">提交订单</el-button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "OrderPage",
  data() {
    return {
      seller: {},
    };
  },
  computed: {
    ...mapState(["user"]),
    good(){
      return this.$route.params.good;
    }
  },
  methods: {
    createTicket(){
      this.$http({
        method: "post",
        url: "/trade",
        data: {
          goodId: this.good.id,
          sellerId: this.good.sellerId,
          buyerId: this.user.id,
        }
      }).then(
        (res) => {
          console.log(res.data);
          this.$router.push("/personal");
        },
        (err) => {
          console.log(err.message);
        }
      )
    }
  },
  mounted(){
    this.$http({
      method: "get",
      url: `/user/${this.$router.params.good.sellerId}`,
    }).then(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.log(err.message);
      }
    )
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 120%;
  width: 100%;
  align-items: center;
  background: rgb(210, 210, 210);
  /* border: 1px saddlebrown solid; */
}
.header {
  /* border: 1px salmon solid; */
  height: 10%;
  text-align: center;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.textBox {
  /* border: 1px salmon solid; */
  font-size: 30px;
}
.buyerInfo {
  display: flex;
  width: 70%;
  /* border: 1px salmon solid; */
  padding: 1%;
  font-size: 30px;
  color: rgb(49, 49, 49);
  background: rgb(226, 226, 226);
  border-radius: 30px;
}
.avatarBox {
  width: 120px;
  height: 120px;
  /* border: 1px saddlebrown solid; */
  padding-top: 10px;
}
.avatarBox img {
  /* border: 1px saddlebrown solid !important; */
  margin-top: -10%;
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 50%;
}
.userInfo{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 70%;
    /* border: 1px saddlebrown solid !important; */
    margin-left: 3%;
    align-self: center;
}
.userContainer{
    display: flex;
}
.userName{
    margin-right: 20px;
}
.orderInfo {
    margin-top: 30px;
  width: 70%;
  /* border: 1px salmon solid; */
  padding: 1%;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
  color: rgb(49, 49, 49);
  background: rgb(226, 226, 226);
}
.sellerInfo{
    display: flex;
    /* border: 1px saddlebrown solid; */
    width: 80%;
    align-items: center;
    color: rgb(92, 92, 92);
}
.sellerInfo .avatarBox{
    width: 60px;
    height: 60px;
    margin-right: 30px;
}
.productInfo{
    width: 90%;
    margin-top: 20px;
    display: flex;
}
.productPic{
    height: 200px;
    width: 200px;
    margin-right: 30px;
}
.productPic img{
    height: 100%;
    width: 100%;
    object-fit: fill;
    border-radius: 10%;
}
.productContainer{
    width: 60%;
}
.productName{
    margin-bottom: 10px;
}
.priceContainer{
    font-size: 60px;
}
.total{
    margin-top: 40px;
    display: flex;
    width: 90%;
    
}
.totalTextBox{
    font-size: 40px;
    width: calc(60% + 230px);
    /* border: 1px saddlebrown solid; */
}
.totalPrice{
    font-size: 60px;
    color: rgb(62, 168, 155);
}
.el-button--submitOrder{
    font-size: 30px !important;
  /* font-weight:100 !important; */
  font-family: sans-serif;
  color: #fff !important;
  background: rgb(73, 197, 182) !important;
  border: 0px !important;
  position: fixed;
  bottom: 5%;
  left: 42.5%;
  width: 15%;
  height: 8%;
  border-radius: 30px !important;
}
</style>