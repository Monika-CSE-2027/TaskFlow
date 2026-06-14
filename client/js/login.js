function showMessage(message, type) {
    const msg = document.getElementById("loginMsg");

    msg.innerText = message;
    msg.className = `login-msg ${type}`;
}

async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // validation
    if (!email || !password) {
        showMessage("Please fill all fields", "error");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        // ❌ ERROR CASE
        if (!response.ok) {
            showMessage(data.message || "Login failed", "error");
            return;   // STOP HERE
        }

        // ✅ SUCCESS CASE
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";

    } catch (error) {
        console.log(error);
        showMessage("Server error", "error");
    }
}