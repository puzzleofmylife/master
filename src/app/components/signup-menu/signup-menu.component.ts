import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-menu',
  templateUrl: './signup-menu.component.html',
  styleUrls: ['./signup-menu.component.css']
})
export class SignupMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  open: boolean;

  onToggle($event: Event) {
    $event.stopPropagation();
    this.open = true;
  }
}
