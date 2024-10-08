export interface IconProps {
  className?: string;
}

export interface CustomButtonProps {
  className?: string;
  content?: string;
  onClick?: () => void;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  salary: string;
  location: string;
  schedule: string;
  timestamp: string;
  pinned: number;
  link: string;
}

export interface DockProps {
  className: string;
  setPage: (page: string) => void;
}

export interface JobsFromDB {
  data: Job[];
}
