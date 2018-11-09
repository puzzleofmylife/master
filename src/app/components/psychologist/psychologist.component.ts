import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggedIn } from 'src/app/models/LoggedIn';
import { Psychologist } from 'src/app/models/Psychologist';
import { AuthService } from './../../services/auth.service';
import { PsychoService } from './../../services/psycho.service';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
	selector: 'app-psychologist',
	templateUrl: './psychologist.component.html',
	styleUrls: ['./psychologist.component.css']
})
export class PsychologistComponent implements OnInit {

	psychologist: Psychologist = new Psychologist();
	loggedIn: LoggedIn = new LoggedIn();
	loaded: Boolean = false;

	constructor(private authService: AuthService, private psychoService: PsychoService, private route: ActivatedRoute, private helpersService: HelpersService) { }

	ngOnInit() {

		this.authService.loggedIn().subscribe(x => this.loggedIn = x);

		const id = +(this.route.snapshot.params["id"]);
		this.psychoService.getById(id).subscribe((psychologist) => {
			this.psychologist = psychologist;
			this.psychologist.attachments = this.psychologist.attachments.filter(x => x.typeId != 2);
			this.loaded = true;
		})

	}

	getAttachmentDisplayName(attachment: any): string{
		var attachmentDisplayName = attachment.type + '.' + attachment.fileName.split('.')[1];
		var maxLength =  10;
		attachmentDisplayName = attachmentDisplayName.length > maxLength ? attachmentDisplayName.substring(0, maxLength) + '...' : attachmentDisplayName;
		return attachmentDisplayName;
	}
}
