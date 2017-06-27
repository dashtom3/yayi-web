<template>
  <div class="goodComment">
    <ul>
      <li v-for="comment in comments">
        <div >
          <span class="name">{{comment.userName}}</span>
          <span class="phone">{{comment.userPhone}}</span>
          <score :thisscore="comment.commentGrade"></score>
          <span class="time">{{comment.created}}</span>
        </div>
        <div class="commentContents">{{comment.commentContent}}</div>
        <div class="commentReplay">
          {{comment.replyContent}}
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
        allComments:[
          
        ]
      }
    },
    components:{
      score
    },
    props:["comments"],
    created:function(){
      console.log(this.comments,111111111111)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
