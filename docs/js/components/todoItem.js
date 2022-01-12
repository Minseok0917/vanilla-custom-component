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