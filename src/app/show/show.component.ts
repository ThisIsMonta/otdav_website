import { Component, Input, OnInit } from '@angular/core';
import { PDF } from '../PDF';
import {fadeIn} from '../animations';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  animations:[fadeIn]
})
export class ShowComponent implements OnInit {

  @Input('imageSrc') imageSrc:string;
  showModal:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
