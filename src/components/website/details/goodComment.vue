<template>
  <div class="goodComment">
    <div v-if="comments.length==0" class="noComment">
      <img src="../../../images/details/noComment.png" alt="">
    </div>
    <ul v-else>
      <li v-for="comment in comments">
        <div >
          <span class="name">{{comment.userName}}</span>
          <span class="phone">{{comment.userPhone | matUserPhone}}</span>
          <score :thisscore="comment.commentGrade"></score>
          <span class="time">{{comment.created}}</span>
        </div>
        <div class="commentContents">{{comment.commentContent}}</div>
        <div class="commentReplay" v-if="comment.replyContent">
          <span class="sjhf">商家回复</span>
          <span class="sjhfnr">
            {{comment.replyContent}}
          </span>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
import score from "./score"
import axios from 'axios'
import global from '../../global/global'
  export default {
    name: 'goodComment',
    data () {
      return {
        thisscore:null,
        allComments:[]
      }
    },
    components:{
      score
    },
    filters:{
      matUserPhone:function(val){
        var arr = val.split("");
        for(let i in arr){
          if(i>2 && i<7){
            arr[i]="*";
          }
        }
        return arr.join("");
      }
    },
    props:["comments"],
    created:function(){
      // for(let i in ){
      //
      // }
      console.log(this.comments,111111111111)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.commentReplay{
  background:#ececec;
  border-radius:5px;
  padding:20px;
  width:1200px;
  word-break: break-all;
}
.commentReplay .sjhf{
  display: block;
  float: left;
  margin-right: 20px;
}
.commentReplay .sjhfnr{
  display: inline-block;
      margin-left: 70px;
      margin-top: -30px;
      margin-right: 0;
}
.noComment img{
  display: block;
  margin: auto;
  margin-top:86px;
  margin-bottom: 100px;
  /*line-height: 150px;
  text-align: center;
  font-weight: 600;*/
}
.goodComment li {
  border-bottom:1px solid #dcdcdc;
  padding:35px 0;
  line-height:30px;
}
.goodComment li span{
  font-size:12px;
  margin-right:30px;
}
.goodComment li .name{

}
.goodComment li .phone{

}
.goodComment li .score{

}
.goodComment li .time{
  float:right;
  margin-right:0;
  color: #bcbcbc;
}
.commentContents{
  margin-top: 20px;
}
</style>
