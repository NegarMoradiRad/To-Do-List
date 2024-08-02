document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    addTaskToDOM(taskText, false);
    saveTaskToLocalStorage(taskText, false);
    taskInput.value = '';
}

function addTaskToDOM(taskText, completed) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        updateTaskStatusInLocalStorage(taskText, checkbox.checked);
    });

    if (completed) {
        li.classList.add('completed');
    }

    li.textContent = taskText;
    li.prepend(checkbox);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'حذف';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        removeTaskFromLocalStorage(taskText);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTaskToLocalStorage(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatusInLocalStorage(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task =>
        task.text === taskText ? { ...task, completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function removeTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
