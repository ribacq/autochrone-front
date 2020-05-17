import { User } from './user';
import { Sprint } from './sprint';

export class Project {
  id: number;
  userId: number;
  name: string;
  slug: string;
  dateStart: Date;
  dateEnd: Date;
  wordCountStart: number;
  wordCountGoal: number;
  sprints: Sprint[];

  // copy data from interface to object
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
	let sum = this.wordCountStart;
	for (let i in this.sprints) {
	  sum += this.sprints[i].wordCount;
	}
	return sum;
  }

  get wordsLeft(): number { return this.wordCountGoal - this.currentWordCount; }

  get completionPct(): string {
	return (100 * this.currentWordCount / this.wordCountGoal).toFixed(1);
  }

  // TODO timeSpent, timeSpentDaily, ageInDays, daysLeft, endAtCurrentSpeed, isLate, WPM, WPH, WPD, wordsWrittenOn, wordsWrittenToday, wordsWrittenThisWeek, dailyGoal, weeklyGoal, wordsLeftToday, wordsLeftThisWeek
}
