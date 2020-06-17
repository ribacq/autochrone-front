import { DateTime, Duration } from 'luxon';

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
  inviteSlug: string;
  inviteComment: string;

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
	this.inviteSlug = data.inviteSlug as string;
	this.inviteComment = data.inviteComment as string;
  }

  // misc. getters
  get isSingleSprint(): boolean { return this.break <= 0; }
  get isOpenToGuests(): boolean { return this.inviteSlug !== undefined; }

  // date stats
  get timeEnd(): DateTime { return this.timeStart.plus({minutes: this.duration}); }
  get upcoming(): boolean { return this.timeStart > DateTime.local(); }
  get over(): boolean { return this.timeEnd < DateTime.local(); }
  get running(): boolean { return !this.upcoming && !this.over; }
  untilStart(now: DateTime): Duration { return this.timeStart.diff(now).shiftTo('hours', 'minutes', 'seconds'); }
  untilEnd(now: DateTime): Duration { return this.timeEnd.diff(now).shiftTo('hours', 'minutes', 'seconds'); }

  // display
  get prettyTimeStart(): string { return this.timeStart.toLocaleString(DateTime.DATETIME_MED); }
  get prettyTimeEnd(): string { return this.timeEnd.toLocaleString(DateTime.DATETIME_MED); }
  prettyUntilStart(now: DateTime): string { return this.untilStart(now).toFormat("hh:mm:ss"); }
  prettyUntilEnd(now: DateTime): string { return this.untilEnd(now).toFormat("hh:mm:ss"); }
}
