# hotmailbox
An unofficial node.js wrapper for hotmailbox.me 

## Installation

```bash
npm i hotmailbox
```

## Example

```javascript
//Check current instock

const hotmailbox = require('hotmailbox');

const client = new hotmailbox.API("<YOUR_API_KEY>");

client.getStock()
.then(console.log);

// Buy outlook email(s)

client.buyEmails("OUTLOOK")
.then(transaction => {
    console.log(transaction.TransId);
    console.log(transaction.TotalAmountUsd);
    console.log(transaction.Emails);
    console.log(transaction);
});

//Check balance

// VND
client.checkBalance("vnd") // or "VND"
.then(balance => {
    console.log(`VND : ${balance}`);
});

// USD
client.checkBalance("usd") // or "USD"
.then(balance => {
    console.log(`USD : ${balance}`);
});

client.checkBalance() // default value is "usd"
.then(balance => {
    console.log(`USD : ${balance}`);
});

//Get verification code

hotmailbox.getMailCode("discord", "example@outlook.com", "example")
.then(result => {
    result.MailBody; // Mail body
    result.VerificationCode; // Verification Code (or URL)
});
```

## API

```typescript
//API Class
hotmailbox.API;

//Creating API object with api key
const api = new hotmailbox.API("<YOUR_API_KEY>");

api.apikey; // string - current apikey
api.language; // string - language "en" (default) or "vi"
api.buyEmails(mailcode: IMailCode , quantity: number): Promise<ITransaction>; // buy emails
api.checkBalance(currency: "vnd" | "VND" | "usd" | "USD" | undefined): Promise<number>; // check balance (default currency : usd)
api.getStock(): Promise<IStockData[]>; // get current stock info
```

## Types

```typescript
interface IAPIError {
    code: number;
    message: string;
};
interface IEmail {
    Email: string;
    Password: string;
};
type IMailCode = "HOTMAIL" | "OUTLOOK" | "OUTLOOK.DOMAIN" | "HOTMAIL.TRUSTED" | "OUTLOOK.TRUSTED" | "OUTLOOK.COM.AU" | "OUTLOOK.COM.AR" | "OUTLOOK.AT" | "OUTLOOK.BE" | "OUTLOOK.COM.BR" | "OUTLOOK.CZ" | "OUTLOOK.CL" | "OUTLOOK.DK" | "OUTLOOK.FR" | "OUTLOOK.COM.GR" | "OUTLOOK.DE" | "OUTLOOK.HU" | "OUTLOOK.IN" | "OUTLOOK.CO.ID" | "OUTLOOK.IE" | "OUTLOOK.IL" | "OUTLOOK.IT" | "OUTLOOK.JP" | "OUTLOOK.KR" | "OUTLOOK.LV" | "OUTLOOK.PT" | "OUTLOOK.SG" | "OUTLOOK.SK" | "OUTLOOK.ES" | "OUTLOOK.CO.TH";
interface IStockData {
    MailCode: IMailCode;
    Price: number;
    PriceUsd: number;
    Instock: number;
};
interface ITransaction {
    TransId: string;
    Product: string;
    Quantity: number;
    UnitPrice: number;
    UnitPriceUsd: number;
    TotalAmount: number;
    TotalAmountUsd: number;
    Emails: IEmail[];
}
interface IVerificationCode {
    Success: boolean;
    Message: string;
    VerificationCode: string;
    MailBody: string;
};
```