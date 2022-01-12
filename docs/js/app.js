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