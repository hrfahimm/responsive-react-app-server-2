const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
//const ObjectId = require("mongodb").ObjectId();

const port =process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ditclil.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function run() {
  try {
    //await client.connect();
    console.log("connected to MongoDB!");
    const database = client.db("carMechanic");
    const servicesCollection = database.collection("services");

    //get api
    app.get("/services", async (req, res) => {
      const cursore = servicesCollection.find({});
      const services = await cursore.toArray();
      res.send(services);
    });
    //get single services
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      //const query = { _id: ObjectId(id) };
      const query = { _id: id };
      const service = await servicesCollection.findOne(query);
      res.json(service);
    });
    //post api
    app.post("/services", async (req, res) => {
      const service = req.body;
      console.log("hit post api", service);
      const result = await servicesCollection.insertOne(service);
      console.log(result);
      res.json(result);
    });

    //delete
    app.delete("/service/:id", async (req, res) => {
      const id = req.params.id;
      const quary = { _id: ObjectId(id) };
      const result = await servicesCollection.deleteOne(quary);
      res.json(result);
    });
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("running ginius server");
});

app.listen(port, () => {
  console.log(port);
});

//
//
//
//
//
//
//
//
//
//
//
///////post menuali
// const database = client.db("carMechanic");
// DB_USER = responsive;
// DB_PASS = ov57HTtnlEJasS9r;
//     const servicesCollection = database.collection("services");
//     app.post("/services", (req, res) => {
//       const service = {
//         name: "ENGINE DIAGNOSTIC",
//         price: "300",
//         description:
//           "Lorem ipsum dolor sit amet, consectetu radipisi cing elitBeatae autem aperiam nequ quaera molestias voluptatibus harum ametipsa.",
//         img: "https://i.ibb.co/dGDkr4v/1.jpg",
//       };
//     });
