import chalk from "chalk";

const dataFromRenderHelpList = `
-h для вывода помощи
-c [CITY] для установки города
-t [API_KEY] для установки токена

без параметров - вывод погоды
`;

const helpHeaderASCII = chalk.bgBlue(`
╔═╗╦  ╦  ┬ ┬┌─┐┬  ┌─┐
║  ║  ║  ├─┤├┤ │  ├─┘
╚═╝╩═╝╩  ┴ ┴└─┘┴─┘┴  `);

export { dataFromRenderHelpList, helpHeaderASCII };
