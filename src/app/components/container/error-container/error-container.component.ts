import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-container',
  templateUrl: './error-container.component.html',
  styleUrls: ['./error-container.component.scss']
})
export class ErrorContainerComponent implements OnInit {

  @Output() refreshCall = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
