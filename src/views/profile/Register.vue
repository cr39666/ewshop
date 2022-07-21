<template>
  <div>
    <nav-bar>
      <template v-slot:default>新用户注册</template>
    </nav-bar>
    <div style="margin-top: 50px">
      <div style="text-align: center">
        <van-image
            style="margin-top: 40px"
            width="10rem"
            height="6rem"
            fit="contain"
            src="https://www.lmonkey.com/_nuxt/img/logo.2a324bb.png"
        />
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="name"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
              v-model="password_confirmation"
              type="password"
              name="确认密码"
              label="确认密码"
              placeholder="确认密码"
              :rules="[{ required: true, message: '请确认密码' }]"
          />
          <van-field
              v-model="email"
              type="email"
              name="电子邮箱"
              label="电子邮箱"
              placeholder="请输入正确的电子邮箱"
              :rules="[{ required: true, message: '请填写邮箱' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <div class="link-login" @click="$router.push({path:'/login'})">
            已有账号，立即登录
          </div>
          <van-button round block type="primary" color="#44b883" native-type="submit">
            注&nbsp;册
          </van-button>
        </div>
      </van-form>

    </div>
  </div>

</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {reactive ,toRefs} from "vue";
import {register} from "@/network/user";
import { Dialog,Toast  } from 'vant';
import {useRouter} from "vue-router";

export default {
  name: "Register",
  components:{
    NavBar
  },
  setup(){
    const router =useRouter();
    const userinfo=reactive({
      name:'',
      password:'',
      password_confirmation:'',
      email:''
    })
    const onSubmit=()=>{
      //先验证再提交
        if(userinfo.password!=userinfo.password_confirmation){
          Dialog.alert({
            message: '两次密码不一致',
            theme: 'round-button',
            confirmButtonColor:'#44b883'
          })
        }else{
          register(userinfo).then(res=>{
            if(res.status=='201'){
              Toast.success('注册成功');
              setTimeout(()=>{
                router.push({path:'/login'});
              },1000)
            }
            userinfo.password='';
            userinfo.password_confirmation='';
          })
        }
    }
    return{
      ...toRefs(userinfo),
      onSubmit
    }
  }
}
</script>

<style scoped>
.link-login{
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  display: block;
  text-align: left;
}

</style>