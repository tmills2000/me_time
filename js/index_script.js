class TodoItem {
	/* 
	 * List is being added to constructor params to allow for the future addition of allowing
	 * multiple todo lists.
	 */

	constructor(text, container) {
		this.item = document.createElement('li');
		this.item.textContent = text;
		
		this.container = container;
		this.container.appendChild(this.item);	
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
