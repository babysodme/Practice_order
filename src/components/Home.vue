<template>
  <div id="home">
    <header class="index_header">
      <div class="hlist">
        <img src="../assets/images/rexiao.png" alt="">
        <p>热销榜</p>
      </div>
      <div class="hlist">
        <img src="../assets/images/caidan.png" alt="">
        <p>点过的菜</p>
      </div>
      <div class="hlist">
        <img src="../assets/images/sousuo.png" alt="">
        <p>搜你喜欢</p>
      </div>
    </header>

    <aside class="left_cate" id="left_cate">
      <ul>
        <li v-for="(item,index) in list" @click="changelist(index)">{{item.title}}</li>
      </ul>
      <div id="nav_cate" class="nav_cate">
        <img src="../assets/images/nav.png" alt="">
        <p>菜单</p>
      </div>
    </aside>

    <div class="content">
      <div class="item" v-for="item in list">
        <h3 class="item_cate">{{item.title}}</h3>
        <ul class="item_list">
          <li v-for="food in item.list">
            <div class="inner">
              <router-link :to="'/pcontent?id='+food._id">
                <img class="item_img" :src="api+food.img_url" />
                <p class="title">{{food.title}}</p>
                <p class="price">¥{{food.price}}</p>
              </router-link>
            </div>

          </li>
        </ul>
      </div>
    </div>
    <div class="bg" id="bg">

    </div>

    <v-navfooter></v-navfooter>
    <div id="footer_cart" class="footer_cart">
      <router-link to="/cart">
      <img src="../assets/images/cart.png" />
      <p>购物车</p>
      <span class="num" v-if="cartNum">{{cartNum}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavFooter from "./public/NavFooter";
import config from "../model/config";

export default {
  data() {
    return {
      list: [],
      api: config.api,
      cartNum: 0
    };
  },
  components: {
    "v-navfooter": NavFooter
  },
  methods: {
    asideDomInit() {
      var navCate = document.getElementById("nav_cate");
      var leftCate = document.getElementById("left_cate");
      var bg = document.getElementById("bg");
      var flag = true; //开关
      bg.onclick = navCate.onclick = function() {
        if (flag) {
          flag = false;
          leftCate.style.transform = "translate(0,0)";
          bg.style.display = "block";
        } else {
          flag = true;
          leftCate.style.transform = "translate(-100%,0)";
          bg.style.display = "none";
        }
      };
    },
    requestData() {
      var api = this.api + "api/productlist";
      axios
        .get(api)
        .then(response => {
          this.list = response.data.result;
          console.log(response.data.result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    changelist(index) {
      //itemCatesDom[key].offsetTop获取右侧分类距离顶部的高度
      //Element.scrollTop 属性可以获取或设置一个元素的内容垂直滚动的像素数。
      var itemCateDom = document.querySelectorAll(".item_cate");
      document.documentElement.scrollTop = itemCateDom[index].offsetTop;

      var leftCate = document.getElementById("left_cate");
      //背景
      var bg = document.getElementById("bg");
      leftCate.style.transform = "translate(-100%,0)";
      bg.style.display = "none";
    },
    //获取购物车数量
    getCartCount() {
      var api = this.api + "api/cartCount?uid=a001";
      axios
        .get(api)
        .then(response => {
          console.log(response.data.result)
          this.cartNum = response.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.asideDomInit();
    this.requestData();
    this.getCartCount()
  }
};
</script>

<style lang="scss">
.index_header {
  width: 96%;

  margin: 0 auto;

  height: 4.4rem;

  background: #fff;
  margin-top: 1rem;

  display: flex;
  border-radius: 0.5rem;

  .hlist {
    flex: 1;
    text-align: center;
    padding-top: 0.2rem;
    border-right: 1px solid #eee;

    img {
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
    }

    &:last-child {
      border-right: none;
    }
  }
}

/*列表*/
.item {
  .item_cate {
    text-align: center;

    padding: 0.5rem;
  }

  .item_list {
    display: flex;

    flex-wrap: wrap;

    padding: 0px 0.5rem;

    li {
      width: 33.3%;
      padding: 0.5rem;

      box-sizing: border-box;

      .inner {
        background: #fff;
        width: 100%;
        border-radius: 0.5rem;
        overflow: hidden;
        a {
          color: #666;
          text-decoration: none;
        }
        img {
          width: 100%;
          height: 6rem;
        }
        p {
          padding: 0.2rem 0.5rem;
        }

        .title {
          font-weight: bold;
        }
      }
    }
  }
}

/*侧边栏*/

.left_cate {
  /*css3运动  加过渡效果*/
  transition: all 0.5s;

  transform: translate(-100%, 0);

  z-index: 2;

  width: 6rem;

  height: 100%;

  position: fixed;

  background: #eee;
  top: 0px;
  left: 0px;

  ul {
    position: absolute;

    height: 100%;
    padding: 0.5rem;

    z-index: 3;

    background: #eee;
    li {
      line-height: 4.4rem;
    }
  }

  .nav_cate {
    position: absolute;

    right: -3.5rem;

    background: rgba(132, 128, 128, 0.9);
    top: 42%;

    width: 5rem;

    height: 4rem;
    text-align: center;

    border-radius: 0rem 50% 50% 0rem;

    z-index: 2;
    img {
      width: 1.8rem;

      height: 1.8rem;

      margin-left: 1rem;

      margin-top: 0.4rem;
    }
    p {
      color: #fff;
      margin-left: 1rem;

      margin-top: -0.3rem;
    }
  }
}

/*透明层*/

.bg {
  position: fixed;

  width: 100%;
  height: 100%;

  background: rgba(132, 128, 128, 0.4);

  left: 0px;

  top: 0px;
  z-index: 1;

  display: none;
}
</style>