import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Package } from 'src/app/models/Package';
import { PackageService } from 'src/app/services/package.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private authService: AuthService, private packageService: PackageService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.packageService.getAllPackages().subscribe(results => {
      this.packages = results.filter(x => x.enabled = this.showEnabled);
      this.loaded = true;
    });
  }

  disable(packageId: number){
    this.packageService.disable(packageId).subscribe(resp => {
      //this.packages = this.packages.filter(x => x.id != resp.id);
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
