import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { StudentCard } from "@/components/students/student-card";
import { StudentsTable } from "@/components/students/students-table";
import { 
  Users, 
  Grid3X3, 
  List, 
  Download, 
  Upload,
  AlertTriangle,
  TrendingUp,
  Filter
} from "lucide-react";
import { mockStudents, mockDashboardMetrics } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

export default function Students() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const { toast } = useToast();
  
  const metrics = mockDashboardMetrics;
  const students = mockStudents;
  
  const highRiskStudents = students.filter(s => s.riskAssessment.overallRisk === 'high');
  const mediumRiskStudents = students.filter(s => s.riskAssessment.overallRisk === 'medium');
  const lowRiskStudents = students.filter(s => s.riskAssessment.overallRisk === 'low');

  const handleViewProfile = (studentId: string) => {
    toast({
      title: "Student Profile",
      description: `Opening detailed profile for student ${studentId}`,
    });
  };

  const handleSendAlert = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    toast({
      title: "Alert Sent",
      description: `Risk alert sent for ${student?.name}. Mentor and guardian have been notified.`,
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">
            Monitor and manage student risk assessments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>
          <Button>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Send Bulk Alert
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{metrics.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card border-danger/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-danger/10">
                <AlertTriangle className="h-5 w-5 text-danger" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Risk</p>
                <p className="text-2xl font-bold text-danger">{metrics.highRiskStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <TrendingUp className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Medium Risk</p>
                <p className="text-2xl font-bold text-warning">{metrics.mediumRiskStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Risk</p>
                <p className="text-2xl font-bold text-success">{metrics.lowRiskStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Controls */}
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-auto">
          <TabsList>
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="high-risk">
              High Risk
              <Badge variant="destructive" className="ml-2">
                {highRiskStudents.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="medium-risk">
              Medium Risk
              <Badge className="ml-2 bg-warning text-warning-foreground">
                {mediumRiskStudents.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="low-risk">
              Low Risk
              <Badge variant="secondary" className="ml-2">
                {lowRiskStudents.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Students Content */}
      <Tabs defaultValue="all" className="w-full">
        <TabsContent value="all" className="space-y-6">
          {viewMode === 'grid' ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewProfile={handleViewProfile}
                  onSendAlert={handleSendAlert}
                />
              ))}
            </div>
          ) : (
            <StudentsTable
              students={students}
              onViewStudent={handleViewProfile}
              onSendAlert={handleSendAlert}
            />
          )}
        </TabsContent>
        
        <TabsContent value="high-risk" className="space-y-6">
          {highRiskStudents.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {highRiskStudents.map((student) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onViewProfile={handleViewProfile}
                    onSendAlert={handleSendAlert}
                  />
                ))}
              </div>
            ) : (
              <StudentsTable
                students={highRiskStudents}
                onViewStudent={handleViewProfile}
                onSendAlert={handleSendAlert}
              />
            )
          ) : (
            <Card className="dashboard-card">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No High Risk Students</h3>
                <p className="text-muted-foreground">
                  Great! No students are currently showing high risk factors.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="medium-risk" className="space-y-6">
          {viewMode === 'grid' ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mediumRiskStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewProfile={handleViewProfile}
                  onSendAlert={handleSendAlert}
                />
              ))}
            </div>
          ) : (
            <StudentsTable
              students={mediumRiskStudents}
              onViewStudent={handleViewProfile}
              onSendAlert={handleSendAlert}
            />
          )}
        </TabsContent>
        
        <TabsContent value="low-risk" className="space-y-6">
          {viewMode === 'grid' ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {lowRiskStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onViewProfile={handleViewProfile}
                  onSendAlert={handleSendAlert}
                />
              ))}
            </div>
          ) : (
            <StudentsTable
              students={lowRiskStudents}
              onViewStudent={handleViewProfile}
              onSendAlert={handleSendAlert}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}