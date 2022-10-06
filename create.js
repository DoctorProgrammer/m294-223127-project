function createCell(text, classname) {
    const cell = document.createElement('div');
    cell.setAttribute("class", classname);
    const p = document.createElement('p');
    p.innerText = text;
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
        taskData = data;
        return renderTasks(taskData);
    })
}

function createTask (task) {
    fetch("http://localhost:3000/tasks", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    }).then()
}

document.addEventListener("DOMContentLoaded", () => {
    const titleInput = document.getElementById("titleInput");
    createForm.addEventListener("submit", (event) => {
        event.preventDefault();
        createTask({title: titleInput.value});
        window.location.reload();
    });
});