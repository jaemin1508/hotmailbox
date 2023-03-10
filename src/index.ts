import Axios from "axios";
import { IAPIError, IStockData, ITransaction, IMailCode, IVerificationCode } from "./interfaces";

const axios = Axios.create({
    baseURL: "https://api.hotmailbox.me",
    timeout: 10000,
});

export class API {
    apikey: string = "";
    language: string = "en";
    
    constructor(apikey: string, language: string = "en") {
        this.apikey = apikey;
        this.language = language;
    }

    async getStock(): Promise<IStockData[]> {
        const { status, data } = await axios.get('/mail/currentstock');

        if (status !== 200) {
            throw new data as IAPIError;
        } else {
            return data.Data as IStockData[];
        }
    }

    /**
     * 
     * @param mailcode
     * @param quantity 
     * @returns 
     */
    async buyEmails(mailcode: IMailCode, quantity: number): Promise<ITransaction> {
        const { status, data } = await axios.get('/mail/buy', {
            params: {
                mailcode,
                quantity,
                lang: this.language,
                apikey: this.apikey
            }
        });

        if (status !== 200) {
            throw new data as IAPIError;
        } else {
            return data.Data as ITransaction;
        }
    }

    /**
     * @param currency "vnd" or "usd"
     * @returns number
     */
    async checkBalance(currency?: "vnd" | "usd" | "VND" | "USD"): Promise<number> {
        const { status, data } = await axios.get('user/balance', {
            params: {
                apikey: this.apikey
            }
        });

        if (status !== 200) {
            throw new data as IAPIError;
        } else {
            if (currency === "vnd" || currency === "VND") {
                return data.Balance as number;
            } else {
                return data.BalanceUsd as number;
            }
        }
    }
}

/**
 * @param platform "facebook" | "twitter" | "discord" | "amazon"
 * @param email account's email address
 * @param password account's password
 * @param lang "en" | "vn" (default: "en")
 */
export const getMailCode = async (platform: "facebook" | "twitter" | "discord" | "amazon", email: string, password: string, timeout: number | undefined, lang: "en" | "vn" = "en"): Promise<IVerificationCode> => {
    const { status, data } = await axios.get(`https://getcode.hotmailbox.me/${platform}`, {
        params: {
            email,
            password,
            lang,
            timeout
        },
        timeout: (timeout || 60) * 1000
    });

    if (status !== 200) {
        throw new data as IAPIError;
    } else {
        return data as IVerificationCode;
    }
}