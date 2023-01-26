"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailCode = void 0;
const axios_1 = __importDefault(require("axios"));
const axios = axios_1.default.create({
    baseURL: "https://api.hotmailbox.me",
    timeout: 10000,
});
class API {
    constructor(apikey, language = "en") {
        this.apikey = "";
        this.language = "en";
        this.apikey = apikey;
    }
    getStock() {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, data } = yield axios.get('/mail/currentstock');
            if (status !== 200) {
                throw new data;
            }
            else {
                return data.Data;
            }
        });
    }
    /**
     *
     * @param mailcode
     * @param quantity
     * @returns
     */
    buyEmails(mailcode, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, data } = yield axios.get('/mail/buy', {
                params: {
                    mailcode,
                    quantity,
                    lang: this.language,
                    apikey: this.apikey
                }
            });
            if (status !== 200) {
                throw new data;
            }
            else {
                return data.Data;
            }
        });
    }
    /**
     * @param currency "vnd" or "usd"
     * @returns number
     */
    checkBalance(currency) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, data } = yield axios.get('user/balance', {
                params: {
                    apikey: this.apikey
                }
            });
            if (status !== 200) {
                throw new data;
            }
            else {
                if (currency === "vnd" || currency === "VND") {
                    return data.Balance;
                }
                else {
                    return data.BalanceUsd;
                }
            }
        });
    }
}
exports.default = API;
/**
 * @param platform "facebook" | "twitter" | "discord" | "amazon"
 * @param email account's email address
 * @param password account's password
 * @param lang "en" | "vn" (default: "en")
 */
const getMailCode = (platform, email, password, timeout, lang = "en") => __awaiter(void 0, void 0, void 0, function* () {
    const { status, data } = yield axios.get(`https://getcode.hotmailbox.me/${platform}`, {
        params: {
            email,
            password,
            lang,
            timeout
        }
    });
    if (status !== 200) {
        throw new data;
    }
    else {
        return data;
    }
});
exports.getMailCode = getMailCode;
//# sourceMappingURL=index.js.map