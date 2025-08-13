export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  screenshots: string[];
  liveDemo?: string;
  githubRepo?: string;
}

export interface PersonaState {
  currentAngle: number;
  currentBackground: string;
}