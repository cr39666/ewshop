<template>
  <div class="goods">
    <goods-item v-for="item in goods" :product="item" :key="item"></goods-item>
  </div>
</template>

<script>
import GoodsItem from "@/components/content/goods/GoodsItem";

export default {
  name: "GoodsList",
  props:{
    goods:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  components:{
    GoodsItem
  }
}
</script>

<style scoped lang="scss">
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding:5px;
}
</style>