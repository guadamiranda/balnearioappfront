interface ISpecificVisitor {
    wristbandNumber: string;
    isManager: boolean;
    nroDoc: number;
    idGroup: string;
    id: string;
    idDiscount: string;
    person: ISpecificPerson;
}

interface ISpecificPerson {
    nroDoc: number;
    firstName: string;
    lastName: string;
    phone: string;
    location: string;
    memberNum: string;
}

interface ISpecificAnimal {
    quantity: number;
    typeAnimal: string;
}

interface ISpecificGroup {
    id: string;
    carPlate: string;
    animals: ISpecificAnimal;
}

interface ISpecificStay {
    stay: IStay;
    group: ISpecificGroup;
    visitors: ISpecificVisitor[];
}