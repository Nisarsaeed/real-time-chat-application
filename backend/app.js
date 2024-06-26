const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const app = express();

require("./connection");

const Users = require("./models/Users");
const Conversations = require("./models/Conversations");
const Messages = require("./models/Messages");
const upload = require('./cloudinary/multerConfig');

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let users = [];

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  // Handle adding a user
  socket.on("addUser", (userId) => {
    const isUserExist = users.find((user) => user.userId === userId);
    if (!isUserExist) {
      const user = { userId, socketId: socket.id };
      users.push(user);
      io.emit("getUsers", users);
    }
  });

  // Handle sending a message
  socket.on(
    "sendMessage",
    async ({ senderId, recieverId, message, conversationId }) => {
      const reciever = users.find((user) => user.userId === recieverId);
      const sender = users.find((user) => user.userId === senderId);
      const user = await Users.findById(senderId);
      console.log("sender :>> ", sender, reciever);
      console.log("rec", sender);

      if (reciever) {
        io.to(reciever.socketId)
          .to(sender.socketId)
          .emit("getMessage", {
            senderId,
            message,
            conversationId,
            recieverId,
            user: { id: user._id, Name: user.Name, Email: user.Email },
          });
      } else {
        io.to(sender.socketId).emit("getMessage", {
          senderId,
          message,
          conversationId,
          recieverId,
          user: { id: user._id, Name: user.Name, Email: user.Email },
        });
      }
    }
  );

  // Handle user disconnect
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });

});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.post("/api/register", upload.single('profileImg'), async (req, res, next) => {
  try {
    const { Name, Email, Password } = req.body;
    const profileImg = req.file ? req.file.path : null;

    if (!Name || !Email || !Password) {
      return res.status(400).send("Please fill in the requested fields");
    } 

    const isAlreadyExist = await Users.findOne({ Email });
    if (isAlreadyExist) {
     res.status(400).send("User already exists");
    } 
    else{
    const newUser = new Users({ Name, Email, profileImg });
    bcryptjs.hash(Password, 10, (err, hashedPassword) => {
      newUser.set("Password", hashedPassword);
      newUser.save();
    });
    return res.status(200).send("User registered successfully");
  }
  } catch (error) {
    console.log("error:  ", error);
  }
});

app.post("/api/login",upload.none(), async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      res.status(400).send("Please Fill in the requested fields");
    } else {
      const user = await Users.findOne({ Email });
      if (!user) {
        res.status(400).send("User doesn't exsist! ");
      } else {
        const validateUser = await bcryptjs.compare(Password, user.Password);
        if (!validateUser) {
          res.status(400).send("Password is in Correct");
        } else {
          const payLoad = {
            userId: user._id,
            Email: user.Email,
          };
          const JWT_SECRET_KEY =
            process.env.JWT_SECRET_KEY || "This is a JWT secret key";
          jwt.sign(
            payLoad,
            JWT_SECRET_KEY,
            { expiresIn: 86400 },
            async (err, token) => {
              await Users.updateOne(
                { _id: user._id },
                {
                  $set: { token },
                }
              );
              user.save();
              return res
                .status(200)
                .json({
                  user: { id: user._id, Email: user.Email, Name: user.Name, Avatar: user.profileImg },
                  token: token,
                });
            }
          );
        }
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
});

app.post("/api/conversation", async (req, res) => {
  try {
    const { senderId, recieverId } = req.body;
    const newConversation = new Conversations({
      members: [senderId, recieverId],
    });
    await newConversation.save();
    res.status(200).send("Conversation created successfully");
  } catch (error) {
    console.log("Error", error);
  }
});

app.get("/api/conversation/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({
      members: { $in: [userId] },
    });
    const conversationUserData = Promise.all(
      conversations.map(async (conversation) => {
        const recieverId = conversation.members.find(
          (member) => member !== userId
        );
        const user = await Users.findById(recieverId);
        return {
          user: { recieverId: user?._id, Email: user?.Email, Name: user?.Name, Avatar: user?.profileImg },
          conversationId: conversation._id,
        };
      })
    );
    res.status(200).json(await conversationUserData);
  } catch (error) {
    console.log("Error", error);
  }
});

app.post("/api/message", async (req, res) => {
  try {
    const { conversationId, senderId, message, recieverId } = req.body;
    console.log({ conversationId, senderId, message, recieverId });
    if (!senderId || !message)
      return res.status(400).send("Please fill all required fields");
    if (conversationId === "new" && recieverId) {
      const newConversation = new Conversations({
        members: [senderId, recieverId],
      });
      await newConversation.save();
      const newMessage = new Messages({
        conversationId: newConversation._id,
        senderId,
        message,
      });
      await newMessage.save();
      res.status(200).send("Message sent successfully");
    } else if (!conversationId && !recieverId) {
      res.status(400).send("Please fill all required fields");
    }
    const newMessage = new Messages({ conversationId, senderId, message });
    await newMessage.save();
  } catch (error) {
    console.log("Error ", error);
  }
});

app.get("/api/message/:conversationId", async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    if (conversationId === "new") return res.status(200).json([]);
    const messages = await Messages.find({ conversationId });
    const messageUserData = Promise.all(
      messages.map(async (message) => {
        const user = await Users.findById(message.senderId);
        return {
          user: { id: user._id, Email: user.Email, Name: user.Name },
          message: message.message,
        };
      })
    );
    res.status(200).json(await messageUserData);
  } catch (error) {
    console.log("Error : ", error);
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    const usersData = Promise.all(
      users.map(async (user) => {
        return {
          user: { Email: user.Email, Name: user.Name, recieverId: user._id, Avatar: user.profileImg },
        };
      })
    );
    res.status(200).json(await usersData);
  } catch (error) {
    console.log("Error ", error);
  }
});

app.listen(port, () => {
  console.log("listining to port " + port);
});
