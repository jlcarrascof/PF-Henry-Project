const fetch = require("node-fetch");
const ApiAuth = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
const ApiOrder = 'https://api-m.sandbox.paypal.com/v2/checkout/orders';
const ApiOrderCapture = (Token) => `https://api-m.sandbox.paypal.com/v2/checkout/orders/${Token}/capture`;
class PayPal {
    Auth = null;
    constructor(Options) {
        this.Auth = Options.Auth;
    }
    async GetAuth() {
        const AuthString = Buffer.from(`${this.Auth.ClientID}:${this.Auth.Token}`).toString('base64');
        const Response = await fetch(ApiAuth, {
            method: 'POST', headers: {
                Authorization: `Basic ${AuthString}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }, body: 'grant_type=client_credentials'
        });
        const AuthData = await Response.json();
        if ('error' in AuthData) {
            throw new Error(`${AuthData.error}: ${AuthData.error_description}`);
        }
        else
            return AuthData;
    }
    async CreateOrder(Urls, PurchaseUnits) {
        const Auth = await this.GetAuth();
        const Order = {
            intent: 'CAPTURE',
            purchase_units: PurchaseUnits,
            application_context: {
                user_action: 'PAY_NOW',
                ...Urls
            }
        };
        const Response = await fetch(ApiOrder, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.access_token}`
            },
            body: JSON.stringify(Order)
        });
        const OrderData = await Response.json();
        console.log(Order);
        return OrderData;
    }
    async OrderCapture(Token) {
        let Auth = await this.GetAuth();
        const Response = await fetch(ApiOrderCapture(Token), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.access_token}`
            }
        });
        const CaptureData = await Response.json();
        return CaptureData;
    }
}
module.exports = {
    PayPal
}
