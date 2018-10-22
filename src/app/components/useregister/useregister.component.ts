import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/User';

@Component({
    templateUrl: 'useregister.component.html',
  })



export class UserRegisterComponent implements OnInit{
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    

}