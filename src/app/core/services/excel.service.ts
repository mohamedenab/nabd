import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    constructor() {
    }

    exportToExcel(data: any[], fileName: string, sheetName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = {Sheets: {[sheetName]: worksheet}, SheetNames: [sheetName]};
        const arabicHeaders = ['اسم الدواء', 'عدد العلب', 'عدد الشرايط', 'اجمالي السعر']
        arabicHeaders.forEach((header, index) => {
            const cell = XLSX.utils.encode_cell({r: 0, c: index});
            worksheet[cell] = {t: 's', v: header, s: {bold: true}};
        });
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    }
}
