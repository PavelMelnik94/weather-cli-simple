#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";

const init = () => {
    const args = getArgs(process.argv);
    console.log(args);
    if (args.h) {
        // show help
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
