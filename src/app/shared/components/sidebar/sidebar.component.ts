import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  private menuOption: string = 'by-capital'

  menuOptionSelected(option: string) {
    this.menuOption = option
  }

  menuOptionActive(option: string) {
    return this.menuOption === option
  }

}
