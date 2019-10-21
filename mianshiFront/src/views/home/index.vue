<template>
  <div class="welcome">
    {{timeTip}}好！{{user.userName}}
  </div>
</template>
<script>
import { querUserList } from '@/api/index.js'
export default {
  data () {
    return {
      user: {}
    }
  },
  computed: {
    timeTip () {
      const housr = new Date().getHours();
      return housr < 11 ? '早上' : housr < 18 ? '下午' : '晚上'
    }
  },
  created () {
    let user = localStorage.getItem('user')
    if (user) {
      try {
        this.user = JSON.parse(user);
      } catch (error) {
      }
    }
    querUserList({ data: {} })
  }

}
</script>
<style lang="less" scoped>
.welcome {
  text-align: center;
  padding-top: 100px;
  font-size: 25px;
  font-weight: bold;
  color: #666;
}
</style>