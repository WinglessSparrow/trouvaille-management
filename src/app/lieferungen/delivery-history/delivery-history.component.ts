import { Component, Input, OnInit } from '@angular/core';
import { HistoryEntry } from '../../shared/models/historyEntry';
import { DeliveryService } from '../../shared/services/delivery-service';

@Component({
  selector: 'app-delivery-history',
  templateUrl: './delivery-history.component.html',
  styleUrls: ['./delivery-history.component.scss']
})
export class DeliveryHistoryComponent implements OnInit {
  @Input() iddelivery: String;
  historyEntries: HistoryEntry[] = [];
  deliveryService: DeliveryService;

  constructor(dService: DeliveryService) {
    this.deliveryService = dService
  }

  ngOnInit(): void {
    this.getHistory();

  }

  async getHistory() {
    this.historyEntries = await this.deliveryService.getDeliveryHistory(this.iddelivery);
  }

}
