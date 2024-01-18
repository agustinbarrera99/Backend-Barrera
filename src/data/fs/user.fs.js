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
        throw error
    }
}

  async read() {
    try {
      const fileData = await fs.promises.readFile(this.path, "utf-8")
      const parsedData = JSON.parse(fileData)
      return parsedData
    } catch (error) {
      throw error
    }
  }
  async readOne(id) {
    try {
        const fileData = await fs.promises.readFile(this.path, "utf-8")
        const parsedData = JSON.parse(fileData)
        const one = parsedData.find(x => x.id === id)
        if (!one) {
            const notFoundError = new Error("user not found");
            notFoundError.statusCode = 400
            throw notFoundError
        } else {
            return one;
        }
    } catch (error) {
        console.error(error.message);
        throw error
    }
  }
  async destroy(id) {
    try {
      let one = this.users.find(x => x.id === id)
      if (!one) {
        const notIdError = new Error("there is not any user with id " + id)
        notIdError.statusCode = 400
        throw notIdError
      } else {
        this.users = this.users.filter(x => x.id !== id)
        const jsonData = JSON.stringify(this.users, null, 2)
        await fs.promises.writeFile(this.path, jsonData)
        return id 
      }
    } catch (error) {
      console.error(error.message)
      throw error
    }
  }
  async update(id, data) {
    try {
      let userToUpdateIndex = this.users.findIndex((user) => user.id === id);
      if (userToUpdateIndex === -1) {
        const notIdError = new Error(`there's not any user with id: ${id}`);
        notIdError.statusCode = 400
        throw notIdError
      }

      const { name, photo, email } = data;

      if (!name || !photo || !email || !/@/.test(email) || email.length < 4) {
        const notFieldComplete = new Error("enter all fields correctly");
        notFieldComplete.statusCode = 400
        throw notFieldComplete
      }

      const emailExists = this.users.some(
        (user) => user.email === email && user.id !== id
      );
      if (emailExists) {
        const emailExistsError = new Error("the email is already used by other user");
        emailExistsError.statusCode = 400
        throw emailExistsError
      }
      this.users[userToUpdateIndex].id = id
      this.users[userToUpdateIndex].name = name;
      this.users[userToUpdateIndex].photo = photo;
      this.users[userToUpdateIndex].email = email;

      await fs.promises.writeFile(this.path, JSON.stringify(this.users, null, 2));
      
      return this.users[userToUpdateIndex];
    } catch (error) {
      console.error(error.message);
      throw error
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