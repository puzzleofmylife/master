import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Package } from 'src/app/models/Package';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  packages: Package[];
  loaded: Boolean;
  @Input() showEnabled: boolean = true;
  @Output() packageUpdateEvt = new EventEmitter<Package>();
  @Input() showDisabled: boolean;

  constructor(private packageService: PackageService) { }

  ngOnInit() {
    this.load();
  }

  public load() {
    this.packages = [];
    this.loaded = false;
    this.packageService.getAllPackages().subscribe(results => {
      this.packages = results.filter(x => x.enabled == this.showEnabled);
      this.loaded = true;
    });
  }

  disable(packageId: number){
    this.packageService.disable(packageId).subscribe(resp => {
      this.packages = this.packages.filter(x => x.id != resp.id);
      this.showDisabled = true;
      this.packageUpdateEvt.emit(resp);
    }, error => {
     console.error(JSON.stringify(error));
    });
  }

  enable(packageId: number){
    this.packageService.enable(packageId).subscribe(resp => {
      //this.packages = this.packages.filter(x => x.id != resp.id);
      this.packageUpdateEvt.emit(resp);
    }, error => {
     console.error(JSON.stringify(error));
    });
  }
}
