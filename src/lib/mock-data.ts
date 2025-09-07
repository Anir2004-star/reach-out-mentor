import { StudentWithRisk, DashboardMetrics, NotificationAlert } from "@/types/student";

// Generate realistic mock data for the application
export const mockStudents: StudentWithRisk[] = [
  {
    id: "ST001",
    name: "Arjun Sharma",
    email: "arjun.sharma@institute.edu",
    rollNumber: "CS21001",
    course: "Computer Science",
    semester: 6,
    batch: "2021-2025",
    contactNumber: "+91 9876543210",
    guardianContact: "+91 9876543211",
    address: "123 Tech Street, Bangalore, Karnataka",
    admissionDate: "2021-08-15",
    riskAssessment: {
      studentId: "ST001",
      overallRisk: "high",
      academicRisk: "high",
      attendanceRisk: "high",
      financialRisk: "low",
      lastUpdated: "2024-01-15",
      riskFactors: [
        {
          id: "RF001",
          category: "attendance",
          description: "Attendance dropped to 65% (below 75% threshold)",
          severity: "high",
          impact: 8,
          detected: "2024-01-10"
        },
        {
          id: "RF002", 
          category: "academic",
          description: "Failed 2 consecutive tests in Data Structures",
          severity: "high",
          impact: 9,
          detected: "2024-01-08"
        }
      ],
      recommendations: [
        "Immediate counselor intervention required",
        "Contact guardian for discussion",
        "Provide additional academic support"
      ]
    },
    academicRecord: {
      studentId: "ST001",
      subject: "Computer Science",
      testScores: [
        {
          id: "TS001",
          testName: "Mid-Term Exam",
          subject: "Data Structures", 
          marksObtained: 35,
          totalMarks: 100,
          date: "2024-01-05",
          attempts: 2,
          passed: false
        }
      ],
      attendance: [
        {
          id: "AT001",
          studentId: "ST001",
          subject: "All Subjects",
          date: "2024-01-15",
          status: "absent",
          totalClasses: 120,
          attendedClasses: 78,
          attendancePercentage: 65.0
        }
      ],
      assignments: [],
      semester: 6,
      gpa: 5.2
    },
    financialRecord: {
      studentId: "ST001",
      totalFees: 150000,
      paidFees: 150000,
      pendingFees: 0,
      paymentHistory: [],
      scholarships: []
    }
  },
  {
    id: "ST002", 
    name: "Priya Patel",
    email: "priya.patel@institute.edu",
    rollNumber: "ME21015",
    course: "Mechanical Engineering",
    semester: 6,
    batch: "2021-2025",
    contactNumber: "+91 9876543212",
    guardianContact: "+91 9876543213", 
    address: "456 Engineering Lane, Pune, Maharashtra",
    admissionDate: "2021-08-15",
    riskAssessment: {
      studentId: "ST002",
      overallRisk: "medium",
      academicRisk: "low",
      attendanceRisk: "medium",
      financialRisk: "medium",
      lastUpdated: "2024-01-15",
      riskFactors: [
        {
          id: "RF003",
          category: "financial",
          description: "Semester fee payment overdue by 2 weeks",
          severity: "medium",
          impact: 6,
          detected: "2024-01-01"
        }
      ],
      recommendations: [
        "Follow up on fee payment",
        "Check for financial aid eligibility"
      ]
    },
    academicRecord: {
      studentId: "ST002",
      subject: "Mechanical Engineering",
      testScores: [],
      attendance: [
        {
          id: "AT002",
          studentId: "ST002", 
          subject: "All Subjects",
          date: "2024-01-15",
          status: "present",
          totalClasses: 115,
          attendedClasses: 92,
          attendancePercentage: 80.0
        }
      ],
      assignments: [],
      semester: 6,
      gpa: 7.8
    },
    financialRecord: {
      studentId: "ST002",
      totalFees: 140000,
      paidFees: 110000,
      pendingFees: 30000,
      paymentHistory: [],
      scholarships: []
    }
  },
  {
    id: "ST003",
    name: "Rahul Kumar",
    email: "rahul.kumar@institute.edu", 
    rollNumber: "EC21027",
    course: "Electronics",
    semester: 6,
    batch: "2021-2025",
    contactNumber: "+91 9876543214",
    guardianContact: "+91 9876543215",
    address: "789 Circuit Road, Chennai, Tamil Nadu",
    admissionDate: "2021-08-15",
    riskAssessment: {
      studentId: "ST003",
      overallRisk: "low",
      academicRisk: "low", 
      attendanceRisk: "low",
      financialRisk: "low",
      lastUpdated: "2024-01-15",
      riskFactors: [],
      recommendations: []
    },
    academicRecord: {
      studentId: "ST003",
      subject: "Electronics",
      testScores: [],
      attendance: [
        {
          id: "AT003",
          studentId: "ST003",
          subject: "All Subjects", 
          date: "2024-01-15",
          status: "present",
          totalClasses: 118,
          attendedClasses: 115,
          attendancePercentage: 97.5
        }
      ],
      assignments: [],
      semester: 6,
      gpa: 8.9
    },
    financialRecord: {
      studentId: "ST003",
      totalFees: 145000,
      paidFees: 145000,
      pendingFees: 0,
      paymentHistory: [],
      scholarships: []
    }
  },
  {
    id: "ST004",
    name: "Sneha Reddy",
    email: "sneha.reddy@institute.edu",
    rollNumber: "CV21033",
    course: "Civil Engineering", 
    semester: 6,
    batch: "2021-2025",
    contactNumber: "+91 9876543216",
    guardianContact: "+91 9876543217",
    address: "321 Construction Avenue, Hyderabad, Telangana",
    admissionDate: "2021-08-15",
    riskAssessment: {
      studentId: "ST004",
      overallRisk: "medium",
      academicRisk: "medium",
      attendanceRisk: "low", 
      financialRisk: "low",
      lastUpdated: "2024-01-15",
      riskFactors: [
        {
          id: "RF004",
          category: "academic",
          description: "GPA dropped from 8.2 to 6.8 in current semester",
          severity: "medium",
          impact: 7,
          detected: "2024-01-12"
        }
      ],
      recommendations: [
        "Academic counseling recommended",
        "Monitor study patterns"
      ]
    },
    academicRecord: {
      studentId: "ST004",
      subject: "Civil Engineering",
      testScores: [],
      attendance: [
        {
          id: "AT004",
          studentId: "ST004",
          subject: "All Subjects",
          date: "2024-01-15", 
          status: "present",
          totalClasses: 112,
          attendedClasses: 98,
          attendancePercentage: 87.5
        }
      ],
      assignments: [],
      semester: 6,
      gpa: 6.8
    },
    financialRecord: {
      studentId: "ST004",
      totalFees: 135000,
      paidFees: 135000,
      pendingFees: 0,
      paymentHistory: [],
      scholarships: []
    }
  },
  {
    id: "ST005",
    name: "Vikram Singh",
    email: "vikram.singh@institute.edu",
    rollNumber: "CS21045",
    course: "Computer Science",
    semester: 6,
    batch: "2021-2025", 
    contactNumber: "+91 9876543218",
    guardianContact: "+91 9876543219",
    address: "567 Software City, Noida, Uttar Pradesh",
    admissionDate: "2021-08-15",
    riskAssessment: {
      studentId: "ST005",
      overallRisk: "low",
      academicRisk: "low",
      attendanceRisk: "low",
      financialRisk: "low",
      lastUpdated: "2024-01-15",
      riskFactors: [],
      recommendations: []
    },
    academicRecord: {
      studentId: "ST005",
      subject: "Computer Science",
      testScores: [],
      attendance: [
        {
          id: "AT005",
          studentId: "ST005",
          subject: "All Subjects",
          date: "2024-01-15",
          status: "present",
          totalClasses: 120,
          attendedClasses: 108,
          attendancePercentage: 90.0
        }
      ],
      assignments: [],
      semester: 6,
      gpa: 8.5
    },
    financialRecord: {
      studentId: "ST005",
      totalFees: 150000,
      paidFees: 150000,
      pendingFees: 0,
      paymentHistory: [],
      scholarships: []
    }
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalStudents: 1247,
  highRiskStudents: 87,
  mediumRiskStudents: 234,
  lowRiskStudents: 926,
  averageAttendance: 84.2,
  overallGPA: 7.6,
  pendingFees: 2340000,
  recentDropouts: 12
};

export const mockNotifications: NotificationAlert[] = [
  {
    id: "N001",
    studentId: "ST001",
    type: "academic",
    priority: "critical",
    title: "Critical Risk Alert",
    message: "Arjun Sharma showing multiple high-risk factors requiring immediate intervention",
    timestamp: "2024-01-15T09:30:00Z",
    read: false,
    actionRequired: true,
    mentorId: "M001"
  },
  {
    id: "N002", 
    studentId: "ST002",
    type: "financial",
    priority: "medium",
    title: "Fee Payment Overdue",
    message: "Priya Patel has pending semester fees of ₹30,000",
    timestamp: "2024-01-14T14:45:00Z",
    read: false,
    actionRequired: true,
    mentorId: "M002"
  },
  {
    id: "N003",
    studentId: "ST004",
    type: "academic", 
    priority: "medium",
    title: "GPA Decline Detected",
    message: "Sneha Reddy's GPA has dropped significantly - academic support recommended",
    timestamp: "2024-01-13T11:20:00Z",
    read: true,
    actionRequired: false,
    mentorId: "M001"
  }
];