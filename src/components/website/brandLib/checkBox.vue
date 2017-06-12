<template>
  <!-- `checked` 为 true 或 false -->
    <el-checkbox v-model="checked" v-on:click.native="onClickMe">支持钱币抵扣</el-checkbox>
</template>
<script>
  export default {
    name:"checkBox",
    data() {
      return {
        checked: false
      };
    },
    methods: {
      onClickMe: function($event){
        $event.preventDefault();
        this.checked = !this.checked;
        this.$emit('childsay',this.checked);
      }
    }
  };
</script>
