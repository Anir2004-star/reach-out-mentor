import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Search, 
  Filter, 
  CheckSquare, 
  Settings,
  AlertTriangle,
  DollarSign,
  BookOpen,
  Users,
  Calendar,
  Send
} from "lucide-react";
import { mockNotifications, mockStudents } from "@/lib/mock-data";
import { NotificationAlert } from "@/types/student";
import { useToast } from "@/hooks/use-toast";

// Extended mock notifications for demo
const extendedNotifications: NotificationAlert[] = [
  ...mockNotifications,
  {
    id: "N004",
    studentId: "ST003",
    type: "general",
    priority: "low",
    title: "Academic Excellence",
    message: "Rahul Kumar achieved highest GPA in Electronics department",
    timestamp: "2024-01-12T16:30:00Z",
    read: true,
    actionRequired: false,
    mentorId: "M003"
  },
  {
    id: "N005",
    studentId: "ST005",
    type: "attendance",
    priority: "medium",
    title: "Attendance Improvement",
    message: "Vikram Singh's attendance improved to 90% after intervention",
    timestamp: "2024-01-11T10:15:00Z",
    read: false,
    actionRequired: false,
    mentorId: "M001"
  }
];

export default function Notifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const { toast } = useToast();

  const filteredNotifications = extendedNotifications.filter(notification => {
    const student = mockStudents.find(s => s.id === notification.studentId);
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student && student.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTab = selectedTab === "all" || 
      (selectedTab === "unread" && !notification.read) ||
      (selectedTab === "action-required" && notification.actionRequired) ||
      (selectedTab === notification.type);

    return matchesSearch && matchesTab;
  });

  const unreadCount = extendedNotifications.filter(n => !n.read).length;
  const actionRequiredCount = extendedNotifications.filter(n => n.actionRequired).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-danger';
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive' as const;
      case 'high': return 'destructive' as const;
      case 'medium': return 'secondary' as const;
      case 'low': return 'default' as const;
      default: return 'default' as const;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return BookOpen;
      case 'attendance': return Users;
      case 'financial': return DollarSign;
      case 'general': return Bell;
      default: return Bell;
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    toast({
      title: "Notification Updated",
      description: "Notification marked as read",
    });
  };

  const handleTakeAction = (notificationId: string) => {
    const notification = extendedNotifications.find(n => n.id === notificationId);
    const student = mockStudents.find(s => s.id === notification?.studentId);
    
    toast({
      title: "Action Initiated",
      description: `Taking action for ${student?.name}. Mentor has been notified.`,
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Manage alerts and notifications from the risk assessment system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Send Alert
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Notifications</p>
                <p className="text-2xl font-bold">{extendedNotifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <CheckSquare className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold text-warning">{unreadCount}</p>
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
                <p className="text-sm text-muted-foreground">Action Required</p>
                <p className="text-2xl font-bold text-danger">{actionRequiredCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Calendar className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Alerts</p>
                <p className="text-2xl font-bold text-success">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" onClick={() => {
          toast({ title: "All notifications marked as read" });
        }}>
          <CheckSquare className="mr-2 h-4 w-4" />
          Mark All Read
        </Button>
      </div>

      {/* Notifications Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="action-required">
            Action Required
            {actionRequiredCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {actionRequiredCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => {
                const student = mockStudents.find(s => s.id === notification.studentId);
                const TypeIcon = getTypeIcon(notification.type);
                
                return (
                  <Card 
                    key={notification.id} 
                    className={`dashboard-card hover:shadow-[var(--shadow-medium)] transition-all duration-200 ${
                      !notification.read ? 'border-primary/30 bg-primary-muted/20' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'academic' ? 'bg-primary/10' :
                          notification.type === 'attendance' ? 'bg-warning/10' :
                          notification.type === 'financial' ? 'bg-danger/10' :
                          'bg-muted/50'
                        }`}>
                          <TypeIcon className={`h-5 w-5 ${
                            notification.type === 'academic' ? 'text-primary' :
                            notification.type === 'attendance' ? 'text-warning' :
                            notification.type === 'financial' ? 'text-danger' :
                            'text-muted-foreground'
                          }`} />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-base leading-none">
                                {notification.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Badge variant={getPriorityVariant(notification.priority)}>
                                {notification.priority}
                              </Badge>
                              {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4 text-muted-foreground">
                              {student && (
                                <span>
                                  <strong>{student.name}</strong> ({student.rollNumber})
                                </span>
                              )}
                              <span>
                                {new Date(notification.timestamp).toLocaleString()}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  Mark Read
                                </Button>
                              )}
                              {notification.actionRequired && (
                                <Button 
                                  size="sm"
                                  onClick={() => handleTakeAction(notification.id)}
                                >
                                  Take Action
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="dashboard-card">
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Notifications</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 
                    "No notifications match your search criteria." :
                    "No notifications found for this category."
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}