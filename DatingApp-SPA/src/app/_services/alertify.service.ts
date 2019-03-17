import { Injectable } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
constructor() { }

confirm(message: string, okcallblack: () => any) {
  alertify.confirm(Message, function(e) {
    if (e) {
      okcallblack();
    } else {}
  });
}

success(message: string ) {
  alertify.success(message);
}

error(message: string ) {
  alertify.error(message);
}
warning(message: string ) {
  alertify.warning(message);
}
message(message: string ) {
  alertify.message(message);
}
}
