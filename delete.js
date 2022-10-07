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
        tableRow.append(createCell(element.id, "taskDivId"), createCell(element.title, "taskDivTitle"), createCell(element.completed, "taskDivCompleted"), createCell(`<button onclick="deleteTask(${element.id})">Löschen</button>`, "taskDivDelete"));
        tableBody.appendChild(tableRow);
    });
}

function indexTask () {
    document.getElementsByTagName("tbody")[0].innerHTML = "";
    fetch("http://127.0.0.1:3000/tasks")
    .then((response) => response.json())
    .then((data) => {
        let taskData = data;
        return renderTasks(taskData);
    })
}

function createTask (task) {
    fetch("http://127.0.0.1:3000/tasks", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    }).then()
}

function deleteTask (task) {
    fetch("http://127.0.0.1:3000/task/" + task, {
        credentials: "include",
        method: "Delete"
    }) .then(window.location.reload())
}

document.addEventListener("DOMContentLoaded", () => {
    indexTask();
    document.getElementById("deleteForm").addEventListener("submit", (event) => {
        event.preventDefault();
        deleteTask(document.getElementsByTagName("input")[0].value);
        window.location.reload();
    });
})