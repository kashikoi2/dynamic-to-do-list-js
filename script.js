// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            // The first child of li is text, before the Remove button
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If called without text (e.g., button click), get from input
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Remove task on click
        removeButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Update Local Storage after removal
        };

        // Append button to li, then li to task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";

        // Save to Local Storage if needed
        if (save) {
            saveTasks();
        }
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when page starts
    loadTasks();
});
