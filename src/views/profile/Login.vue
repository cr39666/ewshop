<template>
  <div>
    <nav-bar>
      <template v-slot:default>用户登录</template>
    </nav-bar>
    <div style="margin-top: 50px">
      <div style="text-align: center">
        <van-image
            style="margin-top: 40px"
            width="10rem"
            height="8rem"
            fit="contain"
            src="https://www.lmonkey.com/_nuxt/img/logo.2a324bb.png"
        />
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="email"
              name="邮箱"
              label="邮箱"
              placeholder="邮箱"
              :rules="[{ required: true, message: '请填写邮箱' }]"
          />
          <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <div class="link-register" @click="$router.push({path:'/register'})">
            没有账号，立即注册
          </div>
          <van-button round block type="primary" color="#44b883" native-type="submit">
            登&nbsp;录
          </van-button>
        </div>
      </van-form>

    </div>
  </div>

</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {reactive ,toRefs} from "vue";
import {login} from "@/network/user";
import {Toast  } from 'vant';
import {useRouter} from "vue-router";
import {useStore} from "vuex"

export default {
  name: "Login",
  components:{
    NavBar
  },
  setup(){
    const router =useRouter();
    const store=useStore()

    const userinfo=reactive({
      email:'',
      password:''
    })
    const onSubmit=()=>{
      login(userinfo).then(res=>{
        //将token保存到本地，window.localStorage setItem(key,value) getItem(key)
        // console.log(res.access_token);
        window.localStorage.setItem('token',res.access_token);
        //在vuex 临时保存一个islogin，然后可以判断其真假
        store.commit('setIsLogin',true);

        Toast.success('登录成功')
        userinfo.email='';
        userinfo.password=''
        setTimeout(()=>{
          router.go(-1);
        },500)
      })
    }
    return{
      ...toRefs(userinfo),
      onSubmit
    }
  }
}
</script>

<style scoped>
.link-register{
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  display: block;
  text-align: left;
}

</style>