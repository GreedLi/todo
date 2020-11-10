
<template>
  <div class="container">
      <img class="unifyImg" v-if="unify" src="../assets/77f600ca25bf43f444be2cab3371489.jpg" alt="" />
      <div class="group"  @click="unify=false">
        <div class="leftPic"  :class="{'left':!unify}"></div>
        <div class="rightPic" :class="{'right':!unify}"></div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unify:true,
    }
  },
  created() {},
  methods: {
  },
}
</script>

<style scoped>
.container{
  width: 200px;
  height: 485px;
  margin: 0 auto;
}
.unifyImg {
  width: 200px;
}
.left{
  transform:translateX(-100px);
}
.right{
  transform:translateX(100px);
}
.left,.right{
  transition: 1s linear;
  opacity: 0;
}
.leftPic{
  background: url('../assets/77f600ca25bf43f444be2cab3371489.jpg') no-repeat ;
}
.rightPic{
  background: url('../assets/77f600ca25bf43f444be2cab3371489.jpg') no-repeat -100px;
}
.leftPic,.rightPic{
  background-size:200px;
  width: 100px;
  height: 485px;
}
.group{
  position: absolute;
  top: 0;
  display: flex
}
</style>