import fs from 'fs';
import chalk from 'chalk';
import { getFile, extractLinks } from './index.js';

async function execute(args) {
    const path = args[2];

    try {
        fs.lstatSync(path);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red('O arquivo ou diretório informado não existe.'));
            return;
        }
    }

    if (fs.lstatSync(path).isFile()) {
        const file_content = await getFile(path);
        const links = extractLinks(file_content);
        output('Lista de links: ', links);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path);
        files.forEach(async (file_name) => {
            const file_content = await getFile(`${path}/${file_name}`);
            const links = extractLinks(file_content);
            output(`Lista de links do arquivo '${file_name}': `, links);
        })
    }

}

function output(message, result) {
    console.log(chalk.yellow(message), result, '\n');
}

const args = process.argv;
execute(args);
