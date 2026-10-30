export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  meta_title?: string;
  meta_description?: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  bio: string;
  profile_image?: string;
  role: string;
  email?: string;
  twitter_url?: string;
  linkedin_url?: string;
  github_url?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featured_image?: string;
  author?: Author;
  category?: Category;
  tags?: Tag[];
  published_at: string;
  updated_at?: string;
  reading_time: number;
  views_count?: number;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  related_posts?: BlogPost[];
}

export interface Tutorial {
  id: number;
  title: string;
  slug: string;
  category: string;
  category_display: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  introduction: string;
  content?: string;
  code_examples?: string;
  estimated_reading_time: number;
  author?: Author;
  published_date?: string;
  updated_date?: string;
  order: number;
  related_tutorials?: Tutorial[];
  category_siblings?: Array<{ id: number; title: string; slug: string; difficulty: string; order: number }>;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
}

export interface Resource {
  id: number;
  title: string;
  slug: string;
  resource_type: string;
  resource_type_display: string;
  description: string;
  content?: string;
  badge_text?: string;
  download_url?: string;
  external_url?: string;
  tags?: Tag[];
  featured: boolean;
  order: number;
  created_at: string;
}

export interface CaseStudy {
  id: number;
  project_name: string;
  title: string;
  slug: string;
  client_or_type: string;
  summary: string;
  background?: string;
  problem?: string;
  solution?: string;
  technology_used: string[];
  architecture?: string;
  development_process?: string;
  challenges?: string;
  results?: string;
  lessons_learned?: string;
  cover_image?: string;
  live_url?: string;
  featured: boolean;
  order: number;
  created_at: string;
  related_studies?: CaseStudy[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  screenshots: string[];
  technologies: string[];
  status: string;
  website_url?: string;
  app_url?: string;
  documentation_url?: string;
  github_url?: string;
  featured: boolean;
  order: number;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon_name: string;
  benefits: string[];
  deliverables: string[];
  technologies: string[];
  order: number;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface SiteOverview {
  site: {
    site_name: string;
    tagline: string;
    hero_heading: string;
    hero_subheading: string;
    contact_email: string;
    contact_phone: string;
    address: string;
    meta_title: string;
    meta_description: string;
  };
  featured_products: Product[];
  services: Service[];
  recent_posts: BlogPost[];
  recent_tutorials: Tutorial[];
  featured_case_studies: CaseStudy[];
}
