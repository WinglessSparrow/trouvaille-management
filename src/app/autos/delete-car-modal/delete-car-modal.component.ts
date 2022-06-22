
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';
import { CarService } from '../../shared/services/car-service';
import { AutosComponent } from '../autos.component';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-delete-car-modal',
  templateUrl: './delete-car-modal.component.html',
  styleUrls: ['./delete-car-modal.component.scss']
})
export class DeleteCarModalComponent {
  @Input() carid: number;
  carService: CarService;
  constructor(cService: CarService, private modalService: NgbModal, public activeModal: NgbActiveModal) {
    this.carService = cService;
  }

  deactivateCar() {
    this.carService.deactivateCar(this.carid);
    this.activeModal.close(this.carid);
  }


}
