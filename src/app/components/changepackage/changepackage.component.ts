import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Package } from 'src/app/models/Package';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-changepackage',
  templateUrl: './changepackage.component.html',
  styleUrls: ['./changepackage.component.css']
})
export class ChangepackageComponent implements OnInit {
  packagesForm: FormGroup;
  activePackages: Package[];
  selectedPackage: Package = new Package();
  submitted = false;
  enabled: boolean = false;

  constructor(
    private packageService: PackageService
  ) { }

  ngOnInit() {

    this.onChangePackageSubmit();
  }

  onChangePackageSubmit() {
    this.enabled = true;

    if (this.packagesForm.valid) {
      this.submitted = true;

        if (this.packagesForm.valid){
          this.packageService.getActivePackages().subscribe(result => {
            this.activePackages = result;
        },
            error => {
                console.error('Could not get active packages: ' + JSON.stringify(error.error));
            });
        }
    }
  }
}
