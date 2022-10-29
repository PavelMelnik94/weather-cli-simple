import chalk from "chalk";
import { dataFromRenderHelpList, helpHeaderASCII } from "../helpers/params.js";

const printError = (err) => {
    console.log(chalk.bgRed(" ERROR ") + " " + err);
};

const printSuccess = (msg) => {
    console.log(chalk.bgGreen(" SUCCESS ") + " " + msg);
};

const printWeather = (res, icon) => {
    console.log(`
${chalk.bgYellow(` WEATHER `)}${chalk.bgYellowBright(
        ` Погода в городе ${res.name} `
    )} 
${res.weather[0].description} ${icon}
Температура: ${res.main.temp}°C (ощущается как ${res.main.feels_like}°C)
Влажность: ${res.main.humidity}%
Ветер: ${res.wind.speed} м/с`);
};

const printHelp = () => {
    console.log(`
    ${helpHeaderASCII}
${chalk.bgMagentaBright("      параметры      ")}
    ${dataFromRenderHelpList}`);
};

const logger = {
    printError,
    printSuccess,
    printHelp,
    printWeather,
};
export { logger };
