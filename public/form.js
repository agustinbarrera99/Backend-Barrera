const socket = io();

console.log("form");

const submit = document.querySelector("#createProduct");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const titleInput = document.querySelector("#title");
  const title = titleInput.value;
  const priceInput = document.querySelector("#price");
  const price = priceInput.value;
  const stockInput = document.querySelector("#stock");
  const stock = stockInput.value;
  const photoInput = document.querySelector("#photo");
  const photo = photoInput.value;
  const data = { title, price, stock, photo };
  console.log(data);
  titleInput.value = "";
  priceInput.value = "";
  stockInput.value = "";
  photoInput.value = "";
  socket.emit("newProduct", data);
});
