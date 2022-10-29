#!/usr/bin/env node
import * as dotenv from "dotenv";
dotenv.config();
import { getArgs } from "./helpers/args.js";
import { TOKEN_DICTIONARY, FLAG_RU } from "./helpers/transformers.js";
import { getWeather } from "./services/api.service.js";
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
        const weather = await getWeather("minsk");
        console.log(weather);
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

    if (args.h) logger.printHelp();
    if (args.c) saveFlagValue(TOKEN_DICTIONARY.city, args.c);
    if (args.t) saveFlagValue(TOKEN_DICTIONARY.token, args.t);

    getForcast();
};

init();
