import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  GraduationCap,
  Users,
  School,
  BookOpen,
  CalendarCheck,
  CalendarRange,
  BookMarked,
  FileText,
  UserCheck,
  RotateCcw,
  BarChart3,
  Settings,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  BookCopy
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { currentUser, switchUserRole, schoolSettings } = useApp();

  const navItems = [
    { to: '/', label: 'ផ្ទាំងគ្រប់គ្រង', icon: LayoutDashboard, badge: null },
    { to: '/academic-years', label: 'ឆ្នាំសិក្សា', icon: CalendarRange, badge: null },
    { to: '/teachers', label: 'គ្រប់គ្រងគ្រូ', icon: GraduationCap, badge: null },
    { to: '/students', label: 'គ្រប់គ្រងសិស្ស', icon: Users, badge: null },
    { to: '/classes', label: 'គ្រប់គ្រងថ្នាក់', icon: School, badge: null },
    { to: '/subjects', label: 'មុខវិជ្ជា', icon: BookOpen, badge: null },
    { to: '/curriculum', label: 'កម្មវិធីសិក្សាប្រចាំឆ្នាំ', icon: BookMarked, badge: 'កែវ សំណាង' },
    { to: '/timetable', label: 'កាលវិភាគគ្រូ', icon: CalendarDays, badge: null },
    { to: '/calendar', label: 'ប្រតិទិនសាលា', icon: CalendarCheck, badge: null },
    { to: '/class-curriculum', label: 'កម្មវិធីសិក្សាតាមថ្នាក់', icon: BookCopy, badge: 'Core' },
    { to: '/lesson-plans', label: 'កិច្ចតែងការបង្រៀន', icon: FileText, badge: '៥ ជំហាន' },
    { to: '/attendance', label: 'អវត្តមានសិស្ស', icon: UserCheck, badge: null },
    { to: '/makeup-lessons', label: 'ម៉ោងបង្រៀនសង', icon: RotateCcw, badge: null },
    { to: '/reports', label: 'របាយការណ៍', icon: BarChart3, badge: null },
    { to: '/settings', label: 'ការកំណត់ប្រព័ន្ធ', icon: Settings, badge: null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* App Brand Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-base tracking-wide text-slate-900 dark:text-white leading-tight">
                MY SCHOOL TASK
              </h1>
              <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                {schoolSettings?.schoolNameKm || 'វិទ្យាល័យ ហ៊ុន សែន បាត់ដឹង'}
              </p>
            </div>
          </div>
        </div>

        {/* User Role Quick Switcher Badge */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              តួនាទីអ្នកប្រើប្រាស់ (Role)
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300">
              {currentUser.role}
            </span>
          </div>

          <select
            value={currentUser.role}
            onChange={(e) => switchUserRole(e.target.value as any)}
            className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
          >
            <option value="ADMIN">ADMIN (ពេញសិទ្ធិទាំងអស់)</option>
            <option value="SCHOOL_DIRECTOR">SCHOOL_DIRECTOR (នាយកសាលា)</option>
            <option value="TEACHER">TEACHER (គ្រូបង្រៀន កែវ សំណាង)</option>
            <option value="ATTENDANCE_STAFF">ATTENDANCE_STAFF (បុគ្គលិកវត្តមាន)</option>
          </select>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md font-semibold bg-white/20 text-white group-hover:bg-primary-100 group-hover:text-primary-700 dark:group-hover:bg-primary-900/40">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 text-center">
          <p>ប្រព័ន្ធគ្រប់គ្រងការងារសិក្សា ២០២៥-២០២៦</p>
          <p className="mt-0.5 font-medium text-slate-500 dark:text-slate-400">វិទ្យាល័យ ហ៊ុន សែន បាត់ដឹង</p>
        </div>
      </aside>
    </>
  );
};

