window.onload = (event) => {
	console.log("Page is fully loaded.");
	const todoButton = document.querySelector('button#todoButton');
	console.log(todoButton);


	todoButton.addEventListener("click", function addTodo() {
		const input = document.querySelector("#todoInput");
		console.log("Input set to: " + input.value);
		if (input.value) {
			const todoList = document.querySelector("#todoList");
			const newTodo = document.createElement('li');
			newTodo.textContent = input.value;
			todoList.appendChild(newTodo);
			input.value = "";
		}

	});
};
