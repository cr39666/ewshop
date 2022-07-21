<template>
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src
import {ref,onMounted} from 'vue';
import {getHomeAllData} from "@/network/home.net";

export default {
  name: 'HomeView',
  // data(){
    // return {
    //   imgsrc:require("assets/images/2.png")
    // }
  // },
  setup(){
    const banner=ref([])
    onMounted(()=>{
      getHomeAllData().then(res=>{
          console.log(res.data.slides);
      }).catch(err=>{

      })
    })
    return{
      banner
    }
  },
  components: {

  }
}
</script>

<style>


</style>