# EduPredict - AI-Based Student Risk Assessment System

## 🎯 Project Overview

EduPredict is a comprehensive AI-based drop-out prediction and counseling system designed for educational institutions. It consolidates student data from multiple sources, applies intelligent risk assessment algorithms, and provides early intervention capabilities to help reduce student dropout rates.

## 🚀 Features

### Core Functionality
- **Real-time Risk Assessment**: AI-powered analysis of student performance indicators
- **Predictive Analytics**: Early identification of at-risk students
- **Multi-factor Analysis**: Attendance, academic performance, financial status tracking
- **Automated Alerts**: Intelligent notification system for mentors and guardians
- **Intervention Tracking**: Monitor effectiveness of support measures
- **Data Integration**: Import from multiple spreadsheet sources

### Dashboard Capabilities
- **Executive Overview**: Key metrics and trends visualization
- **Student Management**: Comprehensive student profiles and risk indicators
- **Analytics Engine**: Predictive insights and performance trends
- **Notification Center**: Centralized alert management
- **Report Generation**: Comprehensive assessment reports

## 🏗️ Architecture & File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── app-sidebar.tsx      # Main navigation sidebar
│   │   └── app-header.tsx       # Top navigation bar
│   ├── dashboard/
│   │   ├── stats-card.tsx       # Metric display cards
│   │   └── risk-distribution-chart.tsx
│   ├── students/
│   │   ├── student-card.tsx     # Individual student cards
│   │   └── students-table.tsx   # Data table view
│   └── ui/                      # Shadcn/ui components
├── pages/
│   ├── Dashboard.tsx            # Main dashboard
│   ├── Students.tsx             # Student management
│   ├── Analytics.tsx            # Analytics & insights
│   └── Notifications.tsx        # Alert management
├── types/
│   └── student.ts               # TypeScript interfaces
├── lib/
│   ├── utils.ts                 # Utility functions
│   └── mock-data.ts             # Sample data for demo
└── hooks/                       # Custom React hooks
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation

### UI Framework & Styling
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **Lucide React** for icons
- **Recharts** for data visualization

### Data Management
- **TanStack Query** for state management
- **React Hook Form** for form handling
- **Zod** for schema validation

## 📋 Prerequisites

Before setting up the project, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone <YOUR_REPOSITORY_URL>
cd edupredict-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

## 🎨 Design System

The application uses a comprehensive design system with semantic color tokens:

### Color Palette
- **Primary**: Professional blue (`#2563eb`)
- **Success**: Green for low-risk students (`#16a34a`)
- **Warning**: Orange for medium-risk students (`#ea580c`)
- **Danger**: Red for high-risk students (`#dc2626`)

### Risk Assessment Colors
- **Low Risk**: Green indicators
- **Medium Risk**: Yellow/Orange indicators  
- **High Risk**: Red indicators

## 📊 Data Structure

### Student Risk Assessment
- **Academic Risk**: GPA, test scores, assignment completion
- **Attendance Risk**: Class attendance percentage, patterns
- **Financial Risk**: Fee payment status, scholarship eligibility
- **Overall Risk**: Composite score from all factors

### Key Metrics
- Risk level distribution
- Attendance trends
- Academic performance patterns
- Intervention success rates

## 🔧 Configuration

### Environment Setup
The project uses Vite's built-in environment handling. No additional environment variables are required for the basic setup.

### Customization Options
- Modify risk thresholds in `src/lib/mock-data.ts`
- Adjust color schemes in `src/index.css`
- Configure notification settings in components

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1920px and above)
- Laptops (1024px - 1919px)
- Tablets (768px - 1023px)
- Mobile devices (320px - 767px)

## 🧪 Sample Data

The application includes comprehensive mock data:
- 5+ sample students with varying risk levels
- Historical performance data
- Notification examples
- Dashboard metrics

## 🔄 Development Workflow

### Code Structure Guidelines
- Use TypeScript for type safety
- Follow React functional component patterns
- Implement responsive design with Tailwind CSS
- Use semantic HTML for accessibility

### Component Organization
- Keep components focused and reusable
- Use proper prop interfaces with TypeScript
- Implement loading and error states
- Follow accessibility best practices

## 🚢 Deployment Options

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist folder to Netlify
```

### Traditional Web Server
```bash
npm run build
# Serve the dist folder with any web server
```

## 📈 Performance Optimization

- Lazy loading for large data sets
- Optimized chart rendering with Recharts
- Efficient state management
- Minimized bundle size with tree shaking

## 🔐 Security Considerations

- Client-side data validation with Zod
- Secure routing with React Router
- Input sanitization for user data
- HTTPS-only deployment recommended

## 🎯 Future Enhancements

### Planned Features
- Real-time data synchronization
- Advanced ML prediction models
- Mobile app development
- Integration with existing student information systems
- Multi-language support
- Advanced reporting and analytics

### Potential Integrations
- Learning Management Systems (LMS)
- Student Information Systems (SIS)
- Email notification services
- SMS alert systems
- Parent portal integration

## 👥 Contributing

This project follows standard React development practices:
1. Use meaningful commit messages
2. Write comprehensive component documentation
3. Implement proper error handling
4. Add unit tests for critical functionality
5. Follow accessibility guidelines

## 📞 Support

For technical support or questions about implementation:
- Review the component documentation
- Check the TypeScript interfaces in `/types`
- Examine the mock data structure in `/lib/mock-data.ts`
- Test with the provided sample data

## 📄 License

This project is developed for educational purposes and the Smart India Hackathon. Please refer to your institution's guidelines for usage and distribution.

---

**Built with ❤️ for the Smart India Hackathon**  
*Empowering educational institutions with AI-driven student success insights*