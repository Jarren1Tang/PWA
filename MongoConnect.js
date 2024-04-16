const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tangjarren:vXdNkxM4uXjAA3dv@cluster0.gz5n1di.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    const adminDb = client.db("admin");
    const result = await adminDb.command({ ping: 1 }).catch((err) => {
      console.log("Ping failed:", err);
    });

    if (result.ok === 1) {
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
  } catch (err) {
    console.log("Error while connecting to MongoDB:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch((error) => console.error(error));