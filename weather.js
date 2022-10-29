#!/usr/bin/env node
import * as dotenv from "dotenv";
dotenv.config();
import { getArgs } from "./helpers/args.js";
import { TOKEN_DICTIONARY, FLAG_RU } from "./helpers/transformers.js";
import { getIcon, getWeather } from "./services/api.service.js";
import { logger } from "./services/log.service.js";
import { storage } from "./services/storage.service.js";

const saveFlagValue = async (flag, value) => {
    if (!value.length) {
        logger.printError(`Не передан ${FLAG_RU[flag]}`);
        return;
    }

    try {
        await storage.saveKeyValue(TOKEN_DICTIONARY[flag], value);
        logger.printSuccess(`${FLAG_RU[flag]?.toUpperCase?.()} сохранен`);
    } catch (error) {
        logger.printError(error.message);
    }
};

const getForcast = async () => {
    try {
        const city = await storage.getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        logger.printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (error) {
        if (error?.response?.status === 404)
            logger.printError("Неверно указан город");
        else if (error?.response?.status === 401) {
            logger.printError("Неверный токен");
        } else {
            logger.printError(error.message);
        }
    }
};

const init = () => {
    const args = getArgs(process.argv);

    if (args.h) return logger.printHelp();
    if (args.c) return saveFlagValue(TOKEN_DICTIONARY.city, args.c);
    if (args.t) return saveFlagValue(TOKEN_DICTIONARY.token, args.t);

    return getForcast();
};

init();
