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

function renderTask(taskData) {
    const tableBody = document.querySelector("tbody");
    const tableRow = document.createElement('tr'); //create
    tableRow.setAttribute("class", "tr")
    tableRow.append(createCell(taskData.id, "taskDivId"), createCell(taskData.title, "taskDivTitle"), createCell(taskData.completed, "taskDivCompleted"), createCell(`<button onclick="deleteTask(${element.id})">Löschen</button>`, "taskDivDelete"));
    tableBody.appendChild(tableRow);
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

function findTask (taskData) {
    document.getElementsByTagName("tbody")[0].innerHTML = "";
    fetch("http://127.0.0.1:3000/task/" + taskData)
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

function checkLogged() {
    const elementWhenLoggedIn1 = document.getElementsByClassName("loggedIn")[0];
    const elementWhenLoggedIn2 = document.getElementsByClassName("loggedIn")[1];
    const elementWhenNotLoggedIn = document.getElementById("logindiv");
    fetch("http://127.0.0.1:3000/auth/cookie/status", {
        credentials: "include"
    })
    .then((response) => {
        if(response.status === 200) {
            elementWhenLoggedIn1.classList.remove("hidden");
            elementWhenLoggedIn2.classList.remove("hidden");
            elementWhenNotLoggedIn.classList.add("hidden");
        } else {
            elementWhenLoggedIn1.classList.add("hidden");
            elementWhenLoggedIn2.classList.add("hidden");
            elementWhenNotLoggedIn.classList.remove("hidden");
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    //index-------------------------------------
    indexTask();

    document.getElementById("ToDoListForm").addEventListener("submit", (event) => {
        event.preventDefault();
        findTask(document.getElementsByTagName("input")[0].value);
    });

    //login-------------------------------------
    checkLogged();

    document.getElementById("loginForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("eMailInput").value;
        const password = document.getElementById("passwordInput").value;
        const login = {email, password};

        fetch("http://127.0.0.1:3000/auth/cookie/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        }).then(checkLogged())
    })

    //delete-------------------------------------
    document.getElementById("deleteForm").addEventListener("submit", (event) => {
        event.preventDefault();
        deleteTask(document.getElementsByTagName("input")[2].value);
        window.location.reload();
    });

    //create-------------------------------------
    const titleInput = document.getElementById("titleInput");
    document.getElementById("createForm").addEventListener("submit", (event) => {
        event.preventDefault();
        createTask({title: titleInput.value});
        window.location.reload();
    });
});