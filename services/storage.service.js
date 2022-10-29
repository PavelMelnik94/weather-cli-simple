import { homedir } from "os";
import { join, basename } from "path";
import { promises } from "fs";
import { logger } from "./log.service.js";

const filePath = join(homedir(), "weather-data.json");

const TOKEN_DICTIONARY = {
    token: "token",
    city: "city",
};

const saveKeyValue = async (key, value) => {
    let data = {};

    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const json = JSON.parse(file);
        Object.assign(data, json);
    }

    data[key] = value;

    await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const json = JSON.parse(file);
        return json[key];
    }
    return undefined;
};

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (error) {
        logger.printError(error.message);
        return false;
    }
};

const storage = {
    saveKeyValue,
    getKeyValue,
    TOKEN_DICTIONARY,
};

export { storage };
