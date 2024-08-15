export interface Mentor {
  id: string;
  name: string;
  yoe: number;
  areasOfExpertise: string[];
  companies: string[];
  availabilities: JSON[];
}

export interface Schedule {
  id: string;
  startTime: Date;
  endTime: Date;
  studentName: string;
  studentEmail: string;
  mentorId: string;
  duration: number;
  mentor: Mentor;
}

export interface ScheduleEmailData {
  studentName: string;
  studentEmail: string;
  mentorName: string;
  date: string;
  startTime: string;
  duration: number;
}