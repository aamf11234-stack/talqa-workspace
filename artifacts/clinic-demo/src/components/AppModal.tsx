import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, LayoutDashboard } from 'lucide-react';
import { PhoneFrame } from './PhoneFrame';
import { BottomNav } from './BottomNav';
import type { ClinicTab } from './BottomNav';
import { ScreenHome } from './ScreenHome';
import { ScreenAppointments } from './ScreenAppointments';
import { ScreenCard } from './ScreenCard';
import { ScreenNotifications } from './ScreenNotifications';
import { ScreenAI } from './ScreenAI';
import { ScreenTelemedicine } from './ScreenTelemedicine';
import { ScreenOwner } from './ScreenOwner';
import { ScreenReception } from './ScreenReception';
import { ScreenDoctor } from './ScreenDoctor';

type Mode = 'patient' | 'owner' | 'reception' | 'doctor';

interface AppModalProps {
 open: boolean;
 onClose: () => void;
 initialRole?: Mode;
}

const staffTabs: { id: Mode; label: string; emoji: string }[] = [
 { id: 'owner', label: 'المالك', emoji: '' },
 { id: 'reception', label: 'الاستقبال', emoji: '' },
 { id: 'doctor', label: 'الطبيب', emoji: '' },
];

export const AppModal = ({ open, onClose, initialRole }: AppModalProps) => {
 const initMode = initialRole ?? 'patient';
 const [activeTab, setActiveTab] = useState<ClinicTab>('home');
 const [mode, setMode] = useState<Mode>(initMode);
 const [modeGroup, setModeGroup] = useState<'patient' | 'staff'>(initMode === 'patient' ? 'patient' : 'staff');

 // sync when modal re-opens with a different role
 React.useEffect(() => {
 if (open && initialRole) {
 setMode(initialRole);
 setModeGroup(initialRole === 'patient' ? 'patient' : 'staff');
 }
 }, [open, initialRole]);

 const switchGroup = (g: 'patient' | 'staff') => {
 setModeGroup(g);
 setMode(g === 'patient' ? 'patient' : 'owner');
 };

 return (
 <AnimatePresence>
 {open && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.2 }}
 className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4"
 style={{ background: 'rgba(5,13,26,0.88)', backdropFilter: 'blur(14px)' }}
 onClick={onClose}
 >
 {/* Close */}
 <button
 onClick={onClose}
 className="absolute top-5 left-5 w-9 h-9 rounded-full flex items-center justify-center text-white"
 style={{ background: 'rgba(255,255,255,0.1)' }}
 >
 <X size={16} />
 </button>

 {/* Role switcher — above phone */}
 <motion.div
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.15 }}
 className="flex flex-col items-center gap-2"
 onClick={e => e.stopPropagation()}
 >
 {/* Patient / Staff toggle */}
 <div className="flex rounded-full p-0.5" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
 {([['patient','patient','تطبيق المريض'],['staff','staff','لوحات الموظفين']] as [string,string,string][]).map(([g,,label]) => (
 <button key={g} onClick={() => switchGroup(g as 'patient'|'staff')}
 className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold transition-all"
 style={modeGroup === g
 ? { background: 'rgba(0,180,216,0.25)', color: '#00B4D8', border: '1px solid rgba(0,180,216,0.35)' }
 : { color: 'rgba(255,255,255,0.4)' }}>
 {g === 'patient' ? <User size={11}/> : <LayoutDashboard size={11}/>}
 {label}
 </button>
 ))}
 </div>

 {/* Staff sub-tabs */}
 <AnimatePresence>
 {modeGroup === 'staff' && (
 <motion.div
 initial={{ opacity:0, height:0 }}
 animate={{ opacity:1, height:'auto' }}
 exit={{ opacity:0, height:0 }}
 className="flex gap-2 overflow-hidden"
 >
 {staffTabs.map(t => (
 <button key={t.id} onClick={() => setMode(t.id)}
 className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all"
 style={mode === t.id
 ? { background:'rgba(0,180,216,0.2)', color:'#00B4D8', border:'1px solid rgba(0,180,216,0.3)' }
 : { background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.4)', border:'1px solid rgba(255,255,255,0.1)' }}>
 <span>{t.emoji}</span>{t.label}
 </button>
 ))}
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>

 {/* Phone */}
 <motion.div
 initial={{ scale: 0.85, y: 40, opacity: 0 }}
 animate={{ scale: 1, y: 0, opacity: 1 }}
 exit={{ scale: 0.85, y: 40, opacity: 0 }}
 transition={{ type: 'spring', stiffness: 280, damping: 26 }}
 onClick={(e) => e.stopPropagation()}
 >
 <PhoneFrame>
 <div className="flex-1 relative overflow-hidden h-full">
 <AnimatePresence mode="wait" initial={false}>
 <motion.div
 key={mode === 'patient' ? activeTab : mode}
 initial={{ opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 transition={{ duration: 0.18 }}
 className="absolute inset-0 overflow-y-auto scrollbar-none"
 >
 {mode === 'patient' && activeTab === 'home' && <ScreenHome />}
 {mode === 'patient' && activeTab === 'appointments' && <ScreenAppointments />}
 {mode === 'patient' && activeTab === 'card' && <ScreenCard />}
 {mode === 'patient' && activeTab === 'ai' && <ScreenAI />}
 {mode === 'patient' && activeTab === 'telemedicine' && <ScreenTelemedicine />}
 {mode === 'patient' && activeTab === 'notifications' && <ScreenNotifications />}
 {mode === 'owner' && <ScreenOwner />}
 {mode === 'reception' && <ScreenReception />}
 {mode === 'doctor' && <ScreenDoctor />}
 </motion.div>
 </AnimatePresence>
 </div>
 {mode === 'patient' && (
 <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} notifCount={2} />
 )}
 </PhoneFrame>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 );
};
