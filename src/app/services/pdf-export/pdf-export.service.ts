import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AlarmResponse from '../../models/AlarmResponse'; 
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  constructor(private translate: TranslateService) {}

  exportAlarmsToPdf(alarms: AlarmResponse[],lang: 'es' | 'en' = 'es'): void {
    const doc = new jsPDF();

    // Obtener todas las traducciones necesarias
 const title = this.translate.instant('PDF.Title');
const headers = [
  this.translate.instant('PDF.Create'),
  this.translate.instant('PDF.WellName'),
  this.translate.instant('PDF.SensorId'),
  this.translate.instant('PDF.Type'),
  this.translate.instant('PDF.Description'),
  this.translate.instant('PDF.Action'),
  this.translate.instant('PDF.Status')
];
const resolvedText = this.translate.instant('PDF.Resolved');
const unresolvedText = this.translate.instant('PDF.Unresolved');
const filePrefix = this.translate.instant('PDF.FilenamePrefix');

    doc.setFontSize(16);
    doc.text(title, 14, 20);

    const body = alarms.map(alarm => [
      alarm.createdAt,
      alarm.oilWellName,
      alarm.sensorId,
      alarm.alarmType,
      alarm.alarmDescrip,
      alarm.alarmAction,
      alarm.alarmIsdone ? resolvedText : unresolvedText
    ]);

    autoTable(doc, {
      startY: 30,
      head: [headers],
      body,
    });

    const formattedDate = new Intl.DateTimeFormat(this.translate.currentLang === 'en' ? 'en-GB' : 'es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).format(new Date());

    doc.save(`${filePrefix}_${formattedDate}.pdf`);
  }
}
