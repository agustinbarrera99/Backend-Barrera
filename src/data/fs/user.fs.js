import fs from "fs"
import crypto from "crypto"
import notFoundOne from "../../utils/NotFoundOne.utils.js";

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

read({ filter, options }) {
  try {
    if (this.users.length === 0) {
      const error = new Error("NOT FOUND!");
      error.statusCode = 404;
      throw error;
    } else {
      return this.users;
    }
  } catch (error) {
    throw error;
  }
}

  async readOne(id) {
    try {
        const one = this.users.find(x => x._id === id)
        if (!one) {
            const error = new Error("user not found");
            notFoundError.statusCode = 404
            throw error
        } else {
            return one;
        }
    } catch (error) {
        console.error(error.message);
        throw error
    }
  }

  async readByEmail(email) {
    try {
      const one = this.users.find(x => x.email === email)
      if (!one) {
        return null
      } else {
        return one
      }
    } catch (error) {
      throw error
    }
  }

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one)
      this.users = this.users.filter(x => x._id !== id);
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(eid, data) {
    try {
      const one = this.readOne(eid);
      notFoundOne(one)
      for (let x in data) {
        one[x] = data[x]
      }
      const jsonData = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      return one;
    } catch (error) {
      throw error;
    }
  }
}


const user = new UserManager("./src/data/fs/files/users.json");

export default user