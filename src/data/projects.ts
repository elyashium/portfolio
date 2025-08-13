import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    screenshots: [
      'https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    liveDemo: 'https://example.com',
    githubRepo: 'https://github.com/username/ecommerce'
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['Vue.js', 'Firebase', 'Vuetify', 'Socket.io'],
    screenshots: [
      'https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/5240544/pexels-photo-5240544.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    liveDemo: 'https://example.com',
    githubRepo: 'https://github.com/username/taskmanager'
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that displays current conditions and forecasts using multiple weather APIs with beautiful data visualizations.',
    technologies: ['JavaScript', 'Chart.js', 'OpenWeather API', 'CSS3'],
    screenshots: [
      'https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    liveDemo: 'https://example.com',
    githubRepo: 'https://github.com/username/weather'
  }
];