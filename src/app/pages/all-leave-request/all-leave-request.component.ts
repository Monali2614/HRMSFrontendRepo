import { Component } from '@angular/core';
import { LeaveRequest, LeaveStatus } from '../../modal/apply-leaves';
import { ApplyLeavesService } from '../../services/apply-leaves.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-leave-request',
  standalone: true,
   imports: [CommonModule], // ✅ Import CommonModule here

  templateUrl: './all-leave-request.component.html',
  styleUrl: './all-leave-request.component.css'
})
export class AllLeaveRequestComponent {

 leaveRequests: LeaveRequest[] = [];
  leaveStatuses = ['PENDING', 'APPROVED', 'REJECTED'];

  constructor(private ApplyLeavesService: ApplyLeavesService) {}

  ngOnInit() {
    this.fetchLeaves();
  }

  fetchLeaves() {
    this.ApplyLeavesService.getAllLeaves().subscribe({
      next: data => this.leaveRequests = data,
      error: err => console.error('Error fetching leaves', err)
    });
  }

  updateLeaveStatus(leaveId: number, newStatus: string) {
    this.ApplyLeavesService.updateLeaveStatus(leaveId, newStatus).subscribe({
      next: () => this.fetchLeaves(),  // Refresh after update
      error: err => console.error('Failed to update leave status', err)
    });
  }
}