export interface Project {
  id: number;
  user_id: number;
  name: string;
  slug: string;
  date_start: Date;
  date_end: Date;
  word_count_start: number;
  word_count_goal: number;
}
