export interface IconProps {
  className?: string;
}

export interface Job {
  title: string;
  company: string;
  salary: string;
  location: string;
  schedule: string;
  timestamp: Date;
  pinned: boolean;
}
