import { Component, Injectable, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Resource } from '../../models/Resource';
import { ResourceFilterPipe } from '../../pipes/resource-filter.pipe';
import 'rxjs/add/operator/min';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {
  numberOfResources: number;
  limit: number;
  page: number = 1;
  resources: Resource[];
  filter: Resource = new Resource();

  constructor(private dataService:DataService) { }

  ngOnInit() {    
    this.dataService.getResources().subscribe(
      (resources: Resource[]) => {
        this.resources = resources;
        this.numberOfResources = this.resources.length;
        this.limit = this.resources.length; // Start off by showing all resources on a single page.
    });
  }
}
