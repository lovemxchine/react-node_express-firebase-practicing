const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Main App
const app = express();
// app.use(express.json());
app.use(
  express.json(),
  cors({ credentials: true, origin: ["http://localhost:3000"] })
);
const db = admin.firestore();

//Middleware Verify Token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!idToken) {
      throw { throwStatus: 401, message: "Unauthorized" };
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.uid = decodedToken.uid;
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return res.status(403).send("Unauthorized");
  }
};

// Routes
app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

// Create -> post
app.post("/api/create", async (req, res) => {
  try {
    await db
      .collection("users")
      .doc("/" + req.body.uid + "/")
      .create({
        uid: req.body.uid,
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        avatar: req.body.avatar,
      });

    return res.status(200).send({ status: "success", message: "data saved" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ status: "failed" });
  }
});

// Create -> Register
let isSubmitting = false;
app.post("/api/register", async (req, res) => {
  if (isSubmitting) {
    return res.status(400).send({ message: "Already processing request" });
  }
  isSubmitting = true;
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.username,
    });
    await db
      .collection("users")
      .doc("/" + userRecord.uid + "/")
      .create({
        uid: userRecord.uid,
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        avatar: req.body.avatar,
      });
    return res.status(200).send({ status: "success", message: "data saved" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ status: "failed" });
  } finally {
    isSubmitting = false;
  }
});

// Read -> get
app.get("/api/read/:id", async (req, res) => {
  try {
    const document = db.collection("users").doc(req.params.id);
    let user = await document.get();
    let response = user.data();
    if (response === undefined) {
      throw { throwStatus: 404, message: "Data not found" };
    }

    return res.status(200).send({ status: "success", message: response });
  } catch (error) {
    let status = error.throwStatus || 500;
    console.log(error.message);
    return res.status(status).send({ status: "failed" });
  }
});

// Read -> get Login ** Not working
app.post("/api/login", async (req, res) => {
  try {
    return res.status(200).send({
      status: "success",
      message: "Login Success",
    });
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      res
        .status(404)
        .send({ status: "failed", message: "Invalid email or password" });
    } else {
      res
        .status(500)
        .send({ status: "failed", message: "An unknown error occurred" });
    }
  }
});

// Fetch alls
app.get("/api/getAll", async (req, res) => {
  try {
    const document = db.collection("users");
    let response = [];
    await document.get().then((data) => {
      let docs = data.docs;
      docs.map((doc) => {
        const selectedItem = {
          id: doc.data().id,
          fname: doc.data().fname,
          lname: doc.data().lname,
          username: doc.data().username,
          password: doc.data().password,
          email: doc.data().email,
          avatar: doc.data().avatar,
        };
        response.push(selectedItem);
      });
      return response;
    });
    return res.status(200).send({ status: "success", data: response });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ status: "failed" });
  }
});

// Update -> put
app.put("/api/updateAll/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await db.collection("users").doc(id).update({
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      avatar: req.body.avatar,
    });

    return res.status(200).send({ status: "success", data: "Data Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "failed", message: error.message });
  }
});

// Update -> patch
app.patch("/api/updatePatch/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let updateData = req.body;
    await db.collection("users").doc(id).update(updateData);

    return res.status(200).send({ status: "success", data: "Data Updated" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ status: "failed" });
  }
});

// Delete -> delete
app.delete("/api/delete/:id", async (req, res) => {
  try {
    await db.collection("users").doc(req.params.id).delete();
    return res.status(200).send({ status: "success", data: "Data Deleted " });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ status: "failed" });
  }
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
