<template>
  <router-view/>
  <!--  缓存页面-->
  <!--  <router-view v-slot="{Component}">-->
  <!--    <transition>-->
  <!--      <keep-alive>-->
  <!--        <component :is="Component"/>-->
  <!--      </keep-alive>-->
  <!--    </transition>-->
  <!--  </router-view>-->

  <nav>
    <router-link class="tab-bar-item" to="/">
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link class="tab-bar-item" to="/category">
      <div class="icon"><i class="iconfont icon-fenlei"></i></div>
      <div>分类</div>
    </router-link>
    <router-link class="tab-bar-item" to="/shopcart">
      <div class="icon">
        <van-badge :content="$store.state.cartCount" max="9">
          <i class="iconfont icon-gouwuche"></i>
        </van-badge>
      </div>
      <div>购物车</div>
    </router-link>
    <router-link class="tab-bar-item" to="/profile">
      <div class="icon"><i class="iconfont icon-wode"></i></div>
      <div>我的</div>
    </router-link>
  </nav>
</template>

<script>
import {useStore} from "vuex";
import {onMounted} from "vue";

export default {
  setup() {
    const store = useStore()
    onMounted(() => {
      store.dispatch('updateCart')
    })
  }
}
</script>


<style lang="scss">
@import "assets/css/base.css";
@import "assets/css/font/iconfont.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #F6F6F6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 1px 10px rgba(100, 100, 100, 0.3);

  a {
    color: var(--color-text);

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: var(--font-size);
  }

  .tab-bar-item .icon {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    display: inline-block;
  }
}
</style>
