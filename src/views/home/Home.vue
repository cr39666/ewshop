<template>
  <div class="home">
    <nav-bar>
      <template v-slot:default>图书兄弟</template>
    </nav-bar>

    <tab-control v-show="isScrollShow" :titles="['畅销','新书','精选']" @tabClick="tabClick"></tab-control>

    <div class="wrapper">
      <div class="content">
        <div ref="banref">
          <home-swiper :banners="banners"></home-swiper>

          <recommend-view :recommends="recommends"></recommend-view>
        </div>

        <tab-control :titles="['畅销','新书','精选']" @tabClick="tabClick"></tab-control>

        <goods-list :goods="showGoods"></goods-list>
      </div>
    </div>
    <back-top @backtop="backtop" v-show="isScrollShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/ChildComps/HomeSwiper";
import NavBar from "@/components/common/navbar/NavBar";
import RecommendView from "@/views/home/ChildComps/RecommendView";
import TabControl from "@/components/content/tabControl/TabControl";
import goodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/common/backtop/BackTop";
import {getHomeAllData,getGoodsData} from "@/network/home.net";
import {onMounted, ref, reactive, computed,watchEffect,nextTick} from "vue";
import BScroll from 'better-scroll';

export default {
  name: "Home",
  setup(){

    let isScrollShow=ref(false);
    let banref=ref(null);
    const recommends = ref([]);

    //商品列表数据模型
    const goods=reactive({
      sales:{page:1,list:[]},
      new:{page:1,list:[]},
      recommend:{page:1,list:[]}
    })
    let currentType=ref('sales')
    const showGoods=computed(()=>{
      return goods[currentType.value].list;
    })

    let bscroll=reactive({})
    let banners=ref([])
    onMounted(()=>{
      getHomeAllData().then(res=>{
        // console.log(res.goods);
        recommends.value=res.goods.data
        banners.value=res.slides;

      })
      getGoodsData('sales').then(res=>{
        // console.log(res.data.goods.data);
        goods.sales.list=res.goods.data;
      })
      getGoodsData('recommend').then(res=>{
        goods.recommend.list=res.goods.data;
      })
      getGoodsData('new').then(res=>{
        goods.new.list=res.goods.data;
      })

      //创建betterscroll对象
      bscroll=new BScroll(document.querySelector('.wrapper'),{
        //当 probeType 为 1 的时候，会非实时（屏幕滑动超过必定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程当中
        // 实时的派发 scroll 事件；当 probeType 为 3 的时候，不只在屏幕滑动的过程当中，并且在 momentum 滚动动画运行过程当中
        // 实时派发 scroll 事件。若是没有设置该值，其默认值为 0，即不派发 scroll 事件。
        probeType:3,
        click:true,
        pullUpLoad:true,  //上拉加载更多
      });
      //触发滚动事件
      bscroll.on('scroll',(position)=>{
        // console.log(-position.y)
        // console.log(banref.value.offsetHeight);
        isScrollShow.value=(-position.y)>banref.value.offsetHeight;
      })
      //上拉加载数据，触发pullingup
      bscroll.on("pullingUp",()=>{
        // console.log('上拉加载更多。。。');
        const page=goods[currentType.value].page+1;
        getGoodsData(currentType.value,page).then(res=>{
          goods[currentType.value].list.push(...res.goods.data);
          goods[currentType.value].page+=1;
        })
        //上拉加载完将数据展示出来
        bscroll.finishPullUp();

        console.log('contentHeight:'+document.querySelector('.content').clientHeight);
        console.log('当前类型:'+currentType.value+",当前页："+page)

        bscroll.refresh();//从新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      })

    })
    //点击切换选项卡
    const tabClick=(index)=>{
      let types=['sales','new','recommend']
      currentType.value=types[index]
      nextTick(()=>{
        //重新计算高度,先判断bscroll是否存在，存在则调用
        bscroll && bscroll.refresh();
      })
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
      recommends,
      tabClick,
      goods,
      showGoods,
      isScrollShow,
      banref,
      backtop,
      banners
    }
  },
  components:{
    HomeSwiper,
    NavBar,RecommendView,TabControl,
    goodsList,BackTop
  }

}
</script>

<style scoped>

.home{
  height: 100vh;
  position: relative;
}
.wrapper{
  position: absolute;
  top:45px;
  bottom: 50px;
  left: 0px;
  right: 0px;
  overflow: hidden;
}
.content{

}

</style>