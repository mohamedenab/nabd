export interface Patient {
  id: string;
  name: string;
  locationDto: { id: number, locationName: string };
  nameOfParent: string;
  nationalID: string;
  numberOfFamilyMembers: number;
  nationalIDForParent: string;
  maritalStatus: string;
  mobileNumbers: string[];
  address: string;
  addressLink: string;
  volunteerName: string;
  volunteerMobileNumber: string;
  periodOfDiscovery: string;
  dateOfBeginningOfDecision: string;
  dateOfHelp: string;
  discoveryDetailsWithImageLink: string;
  thereInsurance: string;
  locationsId: number;
  specializations?: (number)[] | null;
  active: boolean;
}


export interface PatientMedicine {
  id: number;
  medicineName: string;
  note: string;
  price: number;
  numberOfPastilleInEachBox: number;
  activeSubstance: string;
  numberOfPatientTakeIt: number;
  medicineStatus: string;
  startIn: number;
}

export interface patientHistory {
  id: number;
  historyType: HistoryType;
  comment: string;
  link: string;
  startAt: string;
  updatedAt: string;
}

export enum HistoryType {
  ONCE = 'ONCE',
  MONTHLY = 'MONTHLY'
}
