#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { logger } from "./services/log.service.js";
import { storage } from "./services/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        logger.printError("Не передан токен");
        return;
    }

    try {
        await storage.saveKeyValue("token", token);
        logger.printSuccess("Token saved");
    } catch (error) {
        logger.printError(error.message);
    }
};

const init = () => {
    const args = getArgs(process.argv);

    if (args.h) logger.printHelp();

    if (args.s) {
        // save city
    }

    if (args.t) saveToken(args.t);

    // return weather
};

init();
