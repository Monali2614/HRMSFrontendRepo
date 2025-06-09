import { Component } from '@angular/core';
import { LeaveRequest } from '../../modal/apply-leaves';
import { ApplyLeavesService } from '../../services/apply-leaves.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaves-status',
  standalone: true,
  imports: [CommonModule], // ✅ Register CommonModule here
  templateUrl: './leaves-status.component.html',
  styleUrl: './leaves-status.component.css'
})
export class LeavesStatusComponent {

    leaves: LeaveRequest[] = [];
  employeeId!: number;

  constructor(private applyLeavesService: ApplyLeavesService) {}

  ngOnInit() {
    const empId = localStorage.getItem('employeeId');
    if (empId) {
      this.employeeId = +empId;
      this.getLeaves();
    } else {
      alert('Employee not logged in');
    }
  }

  getLeaves() {
    this.applyLeavesService.getLeavesByEmployeeId(this.employeeId).subscribe({
      next: data => this.leaves = data,
      error: err => console.error(err)
    });
  }

  approveLeave(leaveId: number) {
    this.applyLeavesService.updateLeaveStatus(leaveId, 'APPROVED').subscribe({
      next: () => {
        alert('Leave approved successfully');
        this.getLeaves(); // Refresh leaves list
      },
      error: err => {
        console.error('Error approving leave:', err);
        alert('Failed to approve leave');
      }
    });
  }
}