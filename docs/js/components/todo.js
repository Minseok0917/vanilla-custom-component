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
			console.log(this.state.todos);
			this.setState(this.state)
		});
	},
	addTodo(){
		const idx = this.state.todos.length+1;
		return { name: `item${idx}` }
	}
});