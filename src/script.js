// src/script.js
const form = document.getElementById("form");

// Load tasks from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task));
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskName = document.getElementById("taskName").value;
  const taskDate = document.getElementById("taskDate").value;
  const categorySelect = form.querySelector("select");
  const category = categorySelect.value.toLowerCase();

  if (!taskName) return;

  const task = { name: taskName, date: taskDate, category };

  addTaskToDOM(task);
  saveTaskToStorage(task);

  form.reset();
});

// Function to create and append task to DOM
function addTaskToDOM(task) {
  const checkboxRow = document.createElement("div");
  checkboxRow.classList.add("checkbox-row");

  checkboxRow.innerHTML = `
    <input type="checkbox" />
    <div class="lable">
      <div>
        <label>${task.name}</label>
        <div>
          <span class="date">
            <p class="dueDate">${task.date ? task.date : ""}</p>
          </span>
        </div>
        <div>
          <button class="btn-delete" style="background: ${getColor(
            task.category
          )}; color: #f6ebe6">Delete</button>
        </div>
      </div>
    </div>
  `;

  // Append to the correct section
  let sectionId = "";
  if (task.category === "work") sectionId = "workSection";
  else if (task.category === "study") sectionId = "studySection";
  else if (task.category === "personal") sectionId = "personalSection";

  document.getElementById(sectionId).appendChild(checkboxRow);

  // Delete button functionality
  const deleteBtn = checkboxRow.querySelector(".btn-delete");
  deleteBtn.addEventListener("click", () => {
    checkboxRow.remove();
    removeTaskFromStorage(task);
  });
}

// Save task to localStorage
function saveTaskToStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTaskFromStorage(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(
    (task) =>
      !(
        task.name === taskToRemove.name &&
        task.date === taskToRemove.date &&
        task.category === taskToRemove.category
      )
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Helper function for colors
function getColor(category) {
  switch (category) {
    case "work":
      return "#f76b8a";
    case "study":
      return "#ef7537";
    case "personal":
      return "#cc0d7b";
    default:
      return "#61c0c0";
  }
}
