var tasks = loadTasks();
var taskForm = document.getElementById("task-form");
var taskInput = document.getElementById("task-input");
var taskList = document.getElementById("task-list");
var emptyMessage = document.getElementById("empty-message");
var clearCompletedButton = document.getElementById("clear-completed");

// Build one list item for a task.
function createTaskElement(task, index) {
  var item = document.createElement("li");
  var text = document.createElement("button");
  var deleteButton = document.createElement("button");
  item.className = "task-item";
  text.className = "task-text" + (task.completed ? " completed" : "");
  text.textContent = task.text;
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";
  text.addEventListener("click", function () { toggleTask(index); });
  deleteButton.addEventListener("click", function () { deleteTask(index); });
  item.append(text, deleteButton);
  return item;
}

// Draw all tasks and show the empty state when needed.
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    taskList.appendChild(createTaskElement(task, index));
  });
  emptyMessage.hidden = tasks.length > 0;
}

// Add a new task from the form input.
function addTask(event) {
  event.preventDefault();
  var taskText = taskInput.value.trim();
  if (!taskText) { return; }
  tasks.push({ text: taskText, completed: false });
  saveTasks(tasks);
  taskInput.value = "";
  renderTasks();
  taskInput.focus();
}

// Toggle whether a task is complete.
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

// Delete one task and save the updated list.
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

// Remove all completed tasks and save the updated list.
function clearCompletedTasks() {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });
  saveTasks(tasks);
  renderTasks();
}

// Connect the form and render the saved tasks on page load.
function initializeApp() {
  taskForm.addEventListener("submit", addTask);
  clearCompletedButton.addEventListener("click", clearCompletedTasks);
  renderTasks();
}

initializeApp();