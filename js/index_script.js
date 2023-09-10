class TodoItem {
	/* 
	 * List is being added to constructor params to allow for the future addition of allowing
	 * multiple todo lists.  */

	constructor(text, container) {

		this.item = document.createElement('li');
		this.item.setAttribute('class', 'todo-item');
		this.item.textContent = text;

		this.checkBox = document.createElement('input');
		this.checkBox.setAttribute('type', 'checkbox');
		this.checkBox.setAttribute('class', 'todoCheckBox');
		
		this.wrapper = document.createElement('div');
		this.wrapper.appendChild(this.checkBox);
		this.wrapper.appendChild(this.item);

		this.container = container;
		this.container.appendChild(this.wrapper);
	}


}

window.onload = (event) => {
	console.log("Page is fully loaded.");
	const todoButton = document.querySelector('button#todoButton');
	console.log(todoButton);


	todoButton.addEventListener("click", function addTodo() {
		const input = document.querySelector("#todoInput");
		console.log("Input set to: " + input.value);
		if (input.value) {
			const todoList = document.querySelector("#todoList");
			
			const newTodo = new TodoItem(input.value, todoList);

			input.value = "";
		}

	});
};
