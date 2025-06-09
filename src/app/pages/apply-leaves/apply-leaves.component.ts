import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LeaveRequest, LeaveStatus, LeaveType } from '../../modal/apply-leaves';
import { Observable } from 'rxjs';
import { ApplyLeavesService } from '../../services/apply-leaves.service';

@Component({
  selector: 'app-apply-leaves',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css'] 
})
export class ApplyLeavesComponent {
  leaveForm: FormGroup;
  selectedFile: File | null = null;
  leaveTypes: LeaveType[] = ['SICK', 'CASUAL', 'PAID', 'UNPAID'];

  constructor(private fb: FormBuilder, private ApplyLeavesService: ApplyLeavesService) {
    this.leaveForm = this.fb.group({
      employeeId: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.required],
      applyingTo: ['', [Validators.required, Validators.email]],
      ccTo: [''], // Enter comma-separated emails
      contactDetails: ['', Validators.required],
      leaveType: ['', Validators.required]
    });
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitForm(): void {
    if (this.leaveForm.invalid) {
      return;
    }

    const formVal = this.leaveForm.value;
    // Convert ccTo string into an array (split by commas)
    const leaveRequest: LeaveRequest = {
      ...formVal,
      ccTo: formVal.ccTo ? formVal.ccTo.split(',').map((s: string) => s.trim()) : []
    };

    this.ApplyLeavesService.applyLeave(leaveRequest, this.selectedFile || undefined).subscribe({
      next: (res) => {
        alert('Leave applied successfully.');
        this.leaveForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Error applying leave:', err);
        alert('Error applying leave: ' + err.message);
      }
    });
  }
}