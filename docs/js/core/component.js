function Component(options){
	const defaultOptions = {
		$target :'',
		$props :'',
		$state :'',
		setup(){},
		render(){	
			this.$target.innerHTML = this.template();
			this.setEvent();
			this.mounted();
		},
		template(){},
		mounted(){},
		setState(newState){
			this.$state = { ...this.$state, ...newState };
			this.render();			
		},
		setEvent(){},
		addEvent(eventName,query,func){
			const $elements = [...this.$target.querySelectorAll(query)];
			if( $elements.length > 1){
				$elements.forEach( $element => $element.addEventListener(eventName,func) )
			}else if( $elements.length == 1 ){
				$elements[0].addEventListener(eventName,func)
			}
		},
		...options
	};
	function init(){
		defaultOptions.setup();
		defaultOptions.render();
	};
	init();
}

export default Component;