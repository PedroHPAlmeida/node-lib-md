import fs from "fs";
import chalk from "chalk";

// Assincrono async
async function getFile(path) {
  try {
    const content = await fs.promises.readFile(path, "utf-8");
    console.log(chalk.green(content));
  } catch (error) {
    throw new Error(chalk.red(error));
  }
}

// Assincrono then
// function getFile(path) {
//   fs.promises
//     .readFile(path, "utf-8")
//     .then((content) => console.log(chalk.green(content)))
//     .catch((error) => {
//       throw new Error(chalk.red(error));
//     });
// }

// Sincrono
// function getFile(path) {
//   fs.readFile(path, "utf-8", (error, content) => {
//     if (error) {
//       throw new Error(chalk.red(error));
//     }
//     console.log(chalk.green(content));
//   });
// }

getFile("./files/text.md");
