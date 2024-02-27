const button = document.querySelector("#createProduct")

button.addEventListener("click", async(e) => {
    try {
        e.preventDefault()
        const data = {
            title: document.querySelector("#title").value,
            price: document.querySelector("#price").value,
            stock: document.querySelector("#stock").value,
            photo: document.querySelector("#photo").value,
        }
        const opts = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        let response = await fetch("/api/products", opts)
        response = await response.json()
        console.log(response)
        alert(response.message)
        if (response.statusCode === 200) {
        }   
    } catch (error) {
        alert(error.message)
    }

})