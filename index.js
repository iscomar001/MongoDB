const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";

class UsersDAO {
  

    constructor() {
        this.client = new MongoClient(uri);
        this.database = this.client.db('TESTDB');
        this.usuarios = this.database.collection('usuarios');
    }

    run = async () => {
        try {
            //await this.addUser({ nombre: 'OMAR', edad: 25 });
            const users = await this.listUsers();
            users.forEach(user => {
                console.dir(user);
            });            
            //const user = await this.getUser({ nombre: 'OMAR' });
            //console.log(user);
        } catch (e) {
            console.error(e);
        } 
    }

    getUser = async (query) => {
        try {
            await this.connect();
            const user = await this.usuarios.findOne(query);
            return user;
        }catch (e) {
            console.error(e.message);
        } finally {
            await this.client.close();
        }
    }

    listUsers = async (query) => {
        try {
            await this.connect();
            const findResult = this.usuarios.find(query);
            const users = await findResult.toArray();
            return users;
        }catch (e) {
            console.error(e.message);
        } finally {
            await this.client.close();
        }
    }

    addUser = async (user) => {
        try {
            await this.usuarios.insertOne(user);
            console.log('usuario agregado');
        } finally {
            // Ensures that the client will close when you finish/error
            await this.client.close();
        }
    }

    async connect() {
        try {
            await this.client.connect();            
        } catch (error) {
            console.error("Connect error". error.error);            
            throw error;
        }
    }

    async disconnect() {
        try {
            await this.client.disconnect();
        } catch (error) {
            console.error("Disconnect error". error.error);            
            throw error;
        }
    }

}

new UsersDAO().run();
