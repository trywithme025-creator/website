
export interface User {
  username: string;
  email: string;
  avatar: string;
}

export interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: number;
}

export enum Section {
  Home = 'home',
  Features = 'features',
  Community = 'community',
  Contact = 'contact'
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
