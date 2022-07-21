<template>
  <div style="padding: 50px 0px">
    <nav-bar>
      <template v-slot:default>商品详情{{id}}</template>
    </nav-bar>
    <van-image
        width="100%"
        lazy-load
        :src="detail.cover_url"
    />
    <van-card
        style="text-align: left"
        :num="detail.stock"
        :price="detail.price+'.00'"
        :desc="detail.decription"
        :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag plain type="danger">推荐</van-tag>
      </template>
      <template #footer>
        <van-button type="warning" @click="handleAddCart">加入购物车</van-button>
        <van-button
            @click="goToCart"
            color="linear-gradient(to right, #ff6034, #ee0a24)">
          立即购买
        </van-button>
      </template>
    </van-card>
    <van-tabs  v-model="active">
      <van-tab title="概述">
        <div class="content" v-html="detail.details">

        </div>
      </van-tab>
      <van-tab title="热评">
        <div v-for="item in detail.comments">
            {{item}}
        </div>
      </van-tab>
      <van-tab title="相关图书">
        <goods-list :goods="like_goods"></goods-list>
      </van-tab>
    </van-tabs>


  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import GoodsList from "@/components/content/goods/GoodsList";
import {useRoute,useRouter} from "vue-router";
import {ref, onMounted, reactive,toRefs} from "vue";
import {getDetail} from "@/network/detail";
import {addCart} from "@/network/cart.net";
import {Toast} from "vant";
import {useStore} from "vuex";

export default {
  name: "Detail",
  components:{
    GoodsList,
    NavBar
  },
  setup(){
    let active=ref(1)
    const route=useRoute();
    const router=useRouter();
    const store=useStore();

    let id = ref(0);
    let book=reactive({
      detail:{},
      like_goods:[]
    });

    onMounted(()=>{
      id.value=route.query.id;
      getDetail(id.value).then(res=>{
        // console.log(res.data.goods.comments)
        book.detail=res.goods;
        book.like_goods=res.like_goods;

      })
    })

    //添加购物车
    const handleAddCart=()=>{
      addCart({goods_id:book.detail.id,num:1}).then(res=>{
        if(res.status=='201'||res.status=='204'){
          Toast.success('添加成功')
          //设置store中的cartCount
          store.dispatch('updateCart')
        }
      })
    }
    //立即购买
    const goToCart=()=>{
      addCart({goods_id:book.detail.id,num:1}).then(res=>{
        if(res.status=='201'||res.status=='204'){
          Toast.success('到购物车下单')
          store.dispatch('updateCart')
          router.push({path:'/shopcart'})
        }
      })
    }

    return {
      id,
      ...toRefs(book),
      active,
      handleAddCart,
      goToCart
    }
  }
}


</script>

<style scoped lang="scss">

</style>