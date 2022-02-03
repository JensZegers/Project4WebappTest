import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from './assignment';
import { PostAssignment } from './assignment-form/post-assignment';
import { GlobalConstrants } from './globalConstrants';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private httpClient: HttpClient) { }

  getAssignments(): Observable<Assignment[]> {
    return this.httpClient.get<Assignment[]>(GlobalConstrants.apiUrl + "/assignments");
  }

  getAssignmentById(id: number): Observable<Assignment>{
    return this.httpClient.get<Assignment>(GlobalConstrants.apiUrl+"/assignments/"+ id);
  }
  postAssignment(assignment: PostAssignment): Observable<Assignment> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Assignment>(GlobalConstrants.apiUrl+ "/assignments", assignment, {headers: headers});
  }

  putAssigment(id:number, assignment: PostAssignment): Observable<Assignment> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Assignment>(GlobalConstrants.apiUrl+ "/assignments/" + id, assignment, {headers: headers});
  }

  deleteAssigments(id: number): Observable<Assignment> {
    return this.httpClient.delete<Assignment>(GlobalConstrants.apiUrl+ "/assignments/" + id);
  }
}
