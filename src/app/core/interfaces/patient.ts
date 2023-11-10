export interface Patient {
  id: number;
  name: string;
  numberOfFamilyMembers: number;
  mobileNumbers: string[];
}

export interface patientMedicine {
  id: number;
  nameInEng: string;
  nameInArb: string;
  price: number;
  numberOfPastilleInEachBox: number;
  activeSubstance: string;
  numberOfPatientTakeIt: number;
  medicineStatus: string;
}

