// Listen for the 'DOMContentLoaded' event to ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn"); // "Add Task" button
  const taskInput = document.getElementById("task-input"); // Input field for tasks
  const taskList = document.getElementById("task-list"); // Unordered list to display tasks

  // Function to add a task
  function addTask() {
    // Retrieve and trim the value from the input field
    const taskText = taskInput.value.trim();

    // Check if the input is empty
    if (taskText === "") {
      alert("Please enter a task!"); // Alert user if input is empty
      return; // Exit the function if empty
    }

    // Create a new li element for the task
    const li = document.createElement("li");
    li.textContent = taskText; // Set the text content of the li

    // Create a remove button for the task
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove"; // Button text
    removeButton.className = "remove-btn"; // Assign class for styling

    // Attach an onclick event to the remove button
    removeButton.onclick = function () {
      taskList.removeChild(li); // Remove the li from the task list when clicked
    };

    // Append the remove button to the li element
    li.appendChild(removeButton);
    // Append the li to the task list
    taskList.appendChild(li);
    // Clear the input field
    taskInput.value = "";
  }

  // Attach event listener to the add button
  addButton.addEventListener("click", addTask);

  // Allow adding tasks with the "Enter" key
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      // Check if the pressed key is 'Enter'
      addTask(); // Call addTask function
    }
  });
});
