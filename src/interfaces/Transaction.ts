import IEmail from "./Email";

export default interface ITransaction {
    TransId: string;
    Product: string;
    Quantity: number;
    UnitPrice: number;
    UnitPriceUsd: number;
    TotalAmount: number;
    TotalAmountUsd: number;
    Emails: IEmail[];
}