import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent implements OnInit {
  @Input() buttonTitle = '';

  constructor() { }

  ngOnInit(): void {
  }

}
