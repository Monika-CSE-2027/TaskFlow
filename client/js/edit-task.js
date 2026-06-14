const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

/* =========================
   GET TASK ID FROM URL
========================= */
const params = new URLSearchParams(window.location.search);
const taskId = params.get("id");

/* =========================
   TOAST NOTIFICATION
========================= */
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.innerText = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

/* =========================
   LOAD TASK
========================= */
async function loadTask() {

    if (!taskId) {
        showToast("Task ID not found", "error");
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/tasks/${taskId}`,
            {
                headers: {
                    Authorization: token
                }
            }
        );

        const task = await response.json();

        document.getElementById("title").value = task.title;
        document.getElementById("description").value = task.description || "";
        document.getElementById("status").value = task.status;

    } catch (error) {
        console.log(error);
        showToast("Failed to load task", "error");
    }
}

/* =========================
   UPDATE TASK
========================= */
async function updateTask() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;

    if (!title.trim()) {
        showToast("Task title is required", "error");
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/tasks/${taskId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify({
                    title,
                    description,
                    status
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            showToast("Task updated successfully", "success");

            setTimeout(() => {
                window.location.href = "tasks.html";
            }, 1000);

        } else {
            showToast(data.message || "Update failed", "error");
        }

    } catch (error) {
        console.log(error);
        showToast("Server error", "error");
    }
}

/* =========================
   LOGOUT
========================= */
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

/* =========================
   INIT
========================= */
loadTask();