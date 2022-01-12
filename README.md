# vanilla-custom-component

### Vue 기능을 비슷하게 구현하기 전에 Component 를 구현해보았다.

- 구조
	- components
		- todo.js : item 추가 & todoItem 호출
		- todoItem.js : item 렌더링 & item 삭제 
	- core
		- component.js : Component 함수
	- app.js : template 추가 & todo 호출


``` javascript
// app.js
import create from './core/component.js';
import todo from './components/todo.js';

const $app = document.getElementById('app');

create({
	$target:$app,
	template(){
		return `
			<header>Header</header>
			<section>
				<div class="container"></div>
			</section>
			<footer>Footer</footer>
		`;
	},
	mounted(){
		const $sectionContainer = this.$target.querySelector('section>.container');
		todo($sectionContainer);
	}
});
```
```javascript
// /components/todo.js
import create from '../core/component.js';
import todoItem from './todoItem.js';

export default ($target) => create({
	$target,
	setup(){
		this.state = {
			idx:0,
			todos:[]
		};
	},
	template(){
		return `
			<div class="todo">
				<div class="todo-head">
					<button class="todo-head__addItem btn">아이템 추가</button>
				</div>
				<ul class="todo-body"></ul>
			</div>
		`
	},
	mounted(){
		const $todoBody = $target.querySelector('.todo-body');
		todoItem($todoBody,this.state.todos);
	},
	setEvent(){
		this.addEvent('click','.todo-head__addItem',()=>{
			this.state.todos = [...this.state.todos,this.addTodo()];
			this.setState(this.state)
		});
	},
	addTodo(){
		return { name: `item${this.state.idx++}` }
	}
});
```
```javascript
// /component/todoItem.js
import create from '../core/component.js';


export default ($target,$props) => create({
	$target,
	$props,
	setup(){
		this.state ={
			todos:this.$props
		};
	},
	template(){
		const todos = this.state.todos;
		return `
			${ todos.map( ({name,status},index) => `
				<li class="todo-body__item ${status}" data-index="${index}">
					<span class="todo-item__name">${name}</span>
					<button class="todo-item__remove-btn btn">삭제</button>
				</li>
			`).join('') }  
		`
	},
	setEvent(){
		this.addEvent('click','.todo-item__remove-btn',({target})=>{
			const $item = target.closest('.todo-body__item');
			const itemIndex = $item.getAttribute('data-index');
			this.state.todos.splice(itemIndex,1);
			this.setState(this.state);
		});
	},
});

```


> ### 참고 
> - https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/