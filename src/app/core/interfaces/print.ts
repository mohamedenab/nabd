// patient.interface.ts

export interface MedicinePrintDto {
  medicineName: string;
  numberBox: number;
  numberPastille: number;
  repetition: number;
}

export interface PatientPrintDto {
  name: string;
  phoneNumber: string[];
  medicinePrintDtos: MedicinePrintDto[];
}

export interface LocationData {
  locationName: string;
  patientPrintDtos: PatientPrintDto[];
}
