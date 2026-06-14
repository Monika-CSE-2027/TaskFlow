const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

document.getElementById("todayDate").innerText =
new Date().toDateString();

async function loadDashboard() {

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

        document.getElementById("totalTasks").innerText =
            tasks.length;

        document.getElementById("pendingTasks").innerText =
            tasks.filter(
                task => task.status === "Pending"
            ).length;

        document.getElementById("progressTasks").innerText =
            tasks.filter(
                task => task.status === "In Progress"
            ).length;

        document.getElementById("completedTasks").innerText =
            tasks.filter(
                task => task.status === "Completed"
            ).length;

        const recentTasks =
            document.getElementById("recentTasks");

        recentTasks.innerHTML = "";

        tasks
            .slice(0, 2)
            .forEach(task => {

                recentTasks.innerHTML += `
                <tr>
                    <td>${task.title}</td>
                    <td>${task.description || "-"}</td>
                    <td>${task.status}</td>
                </tr>
                `;
            });

    } catch (error) {

        console.log(error);

    }

}

function logout() {

    localStorage.removeItem("token");

    window.location.href = "index.html";

}

loadDashboard();