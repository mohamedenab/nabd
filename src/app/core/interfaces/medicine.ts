import { StatisticsComponent } from '../../modules/medicine/statistics/statistics.component';
export interface Medicine {
  id: number;
  nameInEng: string;
  nameInArb: string;
  price: number;
  numberOfPastilleInEachBox: number;
  activeSubstance: string;
  numberOfPatientTakeIt: number;
  medicineStatus: string;
}
export interface Statistics {
  numberOfPatient: number;
  price: number;
  reportMedicinesCount: number;
}

export interface StatisticsResponse {
  data: Statistics;
  status: string;
  timestamp: string;
}
