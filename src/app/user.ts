import { Project } from './project';

export interface User {
  id: number;
  username: string;
  projects: Project[];
}
