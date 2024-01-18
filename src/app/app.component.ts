import {AfterViewInit, Component, inject} from '@angular/core';
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private toast: HotToastService = inject(HotToastService);

  ngAfterViewInit() {
    this.toast.success('جدد النيه واخلص في العمل وتذكر ان الله اصطفاك لخدمة غيرك فا اللهم استعملنا ولا تستبدلنا', {
      duration: 5000,
      position: "top-center",
      theme: "snackbar",
      className: 'print:hidden'
    });

  }

}
