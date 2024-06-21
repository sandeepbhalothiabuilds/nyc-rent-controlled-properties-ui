import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.css']
})
export class AddressTableComponent {
  @Input() records: any[] = [];
}
