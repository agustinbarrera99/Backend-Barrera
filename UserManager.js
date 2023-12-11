class UserManager {
    static #users = []; 
    constructor() {}

    create(data) {
        try {
            const {name, photo, email} = data
            if (!name || !photo || !email || !/@/.test(email) || email.length < 4) {
                throw new Error("ingrese todos los datos de manera correcta")
            }
            const user = {
                id: UserManager.#users.length === 0 ? 1 : UserManager.#users[UserManager.#users.length - 1].id + 1,
                name,
                photo,
                email
            };
            UserManager.#users.push(user)
            return user
        } catch (error) {
            return console.error(error.message)
        }
    }
    read() {
        try {
            if(UserManager.#users.length < 1) {
                throw new Error("Aun no hay ningun usuario registrado")
            }
            return console.log(UserManager.#users)
        } catch (error) {
            return console.error(error.message)
        }
    }
    readOne(id) {
        try {
            let one = UserManager.#users.find(x => x.id === (id))
            if (one) {
                return console.log(one)
            }
            throw new Error("Usuario no encontrado")
        } catch (error) {
            return console.error(error.message)
        }
    }
}

const users = new UserManager();

users.create({name: "agustin", photo: "url", email: "m@m"})
users.create({name:"Lucas", photo: "url", email: "mail@mail"})
users.create({name: "juan", photo:"url", email: "segundo@mail"})

users.read()
users.readOne(2)




