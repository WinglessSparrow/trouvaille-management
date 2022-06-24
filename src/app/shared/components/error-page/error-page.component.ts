import { Component, Input, OnInit } from '@angular/core';
import { BackendError } from '../../models/error-message';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  @Input() error: BackendError;

  constructor() { }

  ngOnInit(): void {
  }

}
