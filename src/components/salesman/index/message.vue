<template>
    <div class="message-container">
        <div class="mask" @click="closeMessage"></div>
        <div class="content">
            <div class="title">{{title}}</div>
            <span class="close" @click="closeMessage">&times;</span>
            <div class="text-container">
                <slot></slot>
            </div>
            <el-button class="close-btn" type="primary" @click="closeMessage">关  闭</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '未命名'
      }
    },
    methods: {
      closeMessage(e) {
        this.$emit('messageshow', false)
        e.stopPropagation();
      }
    }
  }
</script>

<style scoped>
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .2);
        z-index: 999;
    }

    .content {
        position: fixed;
        width: 50%;
        top: 15%;
        height: 70%;
        left: 50%;
        overflow-y: scroll;
        transform: translateX(-50%);
        background-color: #fff;
        padding: 0 50px;
        border-radius: 3px;
        z-index: 999;
    }

    .title {
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        margin-top: 20px;
        padding-bottom: 10px;
    }

    .text-container {
        white-space: pre-line;
        text-align: left;
        line-height: 22px;
    }

    .close {
        position: absolute;
        right: 3px;
        top: 3px;
        font-size: 30px;
        color: #999;
        cursor: pointer;
    }

    .close:hover {
        color: #20a0ff;
    }

    .close-btn {
       width: 100px;
       height: 40px;
       margin: 30px auto;
    }

    .close-btn:hover {
        background-color: #4db3ff;
    }
</style>