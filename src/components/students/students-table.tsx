import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StudentWithRisk } from "@/types/student";
import { cn } from "@/lib/utils";

interface StudentsTableProps {
  students: StudentWithRisk[];
  onViewStudent?: (studentId: string) => void;
  onSendAlert?: (studentId: string) => void;
}

export function StudentsTable({ students, onViewStudent, onSendAlert }: StudentsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRisk = riskFilter === "all" || student.riskAssessment.overallRisk === riskFilter;
    const matchesCourse = courseFilter === "all" || student.course === courseFilter;
    
    return matchesSearch && matchesRisk && matchesCourse;
  });

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'default';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-danger';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Mechanical Engineering">Mechanical Eng.</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {filteredStudents.length} of {students.length} students
        </div>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead className="text-center">Attendance</TableHead>
              <TableHead className="text-center">GPA</TableHead>
              <TableHead className="text-center">Fees</TableHead>
              <TableHead className="text-center">Factors</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => {
              const attendance = student.academicRecord.attendance[0]?.attendancePercentage || 0;
              const gpa = student.academicRecord.gpa;
              const hasPendingFees = student.financialRecord.pendingFees > 0;
              
              return (
                <TableRow 
                  key={student.id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => onViewStudent?.(student.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.profileImage} />
                        <AvatarFallback className="text-xs">
                          {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.rollNumber}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.course}</div>
                      <div className="text-sm text-muted-foreground">Semester {student.semester}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRiskBadgeVariant(student.riskAssessment.overallRisk)}>
                      {student.riskAssessment.overallRisk.charAt(0).toUpperCase() + student.riskAssessment.overallRisk.slice(1)} Risk
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className={cn(
                        "font-medium",
                        attendance < 75 ? "text-danger" : 
                        attendance < 85 ? "text-warning" : "text-success"
                      )}>
                        {attendance.toFixed(1)}%
                      </span>
                      {attendance < 80 && (
                        <TrendingDown className="h-3 w-3 text-danger" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={cn(
                      "font-medium",
                      gpa < 6 ? "text-danger" : 
                      gpa < 7.5 ? "text-warning" : "text-success"
                    )}>
                      {gpa.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={hasPendingFees ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {hasPendingFees ? "Pending" : "Paid"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className={cn(
                        "font-medium",
                        getRiskColor(student.riskAssessment.overallRisk)
                      )}>
                        {student.riskAssessment.riskFactors.length}
                      </span>
                      {student.riskAssessment.riskFactors.length > 2 && (
                        <AlertTriangle className="h-3 w-3 text-warning" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onViewStudent?.(student.id);
                        }}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          onSendAlert?.(student.id);
                        }}>
                          Send Alert
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          Contact Guardian
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          Schedule Meeting
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      {filteredStudents.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No students found matching your criteria.
        </div>
      )}
    </div>
  );
}