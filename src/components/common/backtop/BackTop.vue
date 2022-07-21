<template>
  <div class="backtop" @click="backtop">

  </div>
</template>

<script>
export default {
  name: "BackTop",
  setup(props,{emit}){
    return{
      backtop:()=>{
        emit('backtop');
      }
    }
  }
}
</script>

<style scoped>
.backtop{
  width: 40px;
  height:40px;
  position: fixed;
  bottom: 80px;
  right: 25px;
  z-index: 20;
  box-shadow: 3px 3px 5px #888888;
  border-radius: 50%;
  background: rgba(1, 253, 148, 0.56) url('~assets/images/up.png') no-repeat center center;
}
</style>