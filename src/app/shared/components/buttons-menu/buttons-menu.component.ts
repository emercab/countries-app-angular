import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Region } from '../../../countries/interfaces/region.type';

@Component({
  selector: 'shared-buttons-menu',
  templateUrl: './buttons-menu.component.html',
  styleUrl: './buttons-menu.component.css'
})
export class ButtonsMenuComponent {

  @Input() public regions: Region[] = []
  @Input() public selectedRegion?: Region

  @Output() public onClick: EventEmitter<Region> = new EventEmitter()


  sendRegion(region: Region): void {
    this.onClick.emit(region)
  }

}
