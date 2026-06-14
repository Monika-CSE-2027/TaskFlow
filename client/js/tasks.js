const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

let allTasks = [];

async function loadTasks() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/tasks",
            {
                headers: {
                    Authorization: token
                }
            }
        );

        const tasks = await response.json();

        allTasks = tasks;

        displayTasks(tasks);

    } catch (error) {

        console.log(error);

    }

}

function displayTasks(tasks) {

    const table =
        document.getElementById("taskTable");

    table.innerHTML = "";

    tasks.forEach(task => {

        table.innerHTML += `
        <tr>

            <td>${task.title}</td>

            <td>
                ${task.description || "-"}
            </td>

            <td>
                ${task.status}
            </td>

            <td>

                <button
                class="btn"
                onclick="editTask('${task._id}')">

                Edit

                </button>

                <button
                class="btn"
                onclick="deleteTask('${task._id}')">

                Delete

                </button>

            </td>

        </tr>
        `;

    });

}

function searchTasks() {

    const searchText =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    const filteredTasks =
    allTasks.filter(task =>

        task.title
        .toLowerCase()
        .includes(searchText)

    );

    displayTasks(filteredTasks);

}

function editTask(id) {

    window.location.href =
    `edit-task.html?id=${id}`;

}

async function deleteTask(id) {

    const confirmDelete =
    confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {

        await fetch(
            `http://localhost:5000/api/tasks/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: token
                }
            }
        );

        loadTasks();

    } catch (error) {

        console.log(error);

    }

}

function logout() {

    localStorage.removeItem("token");

    window.location.href =
    "index.html";

}

loadTasks();