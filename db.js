import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://fbeumont:1234@austral.2jmmok2.mongodb.net/?retryWrites=true&w=majority&appName=austral";

const client = new MongoClient(connectionString);

let db;
let conn;
  try {
    conn = await client.connect();
     db = conn.db("austral");
     }
  catch(e) {
    console.error(e);
    }


export default db;