// CRUD

const { MongoClient, ObjectID } = require("mongodb");
require("dotenv").config();

const connectionURL = process.env.CONNECTION_URL;
const databaseName = "task-manager";

// for reference if we want to add _id manually
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database: ", error);
    }
    console.log("Connected successfully!");
    const db = client.db(databaseName);

    // console.log(db);

    /* Insert One */
    // db.collection("users").insertOne(
    //   {
    //     name: "Kimbley",
    //     age: 20,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user.");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    /* Insert Many */
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Suzie",
    //       age: 27,
    //     },
    //     {
    //       name: "Nick",
    //       age: 19,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user.");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    /* Insert Many */
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Task 1",
    //       completed: false,
    //     },
    //     {
    //       description: "Task 2",
    //       completed: true,
    //     },
    //     {
    //       description: "Task 3",
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert tasks.");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    /* Find one with ID */
    // db.collection("users").findOne(
    //   {
    //     _id: new ObjectID("60e05c2afb7728e4a9fa9a04"),
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to fetch.");
    //     }
    //     console.log(result);
    //   }
    // );

    /* Find multipe greater than */
    // db.collection("users")
    //   .find({
    //     age: {$gte: 21},
    //   })
    //   .toArray((error, result) => {
    //     if (error) {
    //       return console.log("Unable to fetch.");
    //     }
    //     console.log(result);
    //   });

    /* Find One */
    // db.collection("tasks").findOne(
    //   {
    //     _id: new ObjectID("60e06166a4bdd5e89cbd15ec"),
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to fetch.");
    //     }
    //     console.log(result);
    //   }
    // );

    /* Find Many */
    // db.collection("tasks")
    //   .find({
    //     completed: false,
    //   })
    //   .toArray((error, result) => {
    //     if (error) {
    //       return console.log("Unable to fetch.");
    //     }
    //     console.log(result);
    //   });

    /* Update One */
    // const updatePromise = db.collection("users").updateOne(
    //   {
    //     _id: new ObjectID("60e06051d858f6e7b55bfff0"),
    //   },
    //   {
    //     // $set: {
    //     //   name: "Mario",
    //     // },
    //     $inc: {
    //       age: 1,
    //     },
    //   }
    // );

    // updatePromise
    //   .then((result) => {
    //     console.log(result.matchedCount);
    //   })
    //   .catch((error) => console.log(error));

    /* Update many */
    // const updatePromise = db.collection("tasks").updateMany(
    //   {
    //     completed: false,
    //   },
    //   {
    //     $set: {
    //       completed: true,
    //     },
    //   }
    // );

    // updatePromise
    //   .then((result) => {
    //     console.log(result.matchedCount);
    //   })
    //   .catch((error) => console.log(error));

    /* Delete Many */
    // const deletePromise = db.collection("users").deleteMany({
    //   age: 31,
    // });

    // deletePromise
    //   .then((result) => {
    //     console.log(result.deletedCount);
    //   })
    //   .catch((error) => console.log(error));

    /* Delete One */
    // const deletePromise = db.collection("tasks").deleteOne({
    //   description: "Task 4",
    // });

    // deletePromise
    //   .then((result) => {
    //     console.log(result.deletedCount);
    //   })
    //   .catch((error) => console.log(error));
  }
);
