<template>
    <div id="start">
         <div class="start_content">


        <header class="start_header">

            <img src="../assets/images/food.png" /> 修改用餐人数
        </header>


        <p class="notice">请选择正确的用餐人数 ，小二马上给你送餐具</p>


        <div class="content">
            <ul class="user_list">
                <li v-for="(item,index) in userList" :class="{'active':parseInt(peopleList.p_num)==index+1}">
                    <span>{{item}}</span>
                </li>

            </ul>
        </div>
        <div class="mark_input">
            <input type="text" v-model="p_mark" placeholder="请输入您的口味要求，忌口等（可不填）">
        </div>

        <ul class="mark_list">
            <li>						
                    <span>打包带走</span>
                        </li>
                        <li>
                            <span>
                               不要放辣椒
                            </span>
                        </li>
                        <li>
                            <span>
                               微辣
                            </span>
                        </li>
        </ul>

    </div>

    <router-link to="/home">
    <div id="start" class="start" @click="addpeopleInfo()">      
        <span>
            开始点菜
        </span>
    </div>
    </router-link>
    </div>
</template>

<script>
import axios from "axios";
import config from "../model/config";

export default {
  data() {
    return {
      api: config.api,
      p_num: "1人",
      p_mark: "",
      peopleList: [],
      userList: []
    };
  },
  methods: {
    addChangeEvent() {
      var that = this; /*保存this*/
      var lis = document.querySelectorAll(".user_list li");
      console.log(lis);
      for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function() {
          for (let j = 0; j < lis.length; j++) {
            lis[j].className = "";
          }
          this.className = "active"; // this是li dom节点
          that.p_num = this.querySelector("span").innerHTML.trim(); //trim()表示去除空格
          console.log(that.p_num);
        };
      }

      //口味的dom操作
      var markLis = document.querySelectorAll(".mark_list li");

      for (let i = 0; i < markLis.length; i++) {
        markLis[i].onclick = function() {
          for (let j = 0; j < markLis.length; j++) {
            markLis[j].className = "";
          }
          this.className = "active"; //this 就是li这个dom节点

          that.p_mark =
            that.p_mark + " " + this.querySelector("span").innerHTML.trim();
        };
      }
    },
    addpeopleInfo() {
      var api = this.api + "api/addPeopleInfo";

      axios
        .post(api, { uid: "a002", p_num: this.p_num, p_mark: this.p_mark })
        .then(repsonse => {
          if (response.data.success) {
            this.$router.push({ path: "cart" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPeopleInfoList() {
      var api = this.api + "api/peopleInfoList?uid=a002";

      axios.get(api).then(
        response => {
          console.log(response);
          this.peopleList = response.data.result[0];

          this.p_mark = this.peopleList.p_mark;
        },
        response => {
          // error callback
        }
      );
    }
  },
  mounted() {
    for (let i = 0; i < 12; i++) {
      this.userList.push(i + 1 + "人");
    }
    console.log(this.userList)
    //nextTick数据渲染完成操作dom
    this.$nextTick(function() {
      this.addChangeEvent();
    });

    this.getPeopleInfoList();
  }
};
</script>

<style lang="scss">
@charset "utf-8";
.start_content {
  .start_header {
    height: 3.2rem;
    line-height: 3.2rem;
    background: #000;
    color: #fff;
    width: 10rem;
    margin: 5rem auto 0rem auto;
    border-radius: 0.5rem;
    img {
      height: 2.2rem;
      line-height: 2.2rem;
      position: relative;
      top: 0.5rem;
      margin-left: 1rem;
    }
  }

  .notice {
    color: red;
    text-align: center;
    margin: 1rem 0rem;
  }
  .mark_input {
    padding: 1rem;
    input {
      height: 3rem;
      line-height: 3rem;
      width: 80%;
      border: 1px solid #eee;
    }
  }
  .user_list,
  .mark_list {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    li {
      width: 25%;
      padding: 0.5rem;
      box-sizing: border-box; /* 盒子的宽度 = 盒子本身宽度 默认盒子的宽度=盒子的宽度+paddig+margin*/
      span {
        display: block;
        width: 100%;
        height: 3.2rem;
        line-height: 3.2rem;
        text-align: center;
        background: #fff;
        border-radius: 0.5rem;
        border: 1px solid #000;
      }
    }
    li.active {
      span {
        background: red;
        border: 1px solid red;

        color: #fff;
      }
    }
  }
}
.start {
  position: fixed;
  bottom: 5rem;
  left: 50%;
  margin-left: -3rem;
  width: 6rem;
  height: 6rem;
  background: red;
  color: #fff;
  border-radius: 50%;
  span {
    display: block;
    width: 2rem;
    margin: 0 auto;
    position: relative;
    top: 1.5rem;
  }
}
</style>
