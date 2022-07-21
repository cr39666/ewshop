<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品分类</template>
    </nav-bar>

    <div id="mainbox">

      <van-sidebar class="leftmenu" v-model="activeKey">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item v-for="item in categories" :key="item.id"
                             :title="item.name" :name="0">
            <van-sidebar-item v-for="sub in item.children" :title="sub.name"
                              :key="sub.id" @click="getGoods(sub.id)" />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>

      <div class="ordertab">
        <van-tabs v-model="active" @click="tabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
      </div>

      <div class="goodslist">
        <div class="content">
          <van-card
              v-for="item in showGoods" :key="item.id"
              @click="itemClick(item.id)"
              :num="item.comments_count"
              :tag="item.comments_count>=0?'流行':'标签'"
              :price="item.price"
              :desc="item.updated_at"
              :title="item.title"
              :thumb="item.cover_url"
              :lazy-load="true"
          />
        </div>
      </div>
      <back-top @backtop="backtop" v-show="isScrollShow"></back-top>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {ref, reactive, onMounted, computed,nextTick, watchEffect} from "vue";
import {useRouter} from "vue-router";
import {getCategory,getCategoryGoods} from "@/network/category";
import BScroll from "better-scroll";
import BackTop from "@/components/common/backtop/BackTop";


export default {
  name: "Category",
  setup(){
    const router=useRouter();
    let activeKey =ref(0);
    let categories=ref([])
    let activeName=ref('1')
    let active=ref(0);
    let isScrollShow=ref(false)

    let currentOrder=ref('sales');
    let currentCid=ref(0);
    //数据模型
    const goods=reactive({
      sales:{page:1,list:[]},
      price:{page:1,list:[]},
      comments_count:{page:1,list:[]},
    })

    const showGoods=computed(()=>{
      return goods[currentOrder.value].list;
    })

    const init=()=>{
      getCategoryGoods('sales',currentCid.value).then(res=>{
        goods.sales.list=res.goods.data;
      })
      getCategoryGoods('price',currentCid.value).then(res=>{
        goods.price.list=res.goods.data;
      })
      getCategoryGoods('comments_count',currentCid.value).then(res=>{
        goods.comments_count.list=res.goods.data;
      })
    }
    let bscroll =reactive({});
    onMounted(()=>{
      getCategory().then(res=>{
        // console.log(res);
        categories.value=res.categories;
      })
      init();
      //创建betterScroll对象
      bscroll=new BScroll(document.querySelector('.goodslist'),{
        probeType:3,
        click:true,
        pullUpLoad:true,  //上拉加载更多
      })
      //注册滚动事件
      bscroll.on('scroll',(position)=>{
        isScrollShow.value=(-position.y)>300
      })
      //上拉加载数据，触发pullingup
      bscroll.on("pullingUp",()=>{
        // console.log('上拉加载更多。。。');
        const page=goods[currentOrder.value].page+1;
        getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
          goods[currentOrder.value].list.push(...res.goods.data);
          goods[currentOrder.value].page+=1;
        })
        //上拉加载完将数据展示出来
        bscroll.finishPullUp();

        console.log('contentHeight:'+document.querySelector('.content').clientHeight);

        nextTick(()=>{
          //重新计算高度,先判断bscroll是否存在，存在则调用
          bscroll && bscroll.refresh();
        });//从新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      })
    })
    //排序选项卡
    const tabClick=(index)=>{
      let orders=['sales','price','comments_count']
      console.log('排序的序号:'+orders[index]);
      currentOrder.value=orders[index];
      getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
        goods[currentOrder.value].list=res.goods.data;
        nextTick(()=>{
          //重新计算高度,先判断bscroll是否存在，存在则调用
          bscroll && bscroll.refresh();
        })
      })
      console.log(currentCid.value);
    }
    //通过分类得到商品
    const getGoods=(cid)=>{
      currentCid.value=cid;
      init()
      console.log('当前分类的id：'+currentCid.value);
      console.log('排序的序号:'+currentOrder.value);
    }
    //监听任意一个变量有变化
    watchEffect(()=>{
      nextTick(()=>{
        //重新计算高度,先判断bscroll是否存在，存在则调用
        bscroll && bscroll.refresh();
      })
    })
    const backtop=()=>{
      bscroll.scrollTo(0,0,500);
    }
    return{
      activeKey,
      activeName,
      categories,
      active,
      tabClick,
      currentOrder,
      currentCid,
      getGoods,
      goods,
      showGoods,
      bscroll,
      isScrollShow,
      backtop,
      itemClick:(id)=>{
        router.push({path:'/detail',query:{id}})
      }
    }
  },
  components:{
    NavBar,
    BackTop
  }
}
</script>

<style scoped lang="scss">
  #mainbox{
    .leftmenu{
      //background: green;
      width: 32%;
      height: 84vh;
      position: fixed;
      top:45px;
      left: 0;
    }
    .ordertab{
      height: 44px;
      z-index: 9;
      position: fixed;
      top:45px;
      right:0;
      left:32%;
    }
    .goodslist{
      //background: blue;
      position: fixed;
      top: 95px;
      left: 32%;
      right: 0;
      height:80vh;
      overflow: hidden;
      text-align: left;
    }
  }
  .van-card__thumb{
    width:68px !important;
  }
</style>