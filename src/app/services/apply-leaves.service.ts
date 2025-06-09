import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { LeaveRequest } from '../modal/apply-leaves';

@Injectable({
  providedIn: 'root'
})
export class ApplyLeavesService {

  private baseUrl = 'http://localhost:8080/api/leaves';

  constructor(private http: HttpClient) {}

  // Helper function to get headers with Authorization token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');  // JWT token stored in localStorage
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Apply Leave: creates a leave (with optional attachment)
  applyLeave(leaveRequest: LeaveRequest, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(leaveRequest)], { type: 'application/json' })
    );
    if (file) {
      formData.append('file', file);
    }

    return this.http.post(`${this.baseUrl}/createLeave`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  // Get all leaves (for HR panel or admin)
  getAllLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}/getAllLeaves`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get one leave by ID
  getLeaveById(id: number): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${this.baseUrl}/getLeaveById/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Update leave status (e.g., for HR to approve/reject)
  updateLeaveStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateStatusById/${id}/status?status=${status}`, null, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete a leave request
  deleteLeave(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteLeaveById/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get leaves by employee ID
  getLeavesByEmployeeId(empId: number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}/employee/${empId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get leaves for logged-in user (if backend supports token-based filtering)
  getMyLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}/myLeaves`, {
      headers: this.getAuthHeaders()
    });
  }
}
