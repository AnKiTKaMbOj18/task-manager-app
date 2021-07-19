require("../src/db/mongoose");
const User = require("../src/models/user");

// 60e35ceb398ca183decd1174

User.findByIdAndUpdate("60e35ceb398ca183decd1174", { age: 10 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 10 });
  })
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });

async function findAndUpdateUser(id, age) {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
}

findAndUpdateUser("60e35ceb398ca183decd1174", 20)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => console.log(e));
