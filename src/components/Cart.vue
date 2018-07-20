<template>
    <div id="cart">
        	<div class="cart_content">
			
			<div class="cart_info" v-if="totalNum">
				
				
				<h2>购物车</h2>				
				
				<div class="p_number">
					<div class="p_number_left">
	       				<p>用餐人数:{{peopleList.p_num}}</p>
	       				<p>备注:<span v-if="!peopleList.p_mark">无</span><span v-if="peopleList.p_mark">{{peopleList.p_mark}}</span></p>
	       			</div>	       			
	       			<div class="p_number_right">
                 <router-link to="/editpeopleinfo">
	       				<img src="../assets/images/edit.png"/>
	       				<p>修改</p>
                </router-link>
	       			</div>					
					
				</div>
				
				<div class="cart_p_num">
					
					<p>购物车中总共有{{totalNum}}个菜</p>
	       			
	       			<p>合计：<span class="price">¥{{allPrice}}</span></p>
				</div>
			</div>
			
			
			
			<div class="cart_list">
				
				
				<ul>
					<li class="item" v-for="(item,index) in list">
							 	<div class="left_food">
	       							<img :src="api+item.img_url"/>       						
		       						<div class="food_info">
		       							<p>{{item.title}}</p>
		       							<p class="price">¥{{item.price}}</p>
		       						</div>
	       						</div>
	       						
	       						<div class="right_cart">
	       							<div class="cart_num">
								         <div class="input_left" @click="decNum(item,index)">-</div>
								          <div class="input_center">
								              <input type="text"  readonly="readonly" v-model="item.num" name="num" id="num" />
								          </div>
								          <div class="input_right" @click="incNum(item,index)">+</div>				      
								        </div>	
	       						</div>	
					</li>
				</ul>
			</div>
			
			
			
			
			<div class="hot_food">
				
				<h3>本店顾客最常点的菜</h3>
				
				<div class="item_list_outer">
					<ul class="item_list">
						<li>	
							<div class="inner">
								<img src="../assets/images/1.jpg" />
								<p class="title">大蒜腊肉</p>						
								<p class="price">¥26</p>
							</div>		
						</li>
						
						<li>
							<div class="inner">
								<img src="../assets/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>					
							
						</li>
						
						<li>	
							<div class="inner">
								<img src="../assets/images/1.jpg" />
								<p class="title">大蒜腊肉</p>						
								<p class="price">¥26</p>
							</div>		
						</li>
						
						<li>
							<div class="inner">
								<img src="../assets/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>					
							
						</li>
						
						<li>
							<div class="inner">
								<img src="../assets/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>					
							
						</li>
						
						
					</ul>
					
				</div>
				
			</div>
                   <div v-if="!totalNum" class="cart_empty">您的购物车空空的，点击菜单开始点菜</div>

		</div>
		
		
		<v-navfooter></v-navfooter>
			
		
		<div id="footer_book" class="footer_book">
      <router-link to="/home">
			<img src="../assets/images/menu.png"/>
			<p>菜单</p>
      </router-link>
		</div>
		
		
		
		<div id="footer_cart" class="footer_cart">
			<img src="../assets/images/cart.png"/>
			<p>下单</p>
		</div>
		
    </div>
</template>

<script>
import NavFooter from "./public/NavFooter";
import config from "../model/config";
import axios from "axios";

export default {
  data() {
    return {
      msg: "Welcome to your vue.js app",
      api: config.api,
      list: [],
      allPrice: 0,
      totalNum: 0,
      peopleList:0,
    };
  },
  methods: {
    getCartData() {
      var api = this.api + "api/cartlist?uid=a001";
      axios.get(api).then(response => {
        console.log(response.data.result);
        this.list = response.data.result;
        this.getTotalResult();
      });
    },
    decNum(item, index) {
      //请求远程服务器执行更新操作
      var product_id = item.product_id;
      var num = item.num;
      var api =
        this.api +
        "api/decCart?uid=a001&product_id=" +
        product_id +
        "&num=" +
        num;
      axios
        .get(api)
        .then(response => {
          console.log(response);
          this.getTotalResult();
        })
        .catch(err => {
          console.log(err);
        });
      if (item.num == 1) {
        //删除当前购物车的这条数据
        this.list.splice(index, 1);
      } else {
        --item.num;
      }
    },
    incNum(item) {
      var product_id = item.product_id;
      var num = item.num;
      var api =
        this.api +
        "api/incCart?uid=a002&product_id=" +
        product_id +
        "&num=" +
        num;
      axios.get(api).then(
        response => {
          console.log(response);
          this.getTotalResult();
        },
        error => {
          console.log(error);
        }
      );
      ++item.num;
    },
    getTotalResult() {
      var allPrice = 0;
      var totalNum = 0;

      for (var i = 0; i < this.list.length; i++) {
        allPrice += parseFloat(this.list[i].price * this.list[i].num);

        totalNum += this.list[i].num;
      }

      this.allPrice = allPrice;

      this.totalNum = totalNum;
    },
      getPeopleInfoList(){


                    var api=this.api+'api/peopleInfoList?uid=a002';
                    
                    axios.get(api).then(response => {

                        console.log(response);
                        this.peopleList=response.data.result[0];

                    }, response => {
                        // error callback
                    });

                }
  },
  components: {
    "v-navfooter": NavFooter
  },
  mounted() {
    this.getCartData();
    this.getPeopleInfoList();
  }
};
</script>


<style lang="scss">
@charset "UTF-8";
.cart_content {
  padding: 1rem;

  /*头部信息*/
  .cart_info {
    background: #fff;

    h2 {
      text-align: center;
      font-size: 1.8rem;
      padding: 0.8rem 0px;
      border-bottom: 1px solid #eee;
    }
    border-radius: 0.5rem;
    padding: 0.5rem;
    .p_number {
      display: flex;

      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;

      .p_number_left {
        flex: 1;

        p {
          line-height: 2;

          &:first-child {
            color: red;
          }
        }
      }

      .p_number_right {
        width: 4rem;
        height: 4rem;
        text-align: center;

        img {
          width: 1.8rem;
          height: 1.8rem;
          margin: 0 auto;
        }
        a{
          color:#000;
        }
      }
    }

    /*购物车总数量*/

    .cart_p_num {
      border-bottom: 1px solid #eee;
      p {
        line-height: 2;

        .price {
          font-size: 2.4rem;
          color: red;
        }
      }
    }
  }
  /*购物车列表*/

  .cart_list {
    margin-top: 1rem;

    padding: 0.5rem;

    background: #fff;

    border-radius: 0.5rem;

    display: flex;

    ul {
      width: 100%;

      .item {
        display: flex;
        width: 100%;

        border-bottom: 1px solid #eee;

        padding: 1rem 0px;
        .left_food {
          flex: 1;

          display: flex;
          img {
            width: 4rem;
            height: 4rem;
            border-radius: 10%;
            margin-right: 0.8rem;
          }

          .food_info {
            flex: 1;
          }
        }

        .right_cart {
          width: 10rem;
        }
      }
    }
  }

  /*最长点的菜*/

  .hot_food {
    background: #fff;

    margin-top: 1rem;

    border-radius: 0.5rem;

    margin-bottom: 4rem;

    h3 {
      font-size: 1.4rem;

      padding: 0.5rem 0px;
    }

    .item_list_outer {
      width: 100%;

      overflow-x: auto; /*overflow-x 属性规定是否对内容的左/右边缘进行裁剪 - 如果溢出元素内容区域的话 auto如果溢出框，则应该提供滚动机制*/
      .item_list {
        padding: 0px 0.5rem;
        width: 50rem;

        li {
          width: 8rem;
          padding: 0.5rem;
          box-sizing: border-box;
          float: left; /*float 属性定义元素在哪个方向浮动*/

          .inner {
            background: #fff;
            width: 100%;
            border-radius: 0.5rem;
            overflow: hidden;

            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}

/*购车加减*/
.cart_num {
  width: 10rem;

  display: flex;
  margin-top: 0.8rem;

  .input_left,
  .input_right {
    flex: 1;

    width: 2.8rem;
    height: 2.8rem;

    line-height: 2.8rem;

    text-align: center;

    color: red;

    border: 1px solid #eee;

    font-size: 2.4rem;
  }

  .input_center {
    flex: 1;

    input {
      width: 2rem;
      text-align: center;
      width: 100%;
      height: 2.8rem;
      border: none;

      border-top: 1px solid #eee;

      border-bottom: 1px solid #eee;

      float: left;
    }
  }
}

/*购车空*/

.cart_empty {
  text-align: center;
  line-height: 3;

  h3 {
    font-size: 1.8rem;
  }
}
</style>
