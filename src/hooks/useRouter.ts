import { useState, useEffect, useCallback } from 'react';

export type PublicRoute = 'home' | 'work' | 'journey' | 'lab' | 'about' | 'contact';
export type AppRoute = PublicRoute | 'admin';

export interface RouteState {
  currentRoute: AppRoute;
  activeExperienceId: string | null;
  isAdmin: boolean;
}

export const useRouter = () => {
  const parseCurrentLocation = (): RouteState => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);

    // Admin detection
    if (path.startsWith('/admin') || hash.startsWith('#/admin') || hash === '#admin') {
      return {
        currentRoute: 'admin',
        activeExperienceId: null,
        isAdmin: true,
      };
    }

    // Check project experience query or path
    const projectFromQuery = searchParams.get('project');
    const projectFromHash = hash.startsWith('#/project/') ? hash.replace('#/project/', '') : null;
    const projectFromPath = path.startsWith('/work/') ? path.replace('/work/', '') : null;
    const activeProject = projectFromQuery || projectFromHash || projectFromPath || null;

    // Public sections
    let currentRoute: PublicRoute = 'home';
    if (path.includes('/work') || hash === '#work') currentRoute = 'work';
    else if (path.includes('/journey') || hash === '#journey') currentRoute = 'journey';
    else if (path.includes('/lab') || hash === '#lab') currentRoute = 'lab';
    else if (path.includes('/about') || hash === '#about') currentRoute = 'about';
    else if (path.includes('/contact') || hash === '#contact') currentRoute = 'contact';

    return {
      currentRoute,
      activeExperienceId: activeProject,
      isAdmin: false,
    };
  };

  const [routeState, setRouteState] = useState<RouteState>(parseCurrentLocation);

  // Sync on browser popstate
  useEffect(() => {
    const handlePopState = () => {
      setRouteState(parseCurrentLocation());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Secret Owner shortcut (Ctrl+Shift+A or Cmd+Shift+A) to access /admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigate helper
  const navigate = useCallback((pathOrSection: string, projectId?: string) => {
    if (pathOrSection === '/admin' || pathOrSection === 'admin') {
      window.history.pushState(null, '', '/admin');
      setRouteState({
        currentRoute: 'admin',
        activeExperienceId: null,
        isAdmin: true,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const cleanSection = pathOrSection.replace(/^\//, '').replace(/^#/, '') || 'home';
    const cleanProject = projectId || null;

    const newUrl = cleanProject
      ? `/work?project=${cleanProject}`
      : cleanSection === 'home'
      ? '/'
      : `/${cleanSection}`;

    window.history.pushState(null, '', newUrl);

    setRouteState({
      currentRoute: (cleanSection as PublicRoute) || 'home',
      activeExperienceId: cleanProject,
      isAdmin: false,
    });

    if (!cleanProject) {
      setTimeout(() => {
        const el = document.getElementById(cleanSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const openExperience = useCallback((projectId: string) => {
    navigate('work', projectId);
  }, [navigate]);

  const closeExperience = useCallback(() => {
    navigate('work');
  }, [navigate]);

  return {
    ...routeState,
    navigate,
    openExperience,
    closeExperience,
  };
};
