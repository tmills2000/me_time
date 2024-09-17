class TaskList {
	constructor() {
		this.todoList = document.querySelector('#todoList');
		this.doneList = document.querySelector('#doneList');
	}

	addTask(text) {
		this.task = new Task(text, this);
		this.todoList.appendChild(this.task.getWrapper());

		console.log("Adding new task \"" + text + "\" to todo list");
	}

	// Need to move this to the Task class
	moveTask(task, taskDone) {
		let taskWrapper = task.getWrapper();

		console.log("Task: \"" + task.getText() + "\" is marked done: " + taskDone);

		if (taskDone) {
			this.todoList.removeChild(taskWrapper);
			this.doneList.appendChild(taskWrapper);
		} else {
			this.doneList.removeChild(taskWrapper);
			this.todoList.appendChild(taskWrapper);
		}
	}

	deleteTask(task) {
		// Does any of this work???
		// this.list = task.getParent();
		// this.list.removeChild(task);
	}

}


class Task {

	#taskList;
	#taskWrapper;
	#item;
	#checkBox;

	constructor(text, taskList) {

		this.#taskList = taskList;

		this.#item = document.createElement('li');
		this.#item.setAttribute('class', 'todo-item');
		this.setText(text);

		this.#checkBox = document.createElement('input');
		this.#checkBox.setAttribute('type', 'checkbox');
		this.#checkBox.setAttribute('class', 'todoCheckBox');
		this.#checkBox.addEventListener('click', () => this.#todoChecked(this.#checkBox.checked));

		this.#taskWrapper = document.createElement('div');
		this.#taskWrapper.appendChild(this.#checkBox);
		this.#taskWrapper.appendChild(this.#item);

	}

	setText(text) {
		this.#item.textContent = text;
	}

	getText() {
		return this.#item.textContent;
	}

	getWrapper(){
		return this.#taskWrapper;
	}

	#todoChecked(done) {
		this.#taskList.moveTask(this, done);
		// Change Styling?? Or should CSS take care of this when the task is moved to the other list?
	}

}

window.onload = (event) => {
	console.log("Page is fully loaded.");

	const list = new TaskList();

	const taskButton = document.querySelector('button#todoButton');
	console.log(taskButton);


	taskButton.addEventListener("click", function addTodo() {
		const input = document.querySelector("#todoInput");
		console.log("Input set to: " + input.value);
		if (input.value) {
			list.addTask(input.value);

			input.value = "";
		}

	});
};
