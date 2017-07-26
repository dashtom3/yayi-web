<template>
  <div class="loading">
    <div class="container">
      <div class="loading">
        <img class="loading-img" src="../../images/loading/loading1.png"></img>
      </div>
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
/*  background-color: #eaeaea;  */
} 

/*page {  
  background-color: #eaeaea;  
} */

.loading {
  /*background-color: white;*/
  opacity: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
}

.loading .loading-img {
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
  animation-name: rotating;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
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

@keyframes rotating {
      from {
          transform: rotate(0deg)
      }
      to {
          transform: rotate(360deg)
      }
  }
</style>
