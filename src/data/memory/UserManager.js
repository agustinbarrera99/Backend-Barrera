import logger from "../../utils/logger/index.js"

class UserManager {
  static #users = [];
  constructor() {}

  create(data) {
    try {
      const { name, photo, email } = data;
      if (!name || !photo || !email || !/@/.test(email) || email.length < 4) {
        throw new Error("complete all the fields correctly");
      }
      const user = {
        id:
          UserManager.#users.length === 0
            ? 1
            : UserManager.#users[UserManager.#users.length - 1].id + 1,
        name,
        photo,
        email,
      };
      UserManager.#users.push(user);
      return user;
    } catch (error) {
      return logger.ERROR(error.message);
    }
  }
  read() {
    try {
      if (UserManager.#users.length < 1) {
        throw new Error("there is not any user registered");
      }
      UserManager.#users;
    } catch (error) {
      return logger.ERROR(error.message);
    }
  }
  readOne(id) {
    try {
      let one = UserManager.#users.find((x) => x.id === id);
      if (one) {
        return one;
      }
      throw new Error("user not found");
    } catch (error) {
      return logger.ERROR(error.message);
    }
  }
  update(id, data) {
    try {
      let userToUpdateIndex = UserManager.#users.findIndex((user) => user.id === id);
      if (userToUpdateIndex === -1) {
        throw new Error(`There is not any user with id: ${id}`);
      }

      const { name, photo, email } = data;

      if (!name && !photo && !email) {
        throw new Error("Complete at least one field to update");
      }

      if (name) {
        UserManager.#users[userToUpdateIndex].name = name;
      }

      if (photo) {
        UserManager.#users[userToUpdateIndex].photo = photo;
      }

      if (email) {
        UserManager.#users[userToUpdateIndex].email = email;
      }

      return UserManager.#users[userToUpdateIndex];
    } catch (error) {
      logger.ERROR(error.message);
      return error.message;
    }
  }
  destroy(id) {
    try {
      const initialLength = UserManager.#users.length;
      UserManager.#users = UserManager.#users.filter((user) => user.id !== id);
      
      if (initialLength === UserManager.#users.length) {
        throw new Error(`There is not any user with id: ${id}`);
      }

      return `User with id ${id} has been deleted successfully`;
    } catch (error) {
      logger.ERROR(error.message);
      return error.message;
    }
  }
}

const users = new UserManager();


