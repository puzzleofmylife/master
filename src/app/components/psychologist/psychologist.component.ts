import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggedIn } from 'src/app/models/LoggedIn';
import { Psychologist } from 'src/app/models/Psychologist';

import { AuthService } from './../../services/auth.service';
import { PsychoService } from './../../services/psycho.service';

@Component({
	selector: 'app-psychologist',
	templateUrl: './psychologist.component.html',
	styleUrls: ['./psychologist.component.css']
})
export class PsychologistComponent implements OnInit {

	psychologist: Psychologist = new Psychologist();
	loggedIn: LoggedIn = new LoggedIn();

	constructor(private authService: AuthService, private psychoService: PsychoService, private route: ActivatedRoute) { }

	ngOnInit() {

		this.authService.loggedIn().subscribe(x => this.loggedIn = x);

		const id = +(this.route.snapshot.params["id"]);
		this.psychoService.getById(id).subscribe((psychologist) => {
			this.psychologist = psychologist;

		})

	}

}
