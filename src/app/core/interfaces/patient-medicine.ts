export interface patientMedicine {
  id: number;
  medicineId: number;
  nameInEng: string;
  nameInArb: string;
  price: number;
  active: boolean;
  numberOfPastilleInEachBox: number;
  activeSubstance: string;
  numberOfPatientTakeIt: number;
  medicineStatus: string;
}
