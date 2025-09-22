export interface Article {
  id: number;
  status: "draft" | "published" | "archived";
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  Title: string;
  content: string;
  featured_image_url: string;
}

export interface ArticleResponse {
  data: Article[];
}

export interface Events {
  id: number;
  sort: null;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_approved: boolean;
  image: string;
}

export interface EventResponse {
  data: Events[];
}


export interface User {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  email: string;
  profile_picture_url: string;
  is_verified: boolean;
  location: string;
  description: string;
  title: string;
  role: string;
  last_access: string; // ISO date string
  expertise: string;
  coordinates: {
    lat: string;
    lon: string;
  };
  phone: string;
  whatsapp: string;
  city: string;
  language: string;
}

export interface ApiResponse {
  data: User;
}
