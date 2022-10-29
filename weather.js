#!/usr/bin/env node
import * as dotenv from "dotenv";
dotenv.config();
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { logger } from "./services/log.service.js";
import { storage } from "./services/storage.service.js";

const saveToken = async (token) => {
    const { TOKEN_DICTIONARY } = storage;
    if (!token.length) {
        logger.printError("Не передан токен");
        return;
    }

    try {
        await storage.saveKeyValue(TOKEN_DICTIONARY.token, token);
        logger.printSuccess("Token saved");
    } catch (error) {
        logger.printError(error.message);
    }
};

const getForcast = async () => {
    try {
        const weather = await getWeather("minsk");
        console.log(weather);
    } catch (error) {
        if (error?.response?.status === 404) {
            logger.printError("Неверно указан город");
        } else if (error?.response?.status === 401) {
            logger.printError("Неверный токен");
        } else {
            logger.printError(error.message);
        }
    }
};

const init = () => {
    const args = getArgs(process.argv);

    if (args.h) logger.printHelp();

    if (args.s) {
        // save city
    }

    if (args.t) saveToken(args.t);

    getForcast();
};

init();
