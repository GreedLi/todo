<template>
  <div class="container">
      <img class="unifyImg" v-if="unify" src="../assets/77f600ca25bf43f444be2cab3371489.jpg" alt="" />
      <div class="group"  @click="click">
        <div class="leftPic"  :class="{'left':animation}"   alt=""></div>
        <div class="rightPic" :class="{'right':animation}"   alt=""></div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unify:true,
      animation:false
    }
  },
  created() {},
  methods: {
    click() {
      this.animation = true
      this.unify=false
    },
  },
}
</script>

<style scoped>
.container{
  padding-left: 500px;
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