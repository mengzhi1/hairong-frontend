<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios";
import { showSuccessToast, showFailToast } from 'vant';
import UserCardList from "../components/UserCardList.vue";
import Qs from "qs";


const route = useRoute();
const {tags} = route.query;

const userList = ref([]);
onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: {
      serialize:function(params) {
        return Qs.stringify(params, {indices: false})
      }
    }
  })
  .then(function (response) {
    console.log('/user/search/tags succeed', response);
    // showLoadingToast({ message: '加载中', forbidClick: true,});
    // showSuccessToast('请求成功');
    return response?.data;
  })
  .catch(function (error) {
    console.error('/user/search/tags error', error);
    showFailToast('请求失败');
    // Toast.fail('请求失败');
  })
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }

})


// const mockUser = {
//   id: 12345,
//   username: '海荣',
//   userAccount: '12314',
//   profile: '一名精神小伙，目前还有头发，谢谢大家，阿爸爸阿爸爸阿巴阿巴阿巴',
//   avatarUrl: 'https://img1.baidu.com/it/u=1659441821,1293635445&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
//   gender: 0,
//   phone: '13113113111',
//   email: '592342843721987@xzcxzczxcz.com',
//   userRole: 0,
//   planetCode: '1234',
//   tags: ['java', 'emo', '打工中', 'emo', '打工中'],
//   createTime: new Date(),
// }



</script>

<style scoped>

</style>