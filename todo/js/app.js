var tasks = loadTasks();
var taskForm = document.getElementById("task-form");
var taskInput = document.getElementById("task-input");
var dueDateInput = document.getElementById("due-date");
var taskList = document.getElementById("task-list");
var emptyMessage = document.getElementById("empty-message");

// Build one list item for a task.
function createTaskElement(task, index) {
  var item = document.createElement("li");
  var text = document.createElement("button");
  var deleteButton = document.createElement("button");
  item.className = "task-item";
  text.className = "task-text" + (task.completed ? " completed" : "");
  text.textContent = task.dueDate
  ? task.text + " — Due: " + task.dueDate
  : task.text;
  if (task.dueDate) {
  var today = new Date().toISOString().split("T")[0];

  if (task.dueDate < today) {
    text.style.color = "red";
  }
}
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
var dueDate = dueDateInput.value;

if (!taskText) { return; }

tasks.push({
  text: taskText,
  completed: false,
  dueDate: dueDate
});
  saveTasks(tasks);
 taskInput.value = "";
dueDateInput.value = "";
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

// Connect the form and render the saved tasks on page load.
function initializeApp() {
  taskForm.addEventListener("submit", addTask);
  renderTasks();
}

initializeApp();