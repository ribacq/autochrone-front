import { DateTime } from 'luxon';

export class Sprint {
  id: number;
  slug: string;
  projectId: number;
  timeStart: DateTime;
  duration: number;
  break: number;
  wordCount: number;
  isMilestone: boolean;
  comment: string;

  // copy data from interface to object
  constructor(data: any) {
	this.id = data.id as number;
	this.slug = data.slug as string;
	this.projectId = data.projectId as number;
	this.timeStart = DateTime.fromISO(data.timeStart as string);
	this.duration = data.duration as number;
	this.break = data.break as number;
	this.wordCount = data.wordCount as number;
	this.isMilestone = data.isMilestone as boolean;
	this.comment = data.comment as string;
  }

  // date stats
  get timeEnd(): DateTime { return this.timeStart.plus({minutes: this.duration}); }
  get upcoming(): boolean { return this.timeStart > DateTime.local(); }
  get over(): boolean { return this.timeEnd < DateTime.local(); }
  get running(): boolean { return !this.upcoming && !this.over; }

  // display
  get prettyTimeStart(): string { return this.timeStart.toLocaleString(DateTime.DATETIME_MED); }
  get prettyTimeEnd(): string { return this.timeEnd.toLocaleString(DateTime.DATETIME_MED); }
}
