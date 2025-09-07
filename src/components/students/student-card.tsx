import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MoreHorizontal, 
  Phone, 
  Mail, 
  AlertTriangle, 
  TrendingDown,
  User,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StudentWithRisk, RiskLevel } from "@/types/student";
import { cn } from "@/lib/utils";

interface StudentCardProps {
  student: StudentWithRisk;
  onViewProfile?: (studentId: string) => void;
  onSendAlert?: (studentId: string) => void;
}

const riskLevelConfig = {
  low: {
    label: "Low Risk",
    variant: "default" as const,
    bgClass: "bg-success-muted",
    textClass: "text-success-foreground",
    iconClass: "text-success"
  },
  medium: {
    label: "Medium Risk", 
    variant: "secondary" as const,
    bgClass: "bg-warning-muted",
    textClass: "text-warning-foreground",
    iconClass: "text-warning"
  },
  high: {
    label: "High Risk",
    variant: "destructive" as const,
    bgClass: "bg-danger-muted",
    textClass: "text-danger-foreground",
    iconClass: "text-danger"
  }
};

export function StudentCard({ student, onViewProfile, onSendAlert }: StudentCardProps) {
  const riskConfig = riskLevelConfig[student.riskAssessment.overallRisk];
  const attendancePercentage = student.academicRecord.attendance[0]?.attendancePercentage || 0;
  const currentGPA = student.academicRecord.gpa;

  return (
    <Card className={cn(
      "dashboard-card hover:shadow-[var(--shadow-medium)] transition-all duration-200",
      student.riskAssessment.overallRisk === 'high' && "border-danger/20"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.profileImage} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold text-base leading-none">{student.name}</h3>
              <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
              <p className="text-xs text-muted-foreground">{student.course} • Sem {student.semester}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={riskConfig.variant}
              className={cn("text-xs", riskConfig.bgClass, riskConfig.textClass)}
            >
              {riskConfig.label}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewProfile?.(student.id)}>
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSendAlert?.(student.id)}>
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Send Alert
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Guardian
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Attendance</span>
              <span className={cn(
                "font-medium",
                attendancePercentage < 75 ? "text-danger" : 
                attendancePercentage < 85 ? "text-warning" : "text-success"
              )}>
                {attendancePercentage.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">GPA</span>
              <span className={cn(
                "font-medium",
                currentGPA < 6 ? "text-danger" : 
                currentGPA < 7.5 ? "text-warning" : "text-success"
              )}>
                {currentGPA.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Fees Status</span>
              <span className={cn(
                "font-medium",
                student.financialRecord.pendingFees > 0 ? "text-danger" : "text-success"
              )}>
                {student.financialRecord.pendingFees > 0 ? "Pending" : "Paid"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Risk Factors</span>
              <span className={cn("font-medium", riskConfig.iconClass)}>
                {student.riskAssessment.riskFactors.length}
              </span>
            </div>
          </div>
        </div>

        {student.riskAssessment.riskFactors.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <AlertTriangle className="h-3 w-3" />
              <span>Recent Risk Factors</span>
            </div>
            <div className="space-y-1">
              {student.riskAssessment.riskFactors.slice(0, 2).map((factor) => (
                <div key={factor.id} className="text-xs text-muted-foreground">
                  • {factor.description}
                </div>
              ))}
              {student.riskAssessment.riskFactors.length > 2 && (
                <div className="text-xs text-muted-foreground">
                  +{student.riskAssessment.riskFactors.length - 2} more factors
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => onViewProfile?.(student.id)}
          >
            View Details
          </Button>
          {student.riskAssessment.overallRisk !== 'low' && (
            <Button 
              size="sm" 
              variant={student.riskAssessment.overallRisk === 'high' ? 'default' : 'secondary'}
              onClick={() => onSendAlert?.(student.id)}
            >
              <AlertTriangle className="h-3 w-3 mr-1" />
              Alert
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}