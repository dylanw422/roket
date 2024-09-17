export interface IconProps {
  className?: string;
}

export interface CustomButtonProps {
  className?: string;
  content?: string;
  onClick?: () => void;
}

export interface Job {
  title: string;
  company: string;
  salary: string;
  location: string;
  schedule: string;
  timestamp: string;
  pinned: boolean;
}

export interface DockProps {
  className: string;
  setPage: (page: string) => void;
}

export interface JobsFromDB {
  data: Job[];
}
