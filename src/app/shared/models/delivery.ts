export class Delivery {
    text: string = "";
    srcAddress: Adress = new Adress();
    dstAddress: Adress = new Adress(); //für get
    destAddress: Adress = new Adress(); // für post LOL
    customer: Customer = new Customer();
    packageid: number = 0;
    iddelivery: string = "";
    pack: Pack = new Pack();
    externTrackingnumber: string = "";
    currentState: string = "";
    isPickup: boolean = false;
    pickupDate: string = "";
    paymentMethod: string = "";
    weight: number = 0;
    height: number = 0;
    width: number = 0;
    depth: number = 0;
}

class Adress {
    zipcode: number = 0;
    streetname: string = "";
    streetnumber: number = 0;
    city: string = "";
    country: string = "";
}

class Customer {
    firstname: string = "";
    lastname: string = "";
    email: string = "";
}

class Pack {
    weight: number = 0;
    height: number = 0;
    width: number = 0;
    depth: number = 0;
}