const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/user");
const auth = require("../middleware/auth");
const {
  sendWelcomeEmail,
  sendCancellationEmail,
} = require("../emails/account");

const router = new express.Router();

const upload = multer({
  // dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("Please upload a image"));
    }
    callback(undefined, true);
    // callback(new Error("File must be a word doc!"));
    // cb(undefined, true);
    // cb(undefined, false);
  },
});

router.get("/users", async (req, res) => {
  try {
    res.send({ health: "up", status: "200" });
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.post("/users", async (req, res) => {
  // console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    // console.log(user);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    const isValidUser = req.user.tokens.find(
      (token) => token.token === req.token
    );
    if (isValidUser) {
      req.user.tokens = [];
    }
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    // const users = await User.find({});
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const allowedList = ["name", "email", "password", "age"];
  const updateData = Object.keys(req.body);

  const isValidUpdateEntry = updateData.every((update) =>
    allowedList.includes(update)
  );

  if (!isValidUpdateEntry) {
    return res.status(400).send({ error: "Invalid keys for update!" });
  }

  try {
    updateData.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();
    return res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    return res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // req.user.avatar = req.file.buffer;
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete(
  "/users/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get(
  "/users/:id/avatar",
  // auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      // const avatar = await req.user.save();
      if (!user && !user.avatar) {
        throw new Error("Avatar not available!");
      }
      res.set("Content-Type", "image/png");
      res.send(user.avatar);
    } catch (error) {
      res.status(404).send();
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;

// router.get("/test", (req, res) => {
//   res.send("this is from my other router!");
// });

// TODO: may be required in future
// router.get("/users", auth ,async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// TODO: may be required in future
// router.get("/users/:id", async (req, res) => {
//   // console.log(req.params);
//   try {
//     const user = await User.findById({ _id: req.params.id });
//     if (!user) {
//       return res.status(404).send();
//     }
//     return res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// TODO: may be used in future
// router.patch("/users/:id", async (req, res) => {
//   const allowedList = ["name", "email", "password", "age"];
//   const updateData = Object.keys(req.body);

//   const isValidUpdateEntry = updateData.every((update) =>
//     allowedList.includes(update)
//   );

//   if (!isValidUpdateEntry) {
//     return res.status(400).send({ error: "Invalid keys for update!" });
//   }

//   try {
//     const user = await User.findById(req.params.id);

//     updateData.forEach((update) => {
//       user[update] = req.body[update];
//     });

//     await user.save();

//     // const user = await User.findByIdAndUpdate(
//     //   { _id: req.params.id },
//     //   req.body,
//     //   { new: true, runValidators: true }
//     // );
//     if (!user) {
//       return res.status(404).send();
//     }
//     return res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// TODO: may be used in future
// router.delete("/users/:id", auth, async (req, res) => {
//   // console.log(req.params);
//   try {
//     const user = await User.findByIdAndDelete({ _id: req.params.id });
//     if (!user) {
//       return res.status(404).send();
//     }
//     return res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
