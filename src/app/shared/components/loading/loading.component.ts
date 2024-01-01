import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  @Input() public text: string = ''

}
