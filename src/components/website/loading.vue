<template>
  <div class="loading">
    <div class="container"></div>
    <div class="container_in">
      <div class="loading">
        <img class="loading_img" src="../../images/loading/loading1.png"></img>
      </div>
      <p class="loading_word">拼命加载中......</p>
      <div class="loading_container"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    data () {
      return {
      }
    },
    created: function() { 
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;  
  opacity: 0.8;
  position: absolute;
} 

.container_in {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  position: relative;
}

.loading {
  /*background-color: white;*/
  opacity: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
}

.loading_img {
  z-index: 999;
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
/*  margin-top: 50%;*/
  animation-name: container;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.loading_word {
  z-index: 999;
  width: 100px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  transform: translateY(50px);
  font-size: 14px;
}
.loading_container {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
/*  background-color: #fff;*/
  transform: translateY(-50%);
}
.loading .loading-img1 {
  z-index: 999;
  width: 50vw;
  height: 20vw;
  line-height: 20vw;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 50%;
}

@keyframes jump {
  0% {  
      transform: translate(0px, 0px);  
  }  
  50% {  
      transform: translate(0px, -50px);  
  }  
  100% {  
      transform: translate(0px, 0px);  
  }  
}
@-webkit-keyframes container{
  0%,
  100%,
  20%,
  50%,
  80% {
    transition-timing-function: cubic-bezier(0.215,.61,.355,1); /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
    transform: translate3d(0,0,0); /*设置只在Z轴上移动*/
  }
  40%,
  43%{
    transition-timing-function: cubic-bezier(0.755,0.50,0.855,0.060);
    transform: translate3d(0,-35px,0);
  }
  70%{
    transition-timing-function: cubic-bezier(0.755,0.050,0.855,0.060);
    transform: translate3d(0,-20px,0);
  }
  90%{
    transform: translate3d(0,-9px,0);
  }
}
@keyframes container{
  0%,
  100%,
  20%,
  50%,
  80% {
    transition-timing-function: cubic-bezier(0.215,.61,.355,1); /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
    transform: translate3d(0,0,0); /*设置只在Z轴上移动*/
  }
  40%,
  43%{
    transition-timing-function: cubic-bezier(0.755,0.50,0.855,0.060);
    transform: translate3d(0,-35px,0);
  }
  70%{
    transition-timing-function: cubic-bezier(0.755,0.050,0.855,0.060);
    transform: translate3d(0,-20px,0);
  }
  90%{
    transform: translate3d(0,-9px,0);
  }
}
</style>
