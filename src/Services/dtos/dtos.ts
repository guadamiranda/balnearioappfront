interface IVisitor {
    dni: string;
    firstName: string;
    lastName: string;
    phone: string;
    location: string;
    memberNumber: string;
    wristbandNumber: string;
    idDiscount: string;
    isManager: boolean;
  }
  
  interface IGroup {
    idCampsite: string;
    carPlate: string;
    quantityAnimals: number;
  }
  
  interface ICreationStay {
    initDate: string;
    finishDate: string;
    amount: number;
    stayType: string;
    group: IGroup;
    visitors: IVisitor[];
  }

  interface IGeneralInfoStay{
    initDate: number;
    finishDate: number;
    amount: number;
    stayType: string;
    id: string;
  }

  interface IDiscount {
    id: string;
    name: string;
    percent: number;
    isDeleted: boolean;
  }

  interface IEmployee {
    dni: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
    isDismissal: boolean;
  }