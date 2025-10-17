// login.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get input values
    const identifier = document.getElementById("identifier").value.trim();
    const password = document.getElementById("password").value.trim();

    // Simple frontend validation
    if (!identifier || !password) {
        alert("Please fill in both fields.");
        return;
    }

    try {
        // Send login request to backend
        const response = await fetch("http://localhost:3000/login/loginUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save token and role to localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);

            // Redirect based on role
            switch (data.user.role) {
                case "passenger":
                    window.location.href = "passengerhome.html";
                    break;
                case "driver":
                    window.location.href = "driverhome.html";
                    break;
                default:
                    alert("Unknown user role!");
            }
        } else {
            alert(data.message || "Login failed. Check your credentials.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Server error. Please try again later.");
    }
});
