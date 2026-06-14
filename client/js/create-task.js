const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "index.html";
}

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
   CREATE TASK FUNCTION
========================= */
async function createTask() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;

    // Validation
    if (!title.trim()) {
        showToast("Task title is required", "error");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/tasks",
            {
                method: "POST",
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

            showToast("Task created successfully", "success");

            // Small delay before redirect (better UX)
            setTimeout(() => {
                window.location.href = "tasks.html";
            }, 1000);

        } else {

            showToast(data.message || "Failed to create task", "error");
        }

    } catch (error) {

        console.log(error);
        showToast("Something went wrong", "error");
    }
}

/* =========================
   LOGOUT
========================= */
function logout() {

    localStorage.removeItem("token");
    window.location.href = "index.html";
}