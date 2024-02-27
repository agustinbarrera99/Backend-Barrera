const registerButton = document.querySelector("#register")
const registerWithGoogle = document.querySelector("#registerWithGoogle")

registerButton.addEventListener("click", async (e) => {
    e.preventDefault()
    try {
        const data = {
            name: document.querySelector("#name").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
        }
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        let response = await fetch("/api/sessions/register", opts)
        response = await response.json()
        console.log(response)
        alert(response.message)
        if(response.message === "Registered!") {
            location.replace("/auth/login")
        }
    } catch (error) {
        alert(error.message)
    }
})

registerWithGoogle.addEventListener("click", async (e) => {
    e.preventDefault()
    try {
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
        let response = await fetch("/api/sessions/google", opts)
        response = await response.json()
    } catch (error) {
        alert(error.message)
    }
})


