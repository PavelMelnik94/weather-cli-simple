import { Chalk } from "chalk";
import { params } from "./params.js";

const chalk = new Chalk({ enabled: true });

const printError = (err) => {
    console.log(chalk.bgRed(" ERROR ") + " " + err);
};

const printSuccess = (msg) => {
    console.log(chalk.bgGreen(" SUCCESS ") + " " + msg);
};

const printHelp = () => {
    // header
    console.log(
        chalk.bgBlue(`
╔═╗╦  ╦  ┬ ┬┌─┐┬  ┌─┐
║  ║  ║  ├─┤├┤ │  ├─┘
╚═╝╩═╝╩  ┴ ┴└─┘┴─┘┴  `)
    );
    console.log(chalk.bgMagentaBright("      параметры      "));

    // params
    console.log(params);
};

const logger = {
    printError,
    printSuccess,
    printHelp,
};
export { logger };
