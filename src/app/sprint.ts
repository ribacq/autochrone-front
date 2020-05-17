export class Sprint {
  id: number;
  slug: string;
  projectId: number;
  timeStart: Date;
  duration: number;
  break: number;
  wordCount: number;
  isMilestone: boolean;
  comment: string;

  // copy data from interface to object
  constructor(data: Sprint) {
	this.id = data.id;
	this.slug = data.slug;
	this.projectId = data.projectId;
	this.timeStart = data.timeStart;
	this.duration = data.duration;
	this.break = data.break;
	this.wordCount = data.wordCount;
	this.isMilestone = data.isMilestone;
	this.comment = data.comment;
  }

  // date stats
  get timeEnd(): Date { return new Date(this.timeStart.valueOf() + this.duration*60*1000); }
  get upcoming(): boolean { return this.timeStart.valueOf() > Date.now(); }
  get running(): boolean { return (this.timeStart.valueOf() <= Date.now()) && (this.timeEnd.valueOf() > Date.now()); }
  get over(): boolean { return this.timeEnd.valueOf() < Date.now(); }
}
