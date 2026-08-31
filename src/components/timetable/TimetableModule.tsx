import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Users, 
  MapPin, 
  Printer, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  AlertCircle,
  Plus,
  Filter,
  Layers,
  ChevronRight
} from 'lucide-react';
import { TimetableSlot, ExamTimetableEntry } from '../../types';
import { MOCK_TIMETABLE_SLOTS, MOCK_EXAM_TIMETABLE } from '../../data/expandedData';
import { useAuth } from '../../context/AuthContext';
import { supabaseService, isSupabaseConfigured } from '../../lib/supabase';

interface TimetableModuleProps {
  defaultClass?: string;
}

export const TimetableModule: React.FC<TimetableModuleProps> = ({ defaultClass = 'SS 2 Science A' }) => {
  const { role } = useAuth();
  const [viewMode, setViewMode] = useState<'weekly' | 'daily' | 'exams'>('weekly');
  const [selectedClass, setSelectedClass] = useState<string>(defaultClass);
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');
  const [slots, setSlots] = useState<TimetableSlot[]>(MOCK_TIMETABLE_SLOTS);
  const [examSlots, setExamSlots] = useState<ExamTimetableEntry[]>(MOCK_EXAM_TIMETABLE);

  // Admin add slot state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDay, setNewDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');
  const [newPeriod, setNewPeriod] = useState<number>(1);
  const [newTime, setNewTime] = useState('08:00 - 08:45 AM');
  const [newSubject, setNewSubject] = useState('Mathematics');
  const [newTeacher, setNewTeacher] = useState('Mr. E. Akhere');
  const [newRoom, setNewRoom] = useState('Hall 3');

  // Load from Supabase if configured
  useEffect(() => {
    if (isSupabaseConfigured) {
      supabaseService.timetableManagement.getWeekly().then((data: any) => {
        if (data && data.length > 0) {
          const mapped: TimetableSlot[] = data.map((d: any) => ({
            id: d.id,
            day: d.day,
            period: d.period_number,
            time: d.time,
            className: d.class_name,
            subject: d.subject_name || d.subject,
            teacherName: d.teacher_name,
            room: d.room || 'Room 1',
          }));
          setSlots(prev => {
            const ids = new Set(prev.map(p => p.id));
            const fresh = mapped.filter(m => !ids.has(m.id));
            return [...fresh, ...prev];
          });
        }
      }).catch(() => {});
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'> = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

  const handleAddSlotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: TimetableSlot = {
      id: `t-slot-${Date.now()}`,
      day: newDay,
      period: Number(newPeriod),
      time: newTime,
      className: selectedClass,
      subject: newSubject,
      teacherName: newTeacher,
      room: newRoom
    };
    setSlots(prev => [...prev, newSlot]);
    setShowAddModal(false);
  };

  const getSubjectColor = (subject: string) => {
    if (subject.toLowerCase().includes('math')) return 'bg-blue-50 text-blue-800 border-blue-200';
    if (subject.toLowerCase().includes('physic')) return 'bg-indigo-50 text-indigo-800 border-indigo-200';
    if (subject.toLowerCase().includes('chem')) return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (subject.toLowerCase().includes('bio')) return 'bg-teal-50 text-teal-800 border-teal-200';
    if (subject.toLowerCase().includes('eng')) return 'bg-purple-50 text-purple-800 border-purple-200';
    if (subject.toLowerCase().includes('computer') || subject.toLowerCase().includes('ict')) return 'bg-amber-50 text-amber-800 border-amber-200';
    if (subject.toLowerCase().includes('sport') || subject.toLowerCase().includes('assembly')) return 'bg-rose-50 text-rose-800 border-rose-200';
    return 'bg-slate-50 text-slate-800 border-slate-200';
  };

  return (
    <div className="space-y-6">
      {/* Timetable Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Academic Schedule & Room Allocation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Class & Examination Timetable
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Standard 8-period teaching schedule, laboratory practical rotations, and terminal examination timetables.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
          >
            <Printer className="w-4 h-4" />
            <span>Print Timetable</span>
          </button>

          {(role === 'admin' || role === 'teacher' || role === 'superadmin') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Period</span>
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Class selector & View Mode Toggle */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* View Mode Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {[
            { id: 'weekly', label: 'Weekly Grid', icon: <Calendar className="w-3.5 h-3.5" /> },
            { id: 'daily', label: 'Daily View', icon: <Clock className="w-3.5 h-3.5" /> },
            { id: 'exams', label: 'Exam Schedule', icon: <FileText className="w-3.5 h-3.5" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === tab.id
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Class Selection Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Class:</span>
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50"
          >
            <option value="SS 2 Science A">SS 2 Science A</option>
            <option value="SS 2 Science B">SS 2 Science B</option>
            <option value="SS 2 Arts">SS 2 Arts</option>
            <option value="SS 2 Commercial">SS 2 Commercial</option>
            <option value="SS 3 Science">SS 3 Science</option>
            <option value="SS 1 Science">SS 1 Science</option>
            <option value="JSS 1A">JSS 1A</option>
            <option value="JSS 2A">JSS 2A</option>
            <option value="JSS 3A">JSS 3A</option>
          </select>
        </div>
      </div>

      {/* 1. WEEKLY GRID VIEW */}
      {viewMode === 'weekly' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="font-serif font-bold text-sm text-slate-900">
              Weekly Master Timetable • {selectedClass} (1st Term 2024/2025)
            </span>
            <span className="text-xs text-slate-500 font-medium">8 Periods Daily (8:00 AM - 2:30 PM)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3.5 border-r border-slate-800 w-28 text-center">Day</th>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(p => (
                    <th key={p} className="p-3 border-r border-slate-800 min-w-[130px] text-center">
                      <div>Period {p}</div>
                      <div className="text-[10px] font-normal font-mono text-slate-400">
                        {p === 1 && '08:00 - 08:45'}
                        {p === 2 && '08:45 - 09:30'}
                        {p === 3 && '09:30 - 10:15'}
                        {p === 4 && '10:15 - 11:00'}
                        {p === 5 && '11:30 - 12:15'}
                        {p === 6 && '12:15 - 01:00'}
                        {p === 7 && '01:00 - 01:45'}
                        {p === 8 && '01:45 - 02:30'}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {days.map(day => {
                  const daySlots = slots.filter(s => s.day === day);

                  return (
                    <tr key={day} className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-bold text-slate-900 bg-slate-100/70 border-r border-slate-200 text-center">
                        {day}
                      </td>

                      {[1, 2, 3, 4, 5, 6, 7, 8].map(period => {
                        const slot = daySlots.find(s => s.period === period);

                        if (!slot) {
                          return (
                            <td key={period} className="p-2 border-r border-slate-100 text-center text-slate-300">
                              -
                            </td>
                          );
                        }

                        const colorClass = getSubjectColor(slot.subject);

                        return (
                          <td key={period} className="p-2 border-r border-slate-100 align-top">
                            <div className={`p-2.5 rounded-xl border text-left space-y-1 ${colorClass}`}>
                              <div className="font-bold text-[11px] leading-tight line-clamp-1">
                                {slot.subject}
                              </div>
                              <div className="text-[10px] text-slate-600 truncate flex items-center gap-1">
                                <Users className="w-2.5 h-2.5 opacity-60" />
                                <span>{slot.teacherName.split(' ')[0]}</span>
                              </div>
                              <div className="text-[9px] font-mono text-slate-500 truncate flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 opacity-60" />
                                <span>{slot.room}</span>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. DAILY VIEW */}
      {viewMode === 'daily' && (
        <div className="space-y-4">
          {/* Day selection pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedDay === day
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {slots
              .filter(s => s.day === selectedDay)
              .sort((a, b) => a.period - b.period)
              .map(slot => (
                <div
                  key={slot.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-mono font-bold">
                      Period {slot.period}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-medium">
                      {slot.time}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-sm text-slate-900">
                      {slot.subject}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{slot.teacherName}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{slot.room}</span>
                    </span>
                    <span className="font-mono text-[10px] text-emerald-700 font-semibold">
                      45 mins
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 3. EXAMINATION TIMETABLE */}
      {viewMode === 'exams' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                1st Term 2024/2025 Terminal & Mock CBT Examination Timetable
              </h3>
              <p className="text-xs text-slate-500">
                Official date and venue schedule approved by the Academic Examination Committee.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3">Date & Day</th>
                  <th className="p-3">Paper / Subject</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Class Level</th>
                  <th className="p-3">Venue</th>
                  <th className="p-3">Invigilator(s)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {examSlots.map(entry => (
                  <tr key={entry.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">
                      <div>{entry.date}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{entry.day_name}</div>
                    </td>
                    <td className="p-3 font-bold text-emerald-950">{entry.subject}</td>
                    <td className="p-3 font-mono text-slate-600">{entry.paper_code}</td>
                    <td className="p-3 font-mono text-amber-700 font-bold">{entry.time}</td>
                    <td className="p-3 font-mono text-slate-700">{entry.class_level}</td>
                    <td className="p-3 text-slate-700">{entry.venue}</td>
                    <td className="p-3 text-slate-500">{entry.invigilator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD PERIOD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900">Add Timetable Slot</h3>
            <form onSubmit={handleAddSlotSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Day</label>
                  <select
                    value={newDay}
                    onChange={e => setNewDay(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  >
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Period Number</label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={newPeriod}
                    onChange={e => setNewPeriod(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Subject Name</label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Teacher Name</label>
                <input
                  type="text"
                  required
                  value={newTeacher}
                  onChange={e => setNewTeacher(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Time Range</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Classroom / Lab</label>
                  <input
                    type="text"
                    value={newRoom}
                    onChange={e => setNewRoom(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                >
                  Save Period
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
