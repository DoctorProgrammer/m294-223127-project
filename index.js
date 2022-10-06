function createCell(text, classname) {
    const cell = document.createElement('div');
    cell.setAttribute("class", classname);
    const p = document.createElement('p');
    p.innerHTML = text;
    cell.appendChild(p);
    return cell;
}

function renderTasks(taskData) {
    const tableBody = document.querySelector("tbody");
    taskData.forEach(element => {
        const tableRow = document.createElement('tr'); //create
        tableRow.setAttribute("class", "tr")
        tableRow.append(createCell(element.id, "taskDivId"), createCell(element.title, "taskDivTitle"), createCell(element.completed, "taskDivCompleted"));
        tableBody.appendChild(tableRow);
    });
}

function renderTask(taskData) {
    const tableBody = document.querySelector("tbody");
    const tableRow = document.createElement('tr'); //create
    tableRow.setAttribute("class", "tr")
    tableRow.append(createCell(taskData.id, "taskDivId"), createCell(taskData.title, "taskDivTitle"), createCell(taskData.completed, "taskDivCompleted"));
    tableBody.appendChild(tableRow);
}

function indexTask () {
    document.getElementsByTagName("tbody")[0].innerHTML = "";
    fetch("http://localhost:3000/tasks")
    .then((response) => response.json())
    .then((data) => {
        let taskData = data;
        return renderTasks(taskData);
    })
}

function findTask (taskData) {
    document.getElementsByTagName("tbody")[0].innerHTML = "";
    fetch("http://localhost:3000/task/" + taskData)
    .then((response) => {
        const identifierInput = document.getElementById('identifierInput');
        if(response.status === 404) {
            alert("Error: 404\nDiese Aufgaben-ID existiert nicht!");
            identifierInput.style.borderColor = "red";
        } else {
            identifierInput.style.borderColor = "inherit";
        }
        return response.json();
    })
    .then((data) => {
        taskData = data;
        return renderTask(taskData);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    indexTask();

    const ToDoListForm = document.getElementById("ToDoListForm");
    ToDoListForm.addEventListener("submit", (event) => {
        event.preventDefault();
        findTask(document.getElementsByTagName("input")[0].value);
    });
});