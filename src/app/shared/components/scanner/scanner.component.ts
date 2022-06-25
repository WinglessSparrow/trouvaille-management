import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import jsQR, { QRCode } from 'jsqr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { BackendError } from '../../models/error-message';
//import { systemPreferences } from 'electron';

@Component({
  selector: 'scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit, OnDestroy {
  constructor(private modalService: NgbModal) {

  }
  @Input() isActive: Boolean = false;
  @Output() isActiveChange = new EventEmitter();

  //communicate new QR Code
  @Output() qrCodeRead = new EventEmitter<String>();

  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  //a bunch of intermediate objects
  private canvasElement: any;
  private canvasContext: any;
  private videoElement: any;

  ngOnInit(): void {
    // TODO: ask for webcam permission in production not working
    systemPreferences.getMediaAccessStatus("camera");
  }

  ngOnDestroy() {
    this.stopScan();
  }

  //init the variables, start scanning
  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;

    this.startScan();
  }

  public async startScan() {
    //getting the video Stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    }).catch(e => {
      var error: BackendError = { title: "Oops! etwas ist schiefgelaufen..", error: { warnings: ["Versuchen Sie, ihre Webcam einzuschalten und ihrem Browser Zugriff zu ermöglichen."], error: { error: "asdf", message: "asdf" } } }
      const modalRef = this.modalService.open(ErrorPageComponent, { centered: true });
      modalRef.componentInstance.error = error;
    });

    //setting the stream to video tag + configure
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();



    //start QR recognition

    // TODO: ADD THIS LINE FOR SCANNER!!!!
    //requestAnimationFrame(this.scan.bind(this));

  }

  public async stopScan() {
    this.videoElement.srcObject.getTracks()[0].stop();
  }

  private async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      this.isActive = true;
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      //recognition through library
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      //check if any found
      if (code != null) {
        //stop the vot... scanning
        this.isActive = false;

        //found, pass Data upwards
        this.qrCodeRead.emit(code.data);
        this.stopScan();
      } else {
        if (this.isActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }
}
