import { Component, OnInit, ViewChild } from '@angular/core';
import { PackagesComponent } from '../packages/packages.component';

@Component({
  selector: 'app-package-manage',
  templateUrl: './package-manage.component.html',
  styleUrls: ['./package-manage.component.css']
})
export class PackageManageComponent implements OnInit {

  @ViewChild('enabledPackagesCmp') enabledPackagesCmp: PackagesComponent;
  @ViewChild('disbaledPackagesCmp') disbaledPackagesCmp: PackagesComponent;
  enabledPackagesFlag: boolean = true;
  disabledPackagesFlag: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  reload() {
    this.enabledPackagesCmp.load();
    this.disbaledPackagesCmp.load();
  }
}
