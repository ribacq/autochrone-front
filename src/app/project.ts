import { User } from './user';

export class Project {
  id: number;
  userId: number;
  name: string;
  slug: string;
  dateStart: Date;
  dateEnd: Date;
  wordCountStart: number;
  wordCountGoal: number;

  constructor(data: Project) {
	this.id = data.id;
	this.userId = data.userId;
	this.name = data.name;
	this.slug = data.slug;
	this.dateStart = data.dateStart;
	this.dateEnd = data.dateEnd;
	this.wordCountStart = data.wordCountStart;
	this.wordCountGoal = data.wordCountGoal;
  }

  isSprintAllowedForUser(user: User): boolean {
	return !!user && user.id === this.userId;
  }

  get currentWordCount(): number {
	// TODO: sprints
	return 42;
  }

  get completionPct(): string {
	return (100 * this.currentWordCount / this.wordCountGoal).toFixed(1);
  }
}
