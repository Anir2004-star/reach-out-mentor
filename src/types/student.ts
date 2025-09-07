export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  course: string;
  semester: number;
  batch: string;
  contactNumber: string;
  guardianContact: string;
  address: string;
  admissionDate: string;
  profileImage?: string;
}

export interface AcademicRecord {
  studentId: string;
  subject: string;
  testScores: TestScore[];
  attendance: AttendanceRecord[];
  assignments: Assignment[];
  semester: number;
  gpa: number;
}

export interface TestScore {
  id: string;
  testName: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  date: string;
  attempts: number;
  passed: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  subject: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  submissionDate?: string;
  status: 'submitted' | 'pending' | 'overdue';
  marks?: number;
  totalMarks: number;
}

export interface FinancialRecord {
  studentId: string;
  totalFees: number;
  paidFees: number;
  pendingFees: number;
  paymentHistory: PaymentRecord[];
  scholarships: Scholarship[];
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  semester: number;
}

export interface Scholarship {
  id: string;
  name: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired';
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskAssessment {
  studentId: string;
  overallRisk: RiskLevel;
  academicRisk: RiskLevel;
  attendanceRisk: RiskLevel;
  financialRisk: RiskLevel;
  lastUpdated: string;
  riskFactors: RiskFactor[];
  recommendations: string[];
}

export interface RiskFactor {
  id: string;
  category: 'academic' | 'attendance' | 'financial' | 'behavioral';
  description: string;
  severity: RiskLevel;
  impact: number; // 1-10 scale
  detected: string;
}

export interface StudentWithRisk extends Student {
  riskAssessment: RiskAssessment;
  academicRecord: AcademicRecord;
  financialRecord: FinancialRecord;
}

export interface DashboardMetrics {
  totalStudents: number;
  highRiskStudents: number;
  mediumRiskStudents: number;
  lowRiskStudents: number;
  averageAttendance: number;
  overallGPA: number;
  pendingFees: number;
  recentDropouts: number;
}

export interface NotificationAlert {
  id: string;
  studentId: string;
  type: 'academic' | 'attendance' | 'financial' | 'general';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
  mentorId?: string;
}