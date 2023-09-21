class TaskList {
	constructor() {
		this.taskList = document.querySelector('#todoList');
		this.doneList = document.querySelector('#doneList');
	}

	addTask(text) {
		this.task = new Task(text);
		this.taskList.appendChild(this.task);

		console.log("Adding new task \"" + text + "\" to todo list");
	}

	moveTask(task, taskDone) {
		console.log("Task: \"" + task + "\" is marked done: " + taskDone);

		if (taskDone) {
			this.taskList.removeChild(task);
			this.doneList.appendChild(task);
		} else {
			this.taskList.appendChild(task);
			this.doneList.removeChild(task);
		}
	}

	deleteTask(task) {
		// Does any of this work???
		// this.list = task.getParent();
		// this.list.removeChild(task);
	}

}


class Task {

	constructor(text) {

		this.item = document.createElement('li');
		this.item.setAttribute('class', 'todo-item');
		this.item.textContent = text;

		this.checkBox = document.createElement('input');
		this.checkBox.setAttribute('type', 'checkbox');
		this.checkBox.setAttribute('class', 'todoCheckBox');
		this.checkBox.addEventListener('click', () => {
			this.moveTask(this.wrapper,
			this.checkBox.checked);
		});
	
		this.wrapper = document.createElement('div');
		this.wrapper.appendChild(this.checkBox);
		this.wrapper.appendChild(this.item);

	
		return this.wrapper;


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
