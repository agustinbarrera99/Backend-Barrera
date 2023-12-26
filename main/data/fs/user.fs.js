import fs from "fs"
import crypto from "crypto"

class UserManager {
  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
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
        id:crypto.randomBytes(12).toString("hex"),
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
  async read() {
    try {
      const fileData = await fs.promises.readFile(this.path, "utf-8")
      const parsedData = JSON.parse(fileData)
      return parsedData
    } catch (error) {
      error.message;
    }
  }
  async readOne(id) {
    try {
        const fileData = await fs.promises.readFile(this.path, "utf-8")
        const parsedData = JSON.parse(fileData)
        const one = parsedData.find(x => x.id === id)
        if (!one) {
            throw new Error("user not found");
        } else {
            return one;
        }
    } catch (error) {
        console.error(error.message);
        return error.message;
    }
  }
  async destroy(id) {
    try {
      let one = this.users.find(x => x.id === id)
      if (!one) {
        throw new Error("there is not any user with id " + id)
      } else {
        this.users = this.users.filter(x => x.id !== id)
        const jsonData = JSON.stringify(this.users, null, 2)
        await fs.promises.writeFile(this.path, jsonData)
        return id 
      }
    } catch (error) {
      console.error(error.message)
      return error.message
    }
  }
}

const user = new UserManager("./main/data/fs/files/users.json");

user.destroy("27072f13f0e838e8f456630b")

export default user