import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  BookOpen,
  Calendar,
  Target,
  UserCheck
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RiskDistributionChart } from "@/components/dashboard/risk-distribution-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockDashboardMetrics, mockStudents, mockNotifications } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const attendanceTrendData = [
  { month: 'Aug', attendance: 89 },
  { month: 'Sep', attendance: 87 },
  { month: 'Oct', attendance: 85 },
  { month: 'Nov', attendance: 82 },
  { month: 'Dec', attendance: 84 },
  { month: 'Jan', attendance: 84 }
];

const riskTrendData = [
  { month: 'Aug', high: 45, medium: 180, low: 875 },
  { month: 'Sep', high: 52, medium: 195, low: 853 },
  { month: 'Oct', high: 68, medium: 210, low: 822 },
  { month: 'Nov', high: 75, medium: 225, low: 800 },
  { month: 'Dec', high: 82, medium: 238, low: 780 },
  { month: 'Jan', high: 87, medium: 234, low: 926 }
];

export default function Dashboard() {
  const metrics = mockDashboardMetrics;
  const highRiskStudents = mockStudents.filter(s => s.riskAssessment.overallRisk === 'high');
  const recentAlerts = mockNotifications.filter(n => !n.read).slice(0, 5);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Student risk assessment and monitoring overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <UserCheck className="mr-2 h-4 w-4" />
            Schedule Review
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={metrics.totalStudents.toLocaleString()}
          description="Active enrollment"
          icon={Users}
          trend={{ value: 2.3, label: "vs last month", positive: true }}
        />
        <StatsCard
          title="High Risk Students"
          value={metrics.highRiskStudents}
          description={`${((metrics.highRiskStudents / metrics.totalStudents) * 100).toFixed(1)}% of total`}
          icon={AlertTriangle}
          variant="danger"
          trend={{ value: 12.5, label: "vs last month", positive: false }}
        />
        <StatsCard
          title="Average Attendance"
          value={`${metrics.averageAttendance.toFixed(1)}%`}
          description="Institution-wide"
          icon={BookOpen}
          variant={metrics.averageAttendance >= 85 ? "success" : "warning"}
          trend={{ value: 1.2, label: "vs last month", positive: false }}
        />
        <StatsCard
          title="Overall GPA"
          value={metrics.overallGPA.toFixed(2)}
          description="Current semester"
          icon={Target}
          variant={metrics.overallGPA >= 7.5 ? "success" : "warning"}
          trend={{ value: 3.1, label: "vs last semester", positive: true }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <RiskDistributionChart />
        
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 100]} />
                <Tooltip 
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Trend and Alerts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Risk Level Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="high" stackId="a" fill="hsl(var(--danger))" />
                  <Bar dataKey="medium" stackId="a" fill="hsl(var(--warning))" />
                  <Bar dataKey="low" stackId="a" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert) => {
                const student = mockStudents.find(s => s.id === alert.studentId);
                return (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/30">
                    <div className="flex-shrink-0">
                      <Badge variant={
                        alert.priority === 'critical' ? 'destructive' :
                        alert.priority === 'high' ? 'destructive' :
                        alert.priority === 'medium' ? 'secondary' : 'default'
                      }>
                        {alert.priority}
                      </Badge>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{alert.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(alert.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {alert.message}
                      </p>
                      {student && (
                        <p className="text-xs font-medium text-primary">
                          {student.name} ({student.rollNumber})
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
              
              <Button variant="outline" className="w-full mt-4">
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* High Risk Students Quick View */}
      {highRiskStudents.length > 0 && (
        <Card className="dashboard-card border-danger/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-danger">Critical Attention Required</CardTitle>
              <Badge variant="destructive">{highRiskStudents.length} Students</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {highRiskStudents.slice(0, 3).map((student) => (
                <div key={student.id} className="p-4 rounded-lg border border-danger/20 bg-danger-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{student.name}</h4>
                    <Badge variant="destructive">High Risk</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{student.rollNumber}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Attendance:</span>
                      <span className="font-medium text-danger">
                        {student.academicRecord.attendance[0]?.attendancePercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>GPA:</span>
                      <span className="font-medium text-danger">
                        {student.academicRecord.gpa.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Risk Factors:</span>
                      <span className="font-medium text-danger">
                        {student.riskAssessment.riskFactors.length}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3">
                    Review Case
                  </Button>
                </div>
              ))}
            </div>
            {highRiskStudents.length > 3 && (
              <div className="mt-4 text-center">
                <Button variant="outline">
                  View All {highRiskStudents.length} High Risk Students
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}