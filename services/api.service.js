import axios from "axios";
import https from "https";
import { storage } from "./storage.service.js";

const { TOKEN_DICTIONARY } = storage;

const getWeather = async (city) => {
    const token =
        process.env.API_KEY ??
        (await storage.getKeyValue(TOKEN_DICTIONARY.token));

    if (!token) {
        throw new Error(
            "Не задан ключ API, задайте его через команду -t [API_KEY]"
        );
    }

    const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
            params: {
                q: city,
                appid: token,
                lang: "ru",
                units: "metric",
            },
        }
    );

    return data;
};

export { getWeather };
