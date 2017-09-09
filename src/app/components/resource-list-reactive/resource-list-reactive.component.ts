import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Resource } from "../../models/Resource";
import { DataService } from "../../services/data.service";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { GeolocationService } from "../../services/geolocation.service";

@Component({
  selector: 'app-resource-list-reactive',
  templateUrl: './resource-list-reactive.component.html',
  styleUrls: ['./resource-list-reactive.component.scss'],
  providers: [GeolocationService]
})
export class ResourceListReactiveComponent implements OnInit {
  filterForm: FormGroup;
  resources$: Observable<Resource[]>;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.filterForm = this.createFilterForm();
    //get location but set filter to cincinnati, oh since we have no location data
    this.geolocationService.geolocation.subscribe(position => {
      this.filterForm.get('city').setValue('Cincinnati');
      this.filterForm.get('state').setValue('Ohio');
    })
    this.resources$ = this.dataService.resources
      .mergeMap(resources => this.filterResources(resources));
  }

  private filterResources(resources): Observable<Resource[]> {
    return this.filterForm.valueChanges
      .startWith({}) //start with blank filter to show all data
      .debounceTime(300) //give user time to type before triggering  
      .map(filters => {
        const stringFilteredResources = this.filterByStringKeys(resources, filters)
        const phoneFilteredResources = this.filterByPhone(stringFilteredResources, filters.phone);
        //we can also add paging/filtering here and add them as part of filters or maybe a separate form/control
        return phoneFilteredResources;
      })
  }

  private filterByStringKeys(resources: Resource[], filters: Resource): Resource[] {
    const keys = ['name', 'state', 'city']; //current form keys we care about
    keys.forEach(key => {
      resources = this.filterByString(resources, filters[key], key);
    })
    return resources;
  }

  private filterByPhone(resources: Resource[], phone: string): Resource[] {
    if (!phone) return resources;
    const phoneFilter = this.formatPhone(phone);
    return resources.filter(resource => {
      const resourcePhone = this.formatPhone(resource.phone);
      return resourcePhone.indexOf(phoneFilter) !== -1; //string.includes breaks IE
    })
  }

  private filterByString(resources: Resource[], str: string, key: string): Resource[] {
    if (!str) return resources;
    const strFilter = this.formatString(str);
    return resources.filter(resource => {
      const value = this.formatString(resource[key]);
      return value.indexOf(strFilter) !== -1;
    })
  }

  private formatPhone(phone: string): string {
    const phoneRegex = /[^\d]/g;
    return phone.replace(phoneRegex, '');
  }

  private formatString(str: string): string {
    //lowercase to remove case-sensitivity; trim to ignore external white spaces
    return str.toLowerCase().trim();
  }

  private createFilterForm(): FormGroup {
    return this.formBuilder.group({
      name: '',
      phone: '',
      city: '',
      state: ''
    });
  }
}
