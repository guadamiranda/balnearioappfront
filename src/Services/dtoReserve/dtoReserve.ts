interface ResidentDto {
    dni: string;
    memberNumber: string;
  }
  
  interface VehicleDto {
    carPlate: string;
    typeVehicle: string;
  }
  
  interface ReserveDto {
    finishDate: string;
    id: string;
    initDate: string;
    managerCarPlate: string;
    managerDni: string;
    managerFirstName: string;
    managerLastName: string;
    managerMemberNumber: string;
    price: string;
    residents: ResidentDto[];
    vehicles: VehicleDto[];
    workshiftId: string;
    amountHorses: string;
  }