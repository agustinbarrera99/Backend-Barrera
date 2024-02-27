document.addEventListener("DOMContentLoaded", function () {
  const soBtn = document.querySelector("#signout");

  if (soBtn) {
    soBtn.addEventListener("click", async () => {
      try {
        const opt = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };
        let response = await fetch("/api/sessions/signout", opt);
        response = await response.json();
        if (response.statusCode === 200) {
          alert(response.message);
          location.replace("/");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
});
