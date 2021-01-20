import { Component, OnInit,Input } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { PDF } from '../PDF';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input('pdf') pdf:PDF;
  @Input('lang') lang:string;

  constructor(public dService:DashboardService) { }

  ngOnInit(): void {
  }

}
