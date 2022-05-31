import { Component, Input, OnInit } from '@angular/core';
import QRCode from 'qrcode'

@Component({
  selector: 'app-show-qr',
  templateUrl: './show-qr.component.html',
  styleUrls: ['./show-qr.component.scss']
})
export class ShowQRComponent implements OnInit {
  @Input() code;
  qrImage;

  constructor() { }

  ngOnInit(): void {
    this.qrImage = new Image();
    this.qrImage.src = this.code;
    document.getElementById("imageContainer").appendChild(this.qrImage);
  }

}
