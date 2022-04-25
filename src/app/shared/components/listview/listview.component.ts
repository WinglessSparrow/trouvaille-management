import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent implements OnInit {
  @Input() list = [];
  @Input() iconName;
  icon: SafeHtml;
  icons =
    {
      mitarbeiter: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-file-earmark-person" viewBox="0 0 16 16"> <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z" /></svg>`,
      lieferungen: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-box2" viewBox="0 0 16 16"><path d="M2.95.4a1 1 0 0 1 .8-.4h8.5a1 1 0 0 1 .8.4l2.85 3.8a.5.5 0 0 1 .1.3V15a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4.5a.5.5 0 0 1 .1-.3L2.95.4ZM7.5 1H3.75L1.5 4h6V1Zm1 0v3h6l-2.25-3H8.5ZM15 5H1v10h14V5Z" /> </svg>`
    }


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log("iconName", this.iconName);
    console.log("icons", this.icons);
    console.log("icon:", this.icons['lieferwagen']);
    this.icon = this.sanitizer.bypassSecurityTrustHtml(this.icons[this.iconName]);

  }

}
