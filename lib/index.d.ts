import IStockData from "./interfaces/StockData";
import ITransaction from "./interfaces/Transaction";
import { IMailCode } from "./interfaces/Mail";
import IVerificationCode from "./interfaces/VerificationCode";
export declare class API {
    apikey: string;
    language: string;
    constructor(apikey: string, language?: string);
    getStock(): Promise<IStockData[]>;
    /**
     *
     * @param mailcode
     * @param quantity
     * @returns
     */
    buyEmails(mailcode: IMailCode, quantity: number): Promise<ITransaction>;
    /**
     * @param currency "vnd" or "usd"
     * @returns number
     */
    checkBalance(currency: "vnd" | "usd" | "VND" | "USD" | undefined): Promise<number>;
}
/**
 * @param platform "facebook" | "twitter" | "discord" | "amazon"
 * @param email account's email address
 * @param password account's password
 * @param lang "en" | "vn" (default: "en")
 */
export declare const getMailCode: (platform: "facebook" | "twitter" | "discord" | "amazon", email: string, password: string, timeout: number | undefined, lang?: "en" | "vn") => Promise<IVerificationCode>;
//# sourceMappingURL=index.d.ts.map