import fs from "fs";
import chalk from "chalk";
import { getFile, extractLinks } from "./index.js";
import validateLinks from "./httpValidate.js";

async function execute(args) {
  const path = args[2];
  const validate = args[3] === "--validate";

  try {
    fs.lstatSync(path);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(chalk.red("O arquivo ou diretório informado não existe."));
      return;
    }
  }

  if (fs.lstatSync(path).isFile()) {
    let links = await extractFileLinks(path);
    if (validate) {
      links = await validateLinks(links);
    }
    output("Lista de links: ", links);
  } else if (fs.lstatSync(path).isDirectory()) {
    const links = await extractDirFilesLinks(path);
    for (let link of links) {
      if (validate) {
        const validated_file = await validateLinks(link["links"]);
        output(`Lista de links do arquivo '${link["file"]}': `, validated_file);
      } else {
        output(`Lista de links do arquivo '${link["file"]}': `, link["links"]);
      }
    }
  }
}

async function extractDirFilesLinks(path) {
  const files = await fs.promises.readdir(path);
  const links_extrated = Promise.all(
    files.map(async (file_name) => {
      const file_content = await getFile(`${path}/${file_name}`);
      return { file: file_name, links: extractLinks(file_content) };
    })
  );
  return links_extrated;
}

async function extractFileLinks(path) {
  const file_content = await getFile(path);
  return extractLinks(file_content);
}

function output(message, result) {
  console.log(chalk.yellow(message), result, "\n");
}

const args = process.argv;
execute(args);
