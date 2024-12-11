import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileVerificationService {
  private apiUrl = 'https://localhost:7274/api'; 

  constructor(private http: HttpClient) {}

  verifyFile(fileId: string, ruleId: string): Observable<any> {
    const request = {
      FileId: fileId,  
      RuleId: ruleId   
    };


    console.log(request);
    return this.http.post(`${this.apiUrl}/CourseWorkFileVerification/verify`, request);
  }
}