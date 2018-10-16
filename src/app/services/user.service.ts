import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  confirmEmail(userId: string, confirmToken: string): Observable<any> {
    return this.http.get(environment.baseAPIURL + '/api/User/confirmemail', { params: {userId: userId, confirmToken: confirmToken} });
  }
/*
  getQuestions():Observable<any>{
    return this.http.get(environment.baseAPIURL +'/api/User/patient/questions')
  }
*/   
  getQuestions():any{
    return [
      {
        "question": "Have you consulted a psychologist before?",
        "order": 1,
        "enabled": true,
        "type": 0,
        "multipleChoiceOptions": null,
        "id": 1
      },
      {
        "question": "What is your main concern for visiting Puzzle Of My Life?",
        "order": 2,
        "enabled": true,
        "type": 1,
        "multipleChoiceOptions": "Relationship;Work;Abuse;Financial;Depression / Anxiety / Stress;Other",
        "id": 2
      },
      {
        "question": "Are you sleeping and eating well?",
        "order": 3,
        "enabled": true,
        "type": 0,
        "multipleChoiceOptions": null,
        "id": 3
      },
      {
        "question": "Have you ever had thoughts of wanting to hurt yourself or others?",
        "order": 4,
        "enabled": true,
        "type": 0,
        "multipleChoiceOptions": null,
        "id": 4
      },
      {
        "question": "Do you have anyone to talk to when faced with challenges?",
        "order": 5,
        "enabled": true,
        "type": 0,
        "multipleChoiceOptions": null,
        "id": 5
      }
    ]
  
  }

  
}
