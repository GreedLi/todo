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
					<li v-for="item in list" :key="item.id" @dblclick="delTodo">
            <div class="view">
                <input class="toggle" type="checkbox" :checked="item.completed" @change="(event) => { changeState(item.id, event); }">
                <!-- <input class="toggle" type="checkbox" :checked="list.completed" @click="changeState($index)"> -->
                <label>{{item.name}}</label>
                <label>{{item.time}}</label>
            </div>
            <!-- <input class="edit" :value="item.name" @keyup.enter="updateTodo(item.id,$event)"> -->
					</li>
				</ul>
			</section>
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
      // clickId = -1
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
      deep:true
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
  },
  methods: {
    addTodo() {
      this.list.push({
        name: this.todoName,
        id: new Date().getTime(),
        // id: moment().format('MMMM Do YYYY, h:mm:ss a'),
        time: moment(new Date()).add('year',0).format("YYYY-MM-DD,h:mm:ss a"),
        completed: false
      })
      this.todoName = ''
      this.count++
    },
    delTodo(index) {
      this.list.splice(index, 1)
      this.count--
    },
    changeState(id, event) {
      const item = this.list.find(item => item.id === id);
      item.completed = !item.completed
    },
    // changeState(index) {
    //   this.list[index].completed = !this.list[index].completed;
    // },
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
</style>
