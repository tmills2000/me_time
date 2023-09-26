class TaskList {

	#todoArr = new Array();
	#doneArr = new Array();

	constructor() {
		this.todoList = document.querySelector('#todoList');
		this.doneList = document.querySelector('#doneList');
	}

	addTask(text) {
		const task = new Task(text, this);
		this.todoList.appendChild(task.getWrapper());
		this.#todoArr += task;

		console.log("Adding new task \"" + text + "\" to todo list");

		task.setIndex(this.#todoArr.length - 1);
	}

	moveTask(task) {
		let taskWrapper = task.getWrapper();

		console.log("Task: \"" + task.getText() + "\" is marked done: " + task.isDone);

		if (task.isDone) {
			this.todoList.removeChild(taskWrapper);
			this.doneList.appendChild(taskWrapper);
		} else {
			this.doneList.removeChild(taskWrapper);
			this.todoList.appendChild(taskWrapper);
		}
	}

	deleteTask(task) {
		let taskWrapper = task.getWrapper();

		if (task.isDone) {
			this.doneList.removeChild(taskWrapper);
		} else {
			this.todoList.removeChild(taskWrapper);
		}
	}

}


class Task {

	isDone = false;

	#taskList;
	#taskWrapper;
	#taskHeader;
	#item;
	#checkBox;
	#deleteBtn;
	#index;
	#drawer;


	constructor(text, taskList) {

		this.#taskList = taskList;

		this.#item = document.createElement('button');
		this.#item.setAttribute('class', 'todo-text');
		this.setText(text);
		this.#item.addEventListener('click', () => {
			this.#item.parentNode.nextElementSibling.classList.toggle('drawer-open');
		});

		this.#checkBox = document.createElement('input');
		this.#checkBox.setAttribute('type', 'checkbox');
		this.#checkBox.setAttribute('class', 'todo-checkbox');
		this.#checkBox.addEventListener('click', () => this.#todoChecked(this.#checkBox.checked));

		this.#deleteBtn = document.createElement('button');
		this.#deleteBtn.setAttribute('type', 'button');
		this.#deleteBtn.setAttribute('class', 'task-delete-button');
		this.#deleteBtn.addEventListener('click', () => this.#deleteClicked());

		this.#taskHeader = document.createElement('div');
		this.#taskHeader.setAttribute('class', 'task-header');
		this.#taskHeader.appendChild(this.#checkBox);
		this.#taskHeader.appendChild(this.#item);
		this.#taskHeader.appendChild(this.#deleteBtn);
	
		this.#drawer = document.createElement('div');
		this.#drawer.setAttribute('class', 'task-drawer');

		this.#taskWrapper = document.createElement('div');
		this.#taskWrapper.setAttribute('class', 'task-content-wrapper');
		this.#taskWrapper.appendChild(this.#taskHeader);
		this.#taskWrapper.appendChild(this.#drawer);

	}

	setIndex(index) {
		this.#index = index;
	}

	getIndex() {
		return this.#index;
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
		this.isDone = done;
		this.#taskList.moveTask(this);

		// Change Styling?? Or should CSS take care of this when the task is moved to the other list?
	}

	#deleteClicked() {
		this.#taskList.deleteTask(this);
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
