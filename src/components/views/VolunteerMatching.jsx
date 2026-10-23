import React, { useState } from 'react';
import { useDisaster } from '../../context/DisasterContext';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  MapPin,
  Award,
  Sparkles,
  Phone,
  Briefcase,
  AlertTriangle,
  Clock,
  Filter,
  Plus
} from 'lucide-react';

export default function VolunteerMatching() {
  const { 
    volunteers, 
    tasks, 
    assignVolunteerToTask, 
    removeVolunteerFromTask 
  } = useDisaster();

  const [taskStatusFilter, setTaskStatusFilter] = useState('ALL');
  const [selectedTaskId, setSelectedTaskId] = useState('TSK-302');

  const selectedTask = tasks.find(t => t.id === selectedTaskId) || tasks[0];

  // Compute volunteer match scores for the selected task
  const scoredVolunteers = volunteers.map(vol => {
    let score = 50; // base score

    // Skill overlap match
    const matchingSkills = vol.skills.filter(s => 
      selectedTask.requiredSkills.some(req => req.toLowerCase() === s.toLowerCase())
    );
    score += matchingSkills.length * 20;

    // Proximity factor (closer gives higher score)
    const dist = vol.distanceKmToNearestTask || 5;
    if (dist <= 2) score += 15;
    else if (dist <= 5) score += 8;

    // Availability factor
    if (vol.status === 'available') score += 10;
    else if (vol.status === 'assigned') score -= 25;

    const finalScore = Math.min(99, Math.max(35, score));

    return {
      ...vol,
      matchScore: finalScore,
      matchingSkills
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const filteredTasks = tasks.filter(t => {
    if (taskStatusFilter === 'ALL') return true;
    if (taskStatusFilter === 'OPEN') return t.status === 'open';
    if (taskStatusFilter === 'IN_PROGRESS') return t.status === 'in-progress';
    if (taskStatusFilter === 'COMPLETED') return t.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-[#191512] border border-[#393027] p-5 lg:p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/30">
                Resource Optimization
              </span>
              <span className="text-xs font-mono text-[#D99055]">
                Skill & Radius Match Matrix
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#F5F0E8] font-mono">
              Volunteer Dynamic Task Matching
            </h2>
            <p className="text-xs text-[#A89F91] mt-1 max-w-2xl">
              Pairs qualified civilian volunteers and emergency medical personnel with urgent camp tasks based on verified technical proficiencies, proximity radius (km), and availability status.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#221C18] border border-[#393027] text-xs font-mono text-[#F5F0E8]">
              Active Pool: <strong className="text-[#35C98A]">{volunteers.filter(v => v.status === 'available').length} available</strong> / {volunteers.length} total
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Open Tasks (5 cols) + Volunteer Matching Pool (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Task List & Filtering (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#F5F0E8] font-mono flex items-center gap-2">
              <Briefcase size={16} className="text-[#D99055]" />
              Relief Operation Tasks
            </h3>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 text-[11px] font-mono">
              {['ALL', 'OPEN', 'IN_PROGRESS'].map(f => (
                <button
                  key={f}
                  onClick={() => setTaskStatusFilter(f)}
                  className={`px-2 py-0.5 rounded-lg transition-all ${
                    taskStatusFilter === f
                      ? 'bg-[#D99055] text-[#0B0A09] font-bold'
                      : 'bg-[#191512] text-[#A89F91] border border-[#393027]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredTasks.map(task => {
              const isSelected = selectedTaskId === task.id;
              const isCritical = task.urgency === 'CRITICAL';

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#221C18] border-[#D99055] shadow-copper-sm ring-1 ring-[#D99055]'
                      : 'bg-[#191512] border-[#393027] hover:border-[#D99055]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isCritical ? 'bg-[#F05252]/20 text-[#F05252] border border-[#F05252]/30' : 'bg-[#D99055]/20 text-[#D99055]'
                        }`}>
                          {task.urgency}
                        </span>
                        <span className="text-xs font-bold text-[#F5F0E8] font-mono">
                          {task.id}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[#F5F0E8] mt-1.5 leading-snug">
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-[#A89F91] mt-0.5">
                        📍 {task.campName}
                      </p>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      task.status === 'open'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/30'
                    }`}>
                      {task.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#A89F91] mt-2 font-sans line-clamp-2">
                    {task.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#393027]/60 flex flex-wrap items-center justify-between text-[11px] font-mono">
                    <div className="flex flex-wrap gap-1">
                      {task.requiredSkills.map((sk, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-[#14110E] text-[#D99055] border border-[#26201A]">
                          {sk}
                        </span>
                      ))}
                    </div>

                    <span className="text-[#F5F0E8]">
                      {task.volunteersAssigned.length} / {task.volunteersNeeded} filled
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Matched Volunteers for Selected Task (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#F5F0E8] font-mono">
                Candidate Volunteers for {selectedTask.id}
              </h3>
              <p className="text-xs text-[#A89F91]">
                Target: {selectedTask.title} • Needed: {selectedTask.volunteersNeeded} personnel
              </p>
            </div>
            <span className="text-xs font-mono text-[#35C98A] flex items-center gap-1">
              <Sparkles size={13} />
              AI Rank Ordered
            </span>
          </div>

          <div className="space-y-3">
            {scoredVolunteers.map(vol => {
              const isAssigned = selectedTask.volunteersAssigned.includes(vol.id);
              const hasHighMatch = vol.matchScore >= 80;

              return (
                <div
                  key={vol.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isAssigned
                      ? 'bg-[#221C18] border-[#35C98A] shadow-emerald-glow'
                      : 'bg-[#191512] border-[#393027] hover:border-[#D99055]/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#F5F0E8] font-mono">
                          {vol.name}
                        </span>
                        {vol.verifiedBadge && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-[#35C98A]/20 text-[#35C98A] border border-[#35C98A]/40 flex items-center gap-1">
                            <Award size={10} />
                            VERIFIED
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          vol.status === 'available'
                            ? 'bg-[#35C98A]/15 text-[#35C98A]'
                            : 'bg-[#A89F91]/20 text-[#A89F91]'
                        }`}>
                          {vol.status.toUpperCase()}
                        </span>
                      </div>

                      <p className="text-xs text-[#D99055] font-mono font-semibold">
                        {vol.role} ({vol.experienceYears} yrs exp)
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-[#A89F91] font-mono">
                        <span>📍 Base: {vol.baseLocation}</span>
                        <span>• Proximity: {vol.distanceKmToNearestTask} km</span>
                        <span>• 📞 {vol.phone}</span>
                      </div>

                      {/* Skills Tags with matching highlight */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {vol.skills.map((s, i) => {
                          const isMatched = selectedTask.requiredSkills.some(req => req.toLowerCase() === s.toLowerCase());
                          return (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                                isMatched
                                  ? 'bg-[#35C98A]/20 text-[#35C98A] border-[#35C98A]/40'
                                  : 'bg-[#14110E] text-[#A89F91] border-[#26201A]'
                              }`}
                            >
                              {s} {isMatched ? '✓' : ''}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Match Score & Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-[#393027]">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] font-mono uppercase text-[#A89F91] block">
                          Match Score
                        </span>
                        <span className={`text-xl font-mono font-black ${
                          hasHighMatch ? 'text-[#35C98A]' : 'text-amber-400'
                        }`}>
                          {vol.matchScore}%
                        </span>
                      </div>

                      {/* Accept / Decline / Unassign Button */}
                      <div>
                        {isAssigned ? (
                          <button
                            onClick={() => removeVolunteerFromTask(selectedTask.id, vol.id)}
                            className="px-3 py-1.5 rounded-lg bg-[#F05252]/20 border border-[#F05252] text-[#F05252] text-xs font-mono font-bold hover:bg-[#F05252] hover:text-white transition-colors"
                          >
                            Decline / Release
                          </button>
                        ) : (
                          <button
                            onClick={() => assignVolunteerToTask(selectedTask.id, vol.id)}
                            disabled={vol.status === 'assigned'}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                              vol.status === 'assigned'
                                ? 'bg-[#221C18] text-[#A89F91]/50 border border-[#393027] cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#D99055] to-[#B87239] text-[#0B0A09] hover:brightness-110 shadow-copper-sm'
                            }`}
                          >
                            Accept & Assign
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
