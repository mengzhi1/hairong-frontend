<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";

// const user = {
//
//     id: 1,
//     username: '海荣',
//     userAccount: 'doghairong',
//     avatarUrl: 'https://img1.baidu.com/it/u=1659441821,1293635445&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
//     gender: '男',
//     phone: '12345678911',
//     email: '2968219@qq.com',
//     planetCode: '1234',
//     createTime: new Date(),
//
// }
const user = ref();

// 当前页面首次触发时执行  获取当前用户信息
onMounted(async () => {
  user.value = await getCurrentUser();
})

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: 'user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<style scoped>

</style>