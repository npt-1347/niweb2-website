
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  Award,
  CheckCircle2, 
  Settings,
  Plus,
  Briefcase
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Case } from "@/api/entities";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Citations",
    url: createPageUrl("Citations"),
    icon: CheckCircle2,
  },
  {
    title: "Score My Case",
    url: createPageUrl("ScoreMyCase"),
    icon: Award,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [cases, setCases] = React.useState([]);

  React.useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    const data = await Case.list("-updated_date", 5);
    setCases(data);
  };

  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-100 text-gray-700",
      in_progress: "bg-blue-100 text-blue-700",
      review: "bg-amber-100 text-amber-700",
      completed: "bg-emerald-100 text-emerald-700"
    };
    return colors[status] || colors.draft;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Sidebar className="border-r border-slate-200 bg-white/80 backdrop-blur-xl">
          <SidebarHeader className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">NIWBuilder.ai</h2>
                <p className="text-xs text-slate-500">EB2-NIW Petition Platform</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl mb-1 ${
                          location.pathname === item.url ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <div className="flex items-center justify-between px-3 py-2">
                <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Recent Cases
                </SidebarGroupLabel>
                <Link to={createPageUrl("Dashboard")}>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <SidebarGroupContent>
                <div className="space-y-2 px-2">
                  {cases.map((caseItem) => (
                    <Link 
                      key={caseItem.id} 
                      to={createPageUrl(`CaseWizard?caseId=${caseItem.id}`)}
                      className="block"
                    >
                      <div className="p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 border border-slate-100 hover:border-slate-200 hover:shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium text-sm text-slate-900 truncate flex-1">
                            {caseItem.title}
                          </p>
                          <Badge className={`${getStatusColor(caseItem.status)} text-xs ml-2`}>
                            {caseItem.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                              style={{ width: `${caseItem.completion_percentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-600">
                            {caseItem.completion_percentage}%
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {cases.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">No cases yet</p>
                  )}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                <span className="text-slate-600 font-semibold text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 text-sm truncate">User Account</p>
                <p className="text-xs text-slate-500 truncate">Premium Plan</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 lg:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-semibold text-slate-900">NIWBuilder.ai</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
