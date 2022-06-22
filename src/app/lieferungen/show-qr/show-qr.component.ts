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
    this.qrImage.id = "qrid";
    document.getElementById("imageContainer").appendChild(this.qrImage);

    var popup;

    function closePrint() {
      if (popup) {
        popup.close();
      }
    }

    popup = window.open();
    popup.document.write('<iframe src="' + this.qrImage.src + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    popup.onbeforeunload = closePrint;
    popup.onafterprint = closePrint;
    popup.focus(); // Required for IE
    popup.print();
  }

}
