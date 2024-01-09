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
  async create(data) {
    try {
        const { name, photo, email } = data;
        if (!name || !photo || !email) {
            throw new Error("Please provide name, photo, and email");
        }
        if (!/@/.test(email) || email.length < 4) {
            throw new Error("Please provide a valid email address");
        }

        const emailExists = this.users.some((user) => user.email === email);
        if (emailExists) {
            throw new Error("The email is already registered");
        }

        const newUser = {
            id: crypto.randomBytes(12).toString("hex"),
            name,
            photo,
            email,
        };

        this.users.push(newUser);
        fs.writeFileSync(this.path, JSON.stringify(this.users, null, 2));

        return newUser;
    } catch (error) {
        console.error(error.message);
        return error;
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
  async update(id, data) {
    try {
      let userToUpdateIndex = this.users.findIndex((user) => user.id === id);
      if (userToUpdateIndex === -1) {
        throw new Error(`there's not any user with id: ${id}`);
      }

      const { name, photo, email } = data;

      if (!name || !photo || !email || !/@/.test(email) || email.length < 4) {
        throw new Error("enter all fields correctly");
      }

      const emailExists = this.users.some(
        (user) => user.email === email && user.id !== id
      );
      if (emailExists) {
        throw new Error("the email is already used by other user");
      }
      this.users[userToUpdateIndex].id = id
      this.users[userToUpdateIndex].name = name;
      this.users[userToUpdateIndex].photo = photo;
      this.users[userToUpdateIndex].email = email;

      await fs.promises.writeFile(this.path, JSON.stringify(this.users, null, 2));
      
      return this.users[userToUpdateIndex];
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
}


const user = new UserManager("./src/data/fs/files/users.json");

// user.create({
//   name: "lucas",
//   photo: "url",
//   email: "lucas@mail"
// })

export default user