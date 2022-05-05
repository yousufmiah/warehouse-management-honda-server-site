const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5001;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yyoht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// ==========================
async function run() {
  try {
    await client.connect();
    const hondaCollection = client.db("honda").collection("items");

    // get from database
    app.get("/items", async (req, res) => {
      const query = {};
      const cursor = hondaCollection.find(query);
      const items = await cursor.toArray();
      res.send(items);
    });

    //POST to database
    app.post("/items", async (req, res) => {
      const newItem = req.body;
      const result = await hondaCollection.insertOne(newItem);
      // res.send(result);
      res.send("hello");
    });

    // delete from database
    app.delete("/item/:id", async (req, res) => {
      console.log(req.params);
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await hondaCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

console.log("all route ok");

//root api
app.get("/", (req, res) => {
  res.send("Running Honda App Server.");
});

//hero
app.get("/hero", (req, res) => {
  res.send("Meet with heroku");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
