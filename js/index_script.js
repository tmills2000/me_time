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
	#title;
	#checkBox;
	#deleteBtn;
	#drawerToggle;
	#index;
	#drawer;


	constructor(text, taskList) {

		// Assign the parent Node (Task List Object)
		this.#taskList = taskList;

		// Create the HTML elements
		this.#createHeader();
		this.#createDrawer();

		// Create a wrapper div to house all the elements and assign the children.
		this.#taskWrapper = document.createElement('div');
		this.#taskWrapper.setAttribute('class', 'task-content-wrapper');
		this.#taskWrapper.appendChild(this.#taskHeader);
		this.#taskWrapper.appendChild(this.#drawer);

	}

	/* 
	/ ------------------------------------
	/ Start Setters and Getters
	/ ------------------------------------
	*/
	setIndex(index) {
		this.#index = index;
	}

	getIndex() {
		return this.#index;
	}

	setText(text) {
		this.#title.textContent = text;
	}

	getText() {
		return this.#title.textContent;
	}

	getWrapper(){
		return this.#taskWrapper;
	}

	/*
	/ ------------------------------------
	/ Start event listener action methods.
	/ ------------------------------------
	*/
	#todoChecked(done) {
		this.isDone = done;
		this.#taskList.moveTask(this);

		// Change Styling?? Or should CSS take care of this when the task is moved to the other list?
	}

	#deleteClicked() {
		this.#taskList.deleteTask(this);
	}

	#toggleDrawer() {
		this.#drawer.classList.toggle('drawer-open');
		this.#drawerToggle.classList.toggle('drawer-open');
	}

	/*
	/ ------------------------------------
	/ Start initilizer methods.
	/ ------------------------------------
	*/
	#createHeader() {
		this.#title = document.createElement('p');
		this.#title.setAttribute('class', 'todo-title');
		this.setText(text);

		this.#checkBox = document.createElement('input');
		this.#checkBox.setAttribute('type', 'checkbox');
		this.#checkBox.setAttribute('class', 'todo-checkbox');
		this.#checkBox.addEventListener('click', () => this.#todoChecked(this.#checkBox.checked));

		this.#drawerToggle = document.createElement('button');
		this.#drawerToggle.setAttribute('type', 'button');
		this.#drawerToggle.setAttribute('class', 'expand-drawer-button');
		this.#drawerToggle.addEventListener('click', () => this.#toggleDrawer());

		this.#taskHeader = document.createElement('div');
		this.#taskHeader.setAttribute('class', 'task-header');
		this.#taskHeader.appendChild(this.#checkBox);
		this.#taskHeader.appendChild(this.#title);
		this.#taskHeader.appendChild(this.#drawerToggle);
	}

	#createDrawer() {
		this.#deleteBtn = document.createElement('button');
		this.#deleteBtn.setAttribute('type', 'button');
		this.#deleteBtn.setAttribute('class', 'task-delete-button');
		this.#deleteBtn.addEventListener('click', () => this.#deleteClicked());

		this.#drawer = document.createElement('div');
		this.#drawer.setAttribute('class', 'task-drawer');
		this.#drawer.appendChild(this.#deleteBtn);
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
