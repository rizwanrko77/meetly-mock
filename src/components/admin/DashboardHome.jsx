import React, { useState, useEffect } from 'react';
import { Settings2, Plus, LayoutDashboard } from 'lucide-react';
import { LoadingSkeleton } from '../shared/LoadingSkeleton';
import { CustomizeDashboardModal, AVAILABLE_WIDGETS } from './modals/CustomizeDashboardModal';

import { 
  AccountOverviewWidget, 
  RecentActivityWidget, 
  UpcomingMeetingsWidget, 
  SchedulerCalendarWidget, 
  BillingHistoryWidget, 
  TeamOverviewWidget, 
  NotificationLogsWidget,
  LibraryWidget
} from './widgets';

const WIDGET_COMPONENTS = {
  accountOverview: AccountOverviewWidget,
  recentActivity: RecentActivityWidget,
  upcomingMeetings: UpcomingMeetingsWidget,
  schedulerCalendar: SchedulerCalendarWidget,
  billingHistory: BillingHistoryWidget,
  teamOverview: TeamOverviewWidget,
  notificationLogs: NotificationLogsWidget,
  libraryWidget: LibraryWidget,
};

export function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  
  // Default configuration
  const [dashboardConfig, setDashboardConfig] = useState(
    ['accountOverview', 'recentActivity', 'schedulerCalendar', 'upcomingMeetings', 'billingHistory', 'teamOverview', 'notificationLogs', 'libraryWidget']
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveConfig = (newConfig) => {
    setDashboardConfig(newConfig);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <LoadingSkeleton type="chart" />
        <LoadingSkeleton type="table" rows={3} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in relative pb-20">
      <div className="flex justify-end">
        <button 
          onClick={() => setIsCustomizeOpen(true)}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors"
        >
          <Settings2 size={16} />
          Customize Dashboard
        </button>
      </div>

      {dashboardConfig.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 flex flex-col items-center justify-center text-center mt-6">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
            <LayoutDashboard size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Your Dashboard is Empty</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            You've removed all widgets from your view. Click below to add widgets and customize your experience.
          </p>
          <button 
            onClick={() => setIsCustomizeOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} /> Add Widgets
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {dashboardConfig.map(widgetId => {
            const WidgetComponent = WIDGET_COMPONENTS[widgetId];
            const widgetMeta = AVAILABLE_WIDGETS.find(w => w.id === widgetId);
            
            if (!WidgetComponent || !widgetMeta) return null;

            return (
              <div key={widgetId} className={widgetMeta.colSpan}>
                <WidgetComponent />
              </div>
            );
          })}
        </div>
      )}

      <CustomizeDashboardModal 
        isOpen={isCustomizeOpen} 
        onClose={() => setIsCustomizeOpen(false)} 
        onSave={handleSaveConfig}
        currentConfig={dashboardConfig}
      />
    </div>
  );
}
