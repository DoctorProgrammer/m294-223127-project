document.addEventListener("DOMContentLoaded", () => {
    //delete cookie here
    fetch("http://127.0.0.1:5500/auth/cookie/logout", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    window.location.href = "index.html";
})