var tasks = loadTasks();
var taskForm = document.getElementById("task-form");
var taskInput = document.getElementById("task-input");
var dueDateInput = document.getElementById("due-date");
var taskList = document.getElementById("task-list");
var emptyMessage = document.getElementById("empty-message");

// Get the element used to display the number of tasks.
var taskCount = document.getElementById("task-count");

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

// Update the task count displayed near the task-list heading.
function updateTaskCount() {
    var count = tasks.length;
    taskCount.textContent = count + (count === 1 ? " task" : " tasks");
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
updateTaskCount();
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
  updateTaskCount(); // Update count after deleting a task.
}

// Connect the form and render the saved tasks on page load.
function initializeApp() {
  taskForm.addEventListener("submit", addTask);
  renderTasks();
  updateTaskCount(); //show the correct count for saved tasks
}

initializeApp();