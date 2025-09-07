import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BookOpen, 
  AlertTriangle,
  Download,
  Calendar,
  Target
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";

const performanceTrendData = [
  { month: 'Jul', avgGPA: 7.8, attendance: 88, dropouts: 3 },
  { month: 'Aug', avgGPA: 7.6, attendance: 89, dropouts: 2 },
  { month: 'Sep', avgGPA: 7.4, attendance: 87, dropouts: 4 },
  { month: 'Oct', avgGPA: 7.2, attendance: 85, dropouts: 6 },
  { month: 'Nov', avgGPA: 7.1, attendance: 82, dropouts: 8 },
  { month: 'Dec', avgGPA: 7.3, attendance: 84, dropouts: 5 },
  { month: 'Jan', avgGPA: 7.6, attendance: 84, dropouts: 3 }
];

const courseWiseRiskData = [
  { course: 'Computer Science', high: 12, medium: 45, low: 180 },
  { course: 'Mechanical Eng.', high: 8, medium: 32, low: 95 },
  { course: 'Electronics', high: 15, medium: 38, low: 142 },
  { course: 'Civil Engineering', high: 18, medium: 42, low: 98 },
  { course: 'Electrical Eng.', high: 10, medium: 28, low: 87 }
];

const attendanceDistribution = [
  { range: '90-100%', students: 420, color: 'hsl(var(--success))' },
  { range: '80-89%', students: 380, color: 'hsl(var(--warning))' },
  { range: '70-79%', students: 200, color: 'hsl(var(--danger))' },
  { range: '<70%', students: 87, color: 'hsl(var(--destructive))' }
];

const riskPredictionData = [
  { week: 'Week 1', predicted: 85, actual: 82 },
  { week: 'Week 2', predicted: 88, actual: 87 },
  { week: 'Week 3', predicted: 92, actual: 90 },
  { week: 'Week 4', predicted: 87, actual: 89 },
  { week: 'Current', predicted: 94, actual: null }
];

export default function Analytics() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and predictive analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                <p className="text-2xl font-bold">94.2%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+2.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Early Interventions</p>
                <p className="text-2xl font-bold">156</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+18%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dropout Prevention</p>
                <p className="text-2xl font-bold">89.5%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+5.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-danger/10">
                <TrendingDown className="h-5 w-5 text-danger" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">At-Risk Students</p>
                <p className="text-2xl font-bold">321</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-danger" />
                  <span className="text-xs text-danger">+12%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Academic Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" domain={[6.5, 8.5]} />
                <YAxis yAxisId="right" orientation="right" domain={[75, 95]} />
                <Tooltip 
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="avgGPA"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="attendance"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="students"
                  label={({ range, students }) => `${range}: ${students}`}
                >
                  {attendanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [value, 'Students']}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Course-wise Analysis */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Course-wise Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={courseWiseRiskData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis type="number" />
              <YAxis dataKey="course" type="category" width={120} />
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

      {/* Predictive Analysis */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="dashboard-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Risk Prediction vs Actual</CardTitle>
                <Badge variant="secondary">94.2% Accuracy</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={riskPredictionData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[80, 100]} />
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
                    dataKey="predicted" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg border border-success/20 bg-success-muted/30">
                <h4 className="font-medium text-success mb-1">Improved Accuracy</h4>
                <p className="text-sm text-muted-foreground">
                  Prediction model accuracy increased by 2.1% this month
                </p>
              </div>

              <div className="p-3 rounded-lg border border-warning/20 bg-warning-muted/30">
                <h4 className="font-medium text-warning mb-1">Course Alert</h4>
                <p className="text-sm text-muted-foreground">
                  Civil Engineering shows highest risk concentration
                </p>
              </div>

              <div className="p-3 rounded-lg border border-primary/20 bg-primary-muted/30">
                <h4 className="font-medium text-primary mb-1">Intervention Success</h4>
                <p className="text-sm text-muted-foreground">
                  89.5% of at-risk students improved after intervention
                </p>
              </div>

              <div className="p-3 rounded-lg border border-danger/20 bg-danger-muted/30">
                <h4 className="font-medium text-danger mb-1">Attendance Concern</h4>
                <p className="text-sm text-muted-foreground">
                  287 students below 75% attendance threshold
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommendations */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-danger/10">
                  <AlertTriangle className="h-4 w-4 text-danger" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Critical Intervention</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    15 students require immediate attention based on multiple risk factors
                  </p>
                  <Button size="sm" variant="outline">
                    View Students
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <BookOpen className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Academic Support</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Deploy additional tutoring for Data Structures subject
                  </p>
                  <Button size="sm" variant="outline">
                    Schedule Support
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Mentor Assignment</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    42 students need dedicated mentor assignment
                  </p>
                  <Button size="sm" variant="outline">
                    Assign Mentors
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}