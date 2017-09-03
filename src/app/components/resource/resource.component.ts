import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Resource } from '../../models/Resource';
import { ResourceFilterPipe } from '../../pipes/resource-filter.pipe';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  @Input('resource') resource:Resource;
  
  constructor(
    public dataService:DataService
  ) {}

  ngOnInit() {}

}
