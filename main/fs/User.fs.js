const fs = require("fs");

class UserManager {
  constructor(path) {
    this.users = [];
    this.init();
    this.path = path;
  }
  init() {
    const fileExists = fs.existsSync(this.path);
    if (fileExists) {
      const fileData = fs.readFileSync(this.path, "utf-8");
      if (fileData.trim() !== "") {
        this.users = JSON.parse(fileData);
      }
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }
  create(data) {
    try {
      const { name, photo, email } = data;
      if (!name || !photo || !email || !/@/.test(email) || email.length < 4) {
        throw new Error("Ingrese todos los datos de manera correcta");
      }
      const emailExists = this.users.some((user) => user.email === email);
      if (emailExists) {
        throw new Error("El correo electrónico ya está registrado");
      }
      const user = {
        id:
          this.users.length === 0
            ? 1
            : this.users[this.users.length - 1].id + 1,
        name,
        photo,
        email,
      };
      this.users.push(user);
      fs.writeFileSync(this.path, JSON.stringify(this.users, null, 2));
    } catch (error) {
      console.error(error.message);
    }
  }
  read() {
    return fs.promises
      .readFile(this.path, "utf-8")
      .then((res) => {
        const parsedData = JSON.parse(res);
        console.log(parsedData);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
  readOne(id) {
    return fs.promises
      .readFile(this.path, "utf-8")
      .then((res) => {
        const parsedData = JSON.parse(res);
        const one = parsedData.find((x) => x.id === id);
        if (!one) {
          throw new Error("Usuario no encontrado");
        }
        console.log(one);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

const user = new UserManager("./main/fs/data/users.json");

user.create({ name: "juan", photo: "url", email: "agustin@mail" });

user.read(2);

user.readOne(15);
