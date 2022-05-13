export class Delivery {
    text: string = "";
    srcAddress: Adress;
    dstAddress: Adress;
    customer: Customer;
    packageid: number;
    iddelivery: string;
    weight: number;
    height: number;
    width: number;
    depth: number;
    externTrackingnumber: string;
    currentState: string;
}

class Adress {
    zipcode: number;
    streetname: string;
    streetnumber: number;
    city: string;
    country: string;
}

class Customer {
    firstname: string;
    lastname: string;
    email: string;
}