import React, { useState, useEffect } from 'react';
import { Project, ProjectCategory } from '../../types';
import { projectsData } from '../../data/projectsData';
import { auditService } from '../../lib/audit';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Check,
  X,
  Layers,
  Sparkles,
  Code,
  Palette,
  AlertCircle,
} from 'lucide-react';

interface AdminProjectsProps {
  onPreviewProject?: (projectId: string) => void;
}

const STORAGE_KEY_PROJECTS = 'portfolio_projects_custom_v1';

export const AdminProjects: React.FC<AdminProjectsProps> = ({ onPreviewProject }) => {
  // Load stored custom projects or default to projectsData
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window === 'undefined') return projectsData;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROJECTS);
      return stored ? JSON.parse(stored) : projectsData;
    } catch {
      return projectsData;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Save projects to localStorage whenever modified
  const persistProjects = (updated: Project[]) => {
    setProjects(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
    }
  };

  const handleDuplicate = (project: Project) => {
    const cloned: Project = {
      ...JSON.parse(JSON.stringify(project)),
      id: `${project.id}-copy-${Date.now().toString(36).substring(2, 6)}`,
      title: `${project.title} (Clone)`,
      status: 'Prototype',
    };
    const updated = [cloned, ...projects];
    persistProjects(updated);
    auditService.log('project_duplicated', project.id, `Cloned project as "${cloned.title}"`);
  };

  const handleDelete = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    persistProjects(updated);
    auditService.log('project_deleted', id, `Deleted project ID ${id}`);
    setDeleteConfirmId(null);
  };

  const handleTogglePublish = (project: Project) => {
    const isProd = project.status === 'Production';
    const newStatus: Project['status'] = isProd ? 'Prototype' : 'Production';
    const updated = projects.map((p) => (p.id === project.id ? { ...p, status: newStatus } : p));
    persistProjects(updated);
    auditService.log(
      isProd ? 'project_archived' : 'project_published',
      project.id,
      `Changed status of "${project.title}" to ${newStatus}`
    );
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const updated = [...projects];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    persistProjects(updated);
  };

  const handleSaveEditor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isCreatingNew) {
      const updated = [editingProject, ...projects];
      persistProjects(updated);
      auditService.log('project_created', editingProject.id, `Created new project "${editingProject.title}"`);
    } else {
      const updated = projects.map((p) => (p.id === editingProject.id ? editingProject : p));
      persistProjects(updated);
      auditService.log('project_updated', editingProject.id, `Updated project "${editingProject.title}"`);
    }

    setEditingProject(null);
    setIsCreatingNew(false);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  const openNewProjectForm = () => {
    const newId = `project-${Date.now().toString(36)}`;
    const template: Project = {
      id: newId,
      title: 'New Spatial Experience',
      subtitle: 'Real-Time Dynamic Interactive Concept',
      tagline: 'Crafting responsive physical interfaces with WebGL and autonomous runtime agents.',
      category: ['Engineering', 'AI'],
      accentColor: '#8052ff',
      status: 'Prototype',
      year: '2026',
      overview: 'Synthesizing edge sensing, predictive intelligence, and tactile responsive design.',
      metrics: [
        { label: 'Throughput', value: '120k req/s' },
        { label: 'Latency', value: '4.2ms' },
      ],
      designer: {
        headline: 'Empowering Spatial Interaction',
        problem: 'Addressing cognitive load in high-bandwidth decision spaces.',
        researchInsights: ['Users require sub-50ms feedback loops.', 'Spatial depth enhances data retention by 40%.'],
        personas: [{ role: 'Lead Architect', focus: 'System observability', painPoint: 'Fragmented dashboard metrics' }],
        designSystemHighlights: ['Pure void #000000 background', 'Sculptural display typography', 'Tactile haptic states'],
        userJourney: [{ step: 'Initialization', action: 'Direct visual telemetry load', emotion: 'Focused' }],
        outcome: 'Reduced operational latency by 68% while elevating user agency.',
      },
      engineer: {
        headline: 'Ultra-Low Latency Distributed Pipeline',
        architectureSummary: 'WebAssembly execution core with WebGPU compute pipelines and resilient local caching.',
        techStack: ['TypeScript', 'Vite', 'Tailwind CSS', 'WebGPU', 'CRDT'],
        systemFlow: [{ stage: 'Ingress', component: 'Edge Gateway', throughputOrDetail: 'Zero-copy memory mapped buffer' }],
        keyChallenges: ['Maintaining sub-8ms 99th percentile frame timing under high canvas particle density.'],
        performanceGains: ['Zero garbage collection pauses via typed array memory reuse.'],
      },
      interactiveType: 'alzo-matrix',
    };
    setEditingProject(template);
    setIsCreatingNew(true);
  };

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' || p.category.includes(selectedCategory as ProjectCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <h2 className="text-xl font-normal text-white tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#8052ff]" />
            <span>Project Management Studio</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-[#9a9a9a] border border-white/10">
              {projects.length} Total
            </span>
          </h2>
          <p className="text-xs text-[#9a9a9a] font-extralight mt-1">
            Create, edit, duplicate, order, and publish dual-lens flagship portfolio projects.
          </p>
        </div>

        <button
          onClick={openNewProjectForm}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-white bg-[#8052ff] hover:bg-[#8052ff]/90 transition-all shadow-lg shadow-[#8052ff]/25 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {saveSuccessNotice && (
        <div className="p-3.5 rounded-2xl bg-[#15846e]/10 border border-[#15846e]/30 flex items-center gap-2 text-xs text-[#15846e] animate-fadeIn">
          <Check className="w-4 h-4 shrink-0" />
          <span>Project saved and synchronized to local storage successfully.</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a9a9a]" />
          <input
            type="text"
            placeholder="Search by title, role, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.02] border border-white/10 text-xs text-white placeholder-[#9a9a9a] focus:outline-none focus:border-[#8052ff]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
          {['All', 'Design', 'Engineering', 'AI', 'Automation', 'Research'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all border whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white/10 text-white border-white/20'
                  : 'bg-white/[0.02] text-[#9a9a9a] border-white/5 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table / Card List */}
      <div className="space-y-3">
        {filteredProjects.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#9a9a9a] border border-dashed border-white/10 rounded-3xl">
            No matching projects found.
          </div>
        ) : (
          filteredProjects.map((project, index) => {
            const isPublished = project.status === 'Production' || project.status === 'Live Demo';
            return (
              <div
                key={project.id}
                className="p-4 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left info */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className="w-3 h-12 rounded-full shrink-0"
                    style={{ backgroundColor: project.accentColor || '#8052ff' }}
                  />
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-normal text-white truncate">{project.title}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          isPublished
                            ? 'bg-[#15846e]/10 text-[#15846e] border-[#15846e]/30'
                            : 'bg-[#ffb829]/10 text-[#ffb829] border-[#ffb829]/30'
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#9a9a9a]">({project.year})</span>
                    </div>
                    <p className="text-xs text-[#9a9a9a] font-extralight line-clamp-1">{project.subtitle}</p>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {project.category.map((c) => (
                        <span key={c} className="text-[9px] font-mono px-2 py-0.2 rounded-md bg-white/[0.03] text-[#bdbdbd]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                  {/* Order controls */}
                  <div className="flex items-center gap-0.5 mr-2">
                    <button
                      onClick={() => handleMoveOrder(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 text-[#9a9a9a] hover:text-white disabled:opacity-20"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(index, 'down')}
                      disabled={index === projects.length - 1}
                      className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 text-[#9a9a9a] hover:text-white disabled:opacity-20"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Preview Simulator */}
                  {onPreviewProject && (
                    <button
                      onClick={() => onPreviewProject(project.id)}
                      className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#9a9a9a] hover:text-white transition-colors"
                      title="Launch interactive experience"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#8052ff]" />
                    </button>
                  )}

                  {/* Toggle publish */}
                  <button
                    onClick={() => handleTogglePublish(project)}
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#9a9a9a] hover:text-white transition-colors"
                    title={isPublished ? 'Unpublish to Draft' : 'Publish Project'}
                  >
                    {isPublished ? (
                      <Eye className="w-3.5 h-3.5 text-[#15846e]" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-[#ffb829]" />
                    )}
                  </button>

                  {/* Clone */}
                  <button
                    onClick={() => handleDuplicate(project)}
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#9a9a9a] hover:text-white transition-colors"
                    title="Duplicate Project"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => {
                      setEditingProject(JSON.parse(JSON.stringify(project)));
                      setIsCreatingNew(false);
                    }}
                    className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#9a9a9a] hover:text-white transition-colors"
                    title="Edit Details"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#8052ff]" />
                  </button>

                  {/* Delete */}
                  {deleteConfirmId === project.id ? (
                    <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-xl p-1">
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500 text-white"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="p-1 text-[#9a9a9a] hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(project.id)}
                      className="p-2 rounded-xl bg-white/[0.03] hover:bg-red-500/20 border border-white/10 text-[#9a9a9a] hover:text-red-400 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Full Modal Project Editor */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="max-w-3xl w-full max-h-[90vh] bg-[#000000] border border-white/15 rounded-3xl p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-normal text-white">
                  {isCreatingNew ? 'Create New Portfolio Project' : `Edit: ${editingProject.title}`}
                </h3>
                <span className="text-[11px] font-mono text-[#8052ff]">ID: {editingProject.id}</span>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="p-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-[#9a9a9a] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditor} className="space-y-6">
              {/* General metadata */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase text-[#9a9a9a] tracking-wider">General Metadata</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-[#9a9a9a]">Project Title</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#9a9a9a]">Year</label>
                    <input
                      type="text"
                      value={editingProject.year}
                      onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#9a9a9a]">Subtitle / Role Headline</label>
                  <input
                    type="text"
                    value={editingProject.subtitle}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#9a9a9a]">Tagline</label>
                  <textarea
                    rows={2}
                    value={editingProject.tagline}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-[#9a9a9a]">Accent Color</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="color"
                        value={editingProject.accentColor || '#8052ff'}
                        onChange={(e) => setEditingProject({ ...editingProject, accentColor: e.target.value })}
                        className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={editingProject.accentColor}
                        onChange={(e) => setEditingProject({ ...editingProject, accentColor: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#9a9a9a]">Status</label>
                    <select
                      value={editingProject.status}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, status: e.target.value as Project['status'] })
                      }
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
                    >
                      <option value="Production">Production (Live)</option>
                      <option value="Live Demo">Live Demo</option>
                      <option value="Prototype">Prototype (Draft)</option>
                      <option value="Case Study">Case Study Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Designer Lens */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase text-[#8052ff] tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Designer Lens Specifications</span>
                </h4>

                <div>
                  <label className="text-[11px] font-mono text-[#9a9a9a]">Designer Headline</label>
                  <input
                    type="text"
                    value={editingProject.designer?.headline || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        designer: { ...editingProject.designer, headline: e.target.value },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#9a9a9a]">Problem Statement</label>
                  <textarea
                    rows={2}
                    value={editingProject.designer?.problem || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        designer: { ...editingProject.designer, problem: e.target.value },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
                  />
                </div>
              </div>

              {/* Engineer Lens */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase text-[#15846e] tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" />
                  <span>Engineer Lens Specifications</span>
                </h4>

                <div>
                  <label className="text-[11px] font-mono text-[#9a9a9a]">Engineer Headline</label>
                  <input
                    type="text"
                    value={editingProject.engineer?.headline || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        engineer: { ...editingProject.engineer, headline: e.target.value },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#9a9a9a]">Architecture Summary</label>
                  <textarea
                    rows={2}
                    value={editingProject.engineer?.architectureSummary || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        engineer: { ...editingProject.engineer, architectureSummary: e.target.value },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#9a9a9a]">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    value={(editingProject.engineer?.techStack || []).join(', ')}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        engineer: {
                          ...editingProject.engineer,
                          techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white focus:border-[#8052ff] outline-none font-mono"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-full text-xs text-[#9a9a9a] hover:text-white transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-full text-xs font-mono text-white bg-[#8052ff] hover:bg-[#8052ff]/90 transition-all shadow-lg shadow-[#8052ff]/25"
                >
                  Save Project Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
