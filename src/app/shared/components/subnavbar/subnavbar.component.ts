import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subnavbar',
  templateUrl: './subnavbar.component.html',
  styleUrls: ['./subnavbar.component.scss']
})

export class SubnavbarComponent implements OnInit {
  @Input() topTitle: string | undefined;
  @Input() midTitle: string | undefined;
  @Input() botTitle: string | undefined;

  topCon = false;
  midCon = false;
  botCon = false;

  active = 'top';

  constructor() {

  }

  ngOnInit(): void {
    if (this.topTitle !== undefined) {
      this.topCon = true;
    } if (this.midTitle !== undefined) {
      this.midCon = true;
    } if (this.botTitle !== undefined) {
      this.botCon = true;
    }
  }

}
