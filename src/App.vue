<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    font-family: "Microsoft YaHei" !important;
  }
  #app {
    font-family: "Microsoft YaHei" !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
  }
  .clearfix {
    clear: both;
  }
  a {
    text-decoration: none;
    color: #83868E;
  }
  ul {
    list-style-type: none;
  }

  button {
    outline: none;
    border: none;
    list-style-type:none;
    font-family: "Microsoft YaHei" !important;
  }
  input,p{
    font-family: "Microsoft YaHei" !important;
  }
  /*过渡动画开始*/
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-active {
    opacity: 0;
  }
  .shake-enter-active {
    animation: shake .5s;
  }
  .shake-leave-active {
    transition: all 0.3s ease;
    opacity: 0;
  }
  @-webkit-keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-7px, 0, 0);
      transform: translate3d(-7px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(7px, 0, 0);
      transform: translate3d(7px, 0, 0);
    }
  }

  @keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-7px, 0, 0);
      transform: translate3d(-7px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(7px, 0, 0);
      transform: translate3d(7px, 0, 0);
    }
  }

  .shake {
    -webkit-animation-name: shake;
    animation-name: shake;
  }
  /*过渡动画结束*/
  .img_box_change {
    width: 152px;
    margin: 0 auto;
  }
  .img_box_change:hover{
    cursor: pointer;
  }
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
  .publicHover:hover {
    cursor: pointer;
    color: #005aab;
    transition: all ease 0.5s;
  }
  .el-pager li.active {
    border-color: #005aab;
    background-color: #005aab;
    color: #fff;
    cursor: default;
  }
  .el-button--primary {
    border-color: #005aab;
    background-color: #005aab;
  }
  .el-radio__input.is-checked .el-radio__inner, .el-checkbox__input.is-checked .el-checkbox__inner{
    border-color: #005aab !important;
    background-color: #005aab !important;
  }
  .el-button--primary:hover {
    background: #329af0 !important;
    border-color: #329af0 !important;
  }
  .el-input__inner:focus {
    border-color: #329af0;
  }
  .el-submenu .el-menu-item.is-active, .el-menu-item.is-active, .el-submenu .el-menu-item.is-active:hover, .el-menu-item.is-active:hover {
    background-color: #329af0 !important;
  }
  .el-submenu__title:hover,.el-menu-item.is-active:hover{
    background-color: #329af0 !important;
  }
/*牙医ABC 深蓝#005aab; hover浅蓝#329af0;#04D8DD;红色#cb1700;*/
</style>
