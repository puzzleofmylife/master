import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { Package } from '../../models/Package';

@Component({
  selector: 'app-package-create-updates',
  templateUrl: './package-create-updates.component.html',
  styleUrls: ['./package-create-updates.component.css']
})
export class PackageCreateUpdatesComponent implements OnInit {

  packageForm: FormGroup;
  submitted: boolean;
  loading: boolean = false;
  package: Package = new Package();
  heading: string;


  constructor(private packageService: PackageService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.packageForm = this.formBuilder.group({
      packageNameAlias: ['', Validators.required],
      packageDuration: ['', [Validators.required]],
      packageCost: ['', [Validators.required]],
      packageTrials: ['', [Validators.required]]
    });

    const id = this.route.snapshot.params["id"];
    if (id) {
      this.heading = 'Edit package';
      this.loading = true;
      this.packageService.get(id).subscribe(response => {
        this.loading = false;
        this.package.id = id;
        this.package.enabled = response.enabled;
        this.packageForm.controls.packageNameAlias.setValue(response.name);
        this.packageForm.controls.packageDuration.setValue(response.durationDays);
        this.packageForm.controls.packageCost.setValue(response.cost);
        this.packageForm.controls.packageTrials.setValue(response.trialDays);
      }, error => {
        this.loading = false;
        console.error(JSON.stringify(error));
      });
    }  else {
      this.heading = 'Create package';
    }
  }

  onPackageSubmit(): void {
    this.submitted = true;

    if (this.packageForm.valid) {
      this.loading = true;
      this.package.name = this.packageForm.controls.packageNameAlias.value;
      this.package.durationDays = this.packageForm.controls.packageDuration.value;
      this.package.cost = this.packageForm.controls.packageCost.value;
      this.package.trialDays = this.packageForm.controls.packageTrials.value;

      if (this.package.id) {
        this.packageService.update(this.package).subscribe(results => {
          this.router.navigate(['/admin/packages']);
        }, error => {
          this.loading = false;
          console.error(JSON.stringify(error));
        });
      } else {
        this.packageService.create(this.package).subscribe(results => {
          this.router.navigate(['/admin/packages']);
        }, error => {
          this.loading = false;
          console.error(JSON.stringify(error));
        });
      }
    }

  }
}
