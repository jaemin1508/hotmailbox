import { IMailCode } from "./Mail";

export default interface IStockData {
    MailCode: IMailCode;
    Price: number;
    PriceUsd: number;
    Instock: number;
};