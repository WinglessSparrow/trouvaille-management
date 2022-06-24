import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-err-page',
  templateUrl: './err-page.component.html',
  styleUrls: ['./err-page.component.scss']
})
export class ErrPageComponent implements OnInit {

  @Input() errorMsg: string;
  @Input() errorTitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
