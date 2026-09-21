import React, { Suspense, lazy } from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

// Lazy load the Admin Application so it is excluded from the public portfolio bundle
const AdminApp = lazy(() => import('./AdminApp'));

interface AdminRouteBoundaryProps {
  onBackToPublic: () => void;
}

export const AdminRouteBoundary: React.FC<AdminRouteBoundaryProps> = ({ onBackToPublic }) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 select-none font-mono">
          <div className="relative flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8052ff]/10 border border-[#8052ff]/30 flex items-center justify-center text-[#8052ff] animate-pulse">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <span className="text-xs text-[#8052ff] tracking-widest uppercase">
                NEERAV.OS KERNEL
              </span>
              <p className="text-sm text-slate-300">
                Initializing Protected Admin Studio...
              </p>
            </div>
          </div>
        </div>
      }
    >
      <AdminApp onBackToPublic={onBackToPublic} />
    </Suspense>
  );
};
