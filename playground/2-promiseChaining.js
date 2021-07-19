require("../src/db/mongoose");
const Task = require("../src/models/task");

// 60e35ceb398ca183decd1174

// Task.findByIdAndDelete("60e35ceb398ca183decd1174")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

async function findTaskByIdAndDelete(id) {
  const user = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
}

findTaskByIdAndDelete("60e35ceb398ca183decd1174")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => console.log(e));
