#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { logger } from "./services/log.service.js";

const init = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        logger.printHelp();
    }
    if (args.s) {
        // save city
    }

    if (args.t) {
        // save token
    }

    // return weather
};

init();
