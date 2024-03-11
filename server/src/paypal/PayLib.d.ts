declare class PayPal {
    private Auth;
    constructor(Options: PayPal.Options);
    GetAuth(): Promise<PayPal.Response.Auth>;
    CreateOrder(Urls: PayPal.Options.Urls, PurchaseUnits: Array<PayPal.Order.Unit>): Promise<PayPal.Response.Order>;
    OrderCapture(Token: string): Promise<PayPal.Response.Capture>;
}
declare namespace PayPal {
    type Options = {
        Auth: Options.Auth;
    };
    namespace Options {
        type Auth = {
            ClientID: string;
            Token: string;
        };
        type Urls = {
            return_url: string;
            cancel_url: string;
        };
        type AppContext = {};
    }
    namespace Order {
        type Item = {
            name: string;
            quantity: number;
            description?: string;
            sku?: string;
            url?: string;
            category?: 'DIGITAL_GOODS' | 'PHYSICAL_GOODS' | 'DONATION';
            image_url?: string;
            unit_amount: {
                currency_code: string;
                value: number;
            };
            tax?: {
                currency_code: string;
                value: string;
            };
            upc?: {
                type: string;
                code: string;
            };
        };
        type Unit = {
            reference_id: string;
            description?: string;
            custom_id?: string;
            invoice_id?: string;
            soft_descriptor?: string;
            items?: Array<Item>;
            amount: {
                currency_code: string;
                value: string;
            };
        };
    }
    namespace ApiResponse {
        type Auth = ({
            error: string;
            error_description: string;
        } | Response.Auth);
    }
    namespace Response {
        type Auth = {
            scope: string;
            access_token: string;
            token_type: string;
            app_id: string;
            expires_in: number;
            nonce: string;
        };
        type Order = {
            id: string;
            status: 'CREATED' | string;
            links: Array<{
                href: string;
                rel: 'self' | 'approve' | 'update' | 'capture';
                method: 'GET' | 'PATCH' | 'POST';
            }>;
        };
        type Capture = {
            id: string;
            status: "COMPLETED" | string;
            payment_source: {
                paypal: {
                    email_address: string;
                    account_id: string;
                    account_status: "VERIFIED" | string;
                    name: {
                        given_name: string;
                        surname: string;
                    };
                    address: {
                        country_code: string;
                    };
                };
            };
            purchase_units: Array<{
                    reference_id: "default" | string;
                    shipping: {
                        name: {
                            full_name: string;
                        };
                        address: {
                            address_line_1: string;
                            admin_area_2: string;
                            admin_area_1: string;
                            postal_code: string;
                            country_code: string;
                        };
                    };
                    payments: {
                        captures: [
                            {
                                id: string;
                                status: "COMPLETED" | string;
                                amount: {
                                    currency_code: string;
                                    value: number;
                                };
                                final_capture: true;
                                seller_protection: {
                                    status: "ELIGIBLE" | string;
                                    dispute_categories: Array<string>;
                                };
                                seller_receivable_breakdown: {
                                    gross_amount: {
                                        currency_code: string;
                                        value: number;
                                    };
                                    paypal_fee: {
                                        currency_code: string;
                                        value: number;
                                    };
                                    net_amount: {
                                        currency_code: string;
                                        value: number;
                                    };
                                };
                                links: [
                                    {
                                        href: string;
                                        rel: "self";
                                        method: "GET";
                                    },
                                    {
                                        href: string;
                                        rel: "refund";
                                        method: "POST";
                                    },
                                    {
                                        href: string;
                                        rel: "up";
                                        method: "GET";
                                    }
                                ];
                                create_time: string;
                                update_time: string;
                            }
                        ];
                    };
                } & PayPal.Order.Unit>;
            payer: {
                name: {
                    given_name: string;
                    surname: string;
                };
                email_address: string;
                payer_id: string;
                address: {
                    country_code: string;
                };
            };
            links: [
                {
                    href: string;
                    rel: string;
                    method: string;
                }
            ];
        };
    }
}
export const PayPal;