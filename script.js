// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Retrieve stored tasks from Local Storage
        storedTasks.forEach(taskText => addTask(taskText, false)); // Add each task without re-saving to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Remove the task when the remove button is clicked
        removeButton.onclick = function() {
            taskList.removeChild(li); // Remove the list item from the task list
            removeTaskFromStorage(taskText); // Update Local Storage
        };

        // Append the remove button to the li
        li.appendChild(removeButton);

        // Append the new task (li) to the task list
        taskList.appendChild(li);

        // If save is true, add the task to Local Storage
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Save a new task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get current tasks from Local Storage
        storedTasks.push(taskText); // Add new task
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save updated task list
    }

    // Remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get current tasks from Local Storage
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove the task from the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the updated list
    }

    // Event listener for the 'Add Task' button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim(); // Get input value and remove excess whitespace

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        addTask(taskText); // Add the task and save it to Local Storage
    });

    // Allow adding a task by pressing the Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim(); // Get input value

            if (taskText === '') {
                alert('Please enter a task.');
                return;
            }

            addTask(taskText); // Add the task and save it to Local Storage
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
