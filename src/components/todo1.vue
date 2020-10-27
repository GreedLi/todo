<!--
 * @Description: Description
 * @Author: Li Zhenxing
 * @Date: 2020-06-09 13:47:28
 * @LastEditors: Li Zhenxing
 * @LastEditTime: 2020-06-09 13:47:39
--> 
<template>
<div class="app">
		<section class="todoapp">
			<header class="header">
				<h1>todos</h1>
        <h2>一共增加了{{count}}条数据</h2>
				<input v-model="todoName" @keyup.enter="addTodo" class="new-todo" placeholder="What needs to be done?" autofocus>
			</header>
			<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					<li v-for="(item,index) in slice" :key="item.id" @dblclick="delTodo(index)">
            <div class="view">
                <input class="toggle" type="checkbox" :checked="item.completed" @change="(event) => { changeState(item.id, event); }">
                <label>{{item.name}}</label>
                <label>{{item.time | capitalize}}</label>
            </div>
            <!-- <input class="edit" :value="item.name" @keyup.enter="updateTodo(item.id,$event)"> -->
					</li>
				</ul>
			</section>
      <footer>
        <div class="block">
          <div @click="prev">上一页</div>
          <input type="text" v-model="pageSize">
          <div @click="next">下一页</div>
        </div>
      </footer>
		</section>
</div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn';
export default {
  data() {
    return {
      todoName: '',
      count: 0,
      list: [],
      completed:false,
      pageSize: 2,
      page :1,
    }
  },
  filters: {
    capitalize:  (v)=> {
      return moment(v).format("YYYY-MM-DD,h:mm:ss a")
    }
  },
  computed: {
    sort(){
      return this.list.sort((a,b) => {
        if(a.completed === b.completed){
          return a.time - b.time
        }
        return a.completed ? 1:-1
      })
    },
    slice(){
      return this.sort.slice((this.page-1)*this.pageSize,this.page*this.pageSize)
    }
  },
  watch:{
    list: {
      handler(v){
        if (v) {
        var str = JSON.stringify(this.list)
        localStorage.setItem('list',str)
        }
      },
      deep:true,
    },
    count: {
      handler(v){
        if (v) {
          localStorage.setItem('count', this.count)
        }
      }
    }
  },
  mounted() {
    var a = localStorage.getItem('count')
    this.count = a
    var b = localStorage.getItem('list')
    var c = JSON.parse(b)
    this.list = c
    // var k = c.map((c)=>{
    //   return c.time
    // })
  },
  methods: {
    addTodo() {
      this.list.push({
        name: this.todoName,
        id: new Date().getTime(),
        time: new Date().getTime(),
        completed: false
      })
      this.todoName = ''
      this.count++
    },
    delTodo(index){
      this.list.splice(index,1)
      this.count--
    },
    changeState(id, event) {
      const item = this.list.find(item => item.id === id);
      item.completed = !item.completed
    },
    prev(){
      if (this.page>1) {
        this.page--
      }
      console.log(this.page,'111');
    },
    next(){
      const total = this.list.length;
      const totalPage = Math.ceil(total/this.pageSize);
      console.log(this.page,totalPage,'222');
      if (this.page < totalPage) {
         this.page++
      }
      // console.log(totalPage,'222');
    },
  },
}
</script>
<style>
.view {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  padding: 0px 10px 0 10px;
}
.block{
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  padding: 0px 5px 0 5px;
}
</style>
