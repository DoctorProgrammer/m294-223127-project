function deleteTask (task) {
    fetch("http://localhost:3000/task/" + task, {
        credentials: "include",
        method: "Delete"
    }) .then(window.location.reload())
}

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

function indexTask () {
    document.getElementsByTagName("tbody")[0].innerHTML = "";
    fetch("http://localhost:3000/tasks")
    .then((response) => response.json())
    .then((data) => {
        let taskData = data;
        return renderTasks(taskData);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const identifierInput = document.getElementById("deleteForm");
    identifierInput.addEventListener("submit", (event) => {
        event.preventDefault();
        deleteTask(document.getElementsByTagName("input")[2].value);
        window.location.reload();
    });
});