const selectors = document.querySelectorAll(".deleteButton");
selectors.forEach((x) =>
  x.addEventListener("click", async (e) => {
    console.log(e.target);
    try {
      const url = "/api/orders/" + e.target.id;
      const opts = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch(url, opts);
      response = await response.json();
      console.log(response);
      if (response.statusCode === 200) {
        alert(response.message);
        location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  })
);
