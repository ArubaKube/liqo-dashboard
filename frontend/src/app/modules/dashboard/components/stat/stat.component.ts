import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stat-box',
  templateUrl: './stat.component.html',
  styles: [':host {@apply w-full sm:w-auto}']
})
export class StatComponent implements OnInit {
  @Input() label!: string;
  @Input() value!: string;
  constructor() { }

  ngOnInit(): void { }
}
