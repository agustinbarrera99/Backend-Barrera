import fs from "fs";
import logger from "../../utils/logger/index.js";
import UserDTO from "../../dto/users.dto.js";
import CustomError from "../../utils/errors/CustomError.util.js";
import errors from "../../utils/errors/errors.js";

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
      data = new UserDTO(data);
      this.users.push(data);
      await this.saveUsers();
      return data;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async read({ filter = {}, options = {} } = {}) {
    try {
      if (this.users.length === 0) {
        throw CustomError.new(errors.notFound);
      }

      let filteredUsers = this.users;

      if (filter.email) {
        filteredUsers = filteredUsers.filter(user =>
          new RegExp(filter.email, "i").test(user.email)
        );
      }

      const { limit = 10, page = 1, sort = {} } = options;
      let paginatedUsers = filteredUsers;

      if (sort.title) {
        const sortOrder = sort.title === "asc" ? 1 : -1;
        paginatedUsers = paginatedUsers.sort((a, b) => {
          if (a.title < b.title) return -1 * sortOrder;
          if (a.title > b.title) return 1 * sortOrder;
          return 0;
        });
      }

      const total = paginatedUsers.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const results = paginatedUsers.slice(startIndex, endIndex);

      return {
        docs: results,
        totalDocs: total,
        limit: limit,
        page: page,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      };
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = this.users.find((x) => x._id === id);
      if (!one) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = this.users.find((x) => x.email === email);
      return one || null;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.readOne(id);
      if (!one) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      this.users = this.users.filter((x) => x._id !== id);
      await this.saveUsers();
      return one;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const one = await this.readOne(id);
      if (!one) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      Object.assign(one, data);
      await this.saveUsers();
      return one;
    } catch (error) {
      logger.ERROR(error.message);
      throw error;
    }
  }

  async saveUsers() {
    const jsonData = JSON.stringify(this.users, null, 2);
    await fs.promises.writeFile(this.path, jsonData);
  }
}

const user = new UserManager("./src/data/fs/files/users.json");
export default user;