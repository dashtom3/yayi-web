<template>
  <div class="goodComment">
    <ul>
      <li v-for="comment in allComments">
        <div >
          <span class="name">{{comment.name}}</span>
          <span class="phone">{{comment.phone}}</span>
          <score :thisscore="comment.score"></score>
          <span class="time">{{comment.time}}</span>
        </div>
        <div class="commentContents">测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论</div>
        <div class="commentReplay">
          这是回复这是回复
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
          {name:'陈**1',phone:'12341431341',score:3,time:'1324-12-12 23:12'},
          {name:'陈**2',phone:'12341431341',score:5,time:'1324-12-12 23:12'},
          {name:'陈**3',phone:'12341431341',score:2,time:'1324-12-12 23:12'},
          {name:'陈**4',phone:'12341431341',score:1,time:'1324-12-12 23:12'},
          {name:'陈**5',phone:'12341431341',score:4,time:'1324-12-12 23:12'}
        ]
      }
    },
    components:{
      score
    },
    mounted:function(){
      
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
