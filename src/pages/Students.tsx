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
          <h1 className="text-3xl font-bold text-foreground">👨‍🎓 Our Students</h1>
          <p className="text-muted-foreground">
            Let's keep our learners thriving together 🌟
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full">
            <Download className="mr-2 h-4 w-4" />
            📊 Export Report
          </Button>
          <Button variant="outline" className="rounded-full">
            <Upload className="mr-2 h-4 w-4" />
            📂 Import Data
          </Button>
          <Button className="rounded-full bg-gradient-primary">
            <AlertTriangle className="mr-2 h-4 w-4" />
            🔔 Send Care Alert
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-primary">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">🎯 Amazing Learners</p>
                <p className="text-3xl font-bold">{metrics.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card border-danger/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-danger">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">🤗 Need Extra Care</p>
                <p className="text-3xl font-bold text-danger">{metrics.highRiskStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-warning">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">💪 Getting Stronger</p>
                <p className="text-3xl font-bold text-warning">{metrics.mediumRiskStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-success">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">🌟 Doing Great!</p>
                <p className="text-3xl font-bold text-success">{metrics.lowRiskStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Controls */}
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-auto">
          <TabsList className="rounded-full">
            <TabsTrigger value="all" className="rounded-full">👥 Everyone</TabsTrigger>
            <TabsTrigger value="high-risk" className="rounded-full">
              🤗 Need Care
              <Badge variant="destructive" className="ml-2 rounded-full">
                {highRiskStudents.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="medium-risk" className="rounded-full">
              💪 Growing
              <Badge className="ml-2 bg-warning text-warning-foreground rounded-full">
                {mediumRiskStudents.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="low-risk" className="rounded-full">
              🌟 Thriving
              <Badge variant="secondary" className="ml-2 rounded-full">
                {lowRiskStudents.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
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
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-medium mb-2">Fantastic News!</h3>
                <p className="text-muted-foreground">
                  All our students are doing wonderfully. No one needs extra care right now! 
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