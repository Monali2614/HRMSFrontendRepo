// leave-request.model.ts
export type LeaveType = 'SICK' | 'CASUAL' | 'PAID' | 'UNPAID';
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface LeaveRequest {
  leaveId?: number;
  employeeId: number;
  fromDate: string; // Use ISO format dates ("YYYY-MM-DD")
  toDate: string;
  reason: string;
  applyingTo: string;
  ccTo: string[];
  contactDetails: string;
  leaveType: LeaveType;
  status?: LeaveStatus;
}
