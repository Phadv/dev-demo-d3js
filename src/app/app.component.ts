import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-demo-d3js';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('ja');
  }
  public idSelect = 'all';
  selectOption(value) {
    if (value === 'chart1') {
      this.idSelect = 'graphic';
    } else if (value === 'chart2') {
      this.idSelect = 'graphic2';
    } else if (value === 'chart3') {
      this.idSelect = 'graphic3';
    } else if (value === 'all') {
      this.idSelect = 'all';
    }  else {
      this.idSelect = 'graphic-4';
    }
  }
  print() {
    if (this.idSelect !== 'all') {
      const prtContent = document.getElementById(this.idSelect);
      const el = document.querySelectorAll('.btn-change');
      const WinPrint = window.open('', '', 'left=0,top=0,width=1200,height=900,toolbar=0,scrollbars=0,status=0');
      let html = prtContent.innerHTML;
      for (let i = 0; i <= el.length; i++) {
        html = html.replace('btn-change', '" style="' +
          '    display: none;' +
          '"');
      }
      WinPrint.document.write(html);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    } else {
      window.print();
    }
  }

}
