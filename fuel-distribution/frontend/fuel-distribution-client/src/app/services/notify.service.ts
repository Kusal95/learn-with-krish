import { Injectable } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor() {
    Report.init({
      backOverlayColor: 'rgba(0,0,0,0.5)',
      backOverlayClickToClose: true,
      messageFontSize: '17px',
      success: {
        backOverlayColor: 'rgba(0,0,0,0.5)',
        buttonBackground: '#0984e3',
      },
    });
    Confirm.init({
      titleFontSize: '17px',
      titleColor: '#0984e3',
      messageFontSize: '17px',
      okButtonBackground: '#0984e3',
    });
    Notify.init({
      timeout: 10000,
      clickToClose: true,
      fontSize: '15px',
    });
  }

  confirm(title: string, message: string, callback: () => void) {
    Confirm.show(title, message, 'Yes', 'No', callback);
  }

  notifySuccess(message: string) {
    Notify.success(message);
  }

  ReportSuccess(
    title: string,
    message: string,
    buttonText: string,
    callback: () => void
  ) {
    Report.success(title, message, buttonText, callback);
  }
}
