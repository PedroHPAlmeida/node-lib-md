import fs from "fs";
import chalk from "chalk";

function extractLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const matches = [...text.matchAll(regex)];
  return matches.map((match) => {
    return { [match[1]]: match[2] };
  });
}

// Assincrono async
async function getFile(path) {
  try {
    return await fs.promises.readFile(path, "utf-8");
  } catch (error) {
    throw new Error(chalk.red(error));
  }
}

const text = await getFile("./files/text.md");
console.log(extractLinks(text));
