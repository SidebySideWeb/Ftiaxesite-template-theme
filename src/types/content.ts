// Content types for the blog/CMS system

export interface Tag {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  postCount?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  children?: Category[]
  postCount?: number
  image?: string
}

export interface Author {
  id: string
  name: string
  email?: string
  bio?: string
  avatar?: string
  socialLinks?: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
  }
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featuredImage?: string
  author: Author
  category: Category
  tags: Tag[]
  publishedAt: string
  updatedAt: string
  status: 'draft' | 'published' | 'archived'
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
  }
  readingTime?: number
  viewCount?: number
}

export interface Page {
  id: string
  title: string
  slug: string
  content: string
  featuredImage?: string
  publishedAt: string
  updatedAt: string
  status: 'draft' | 'published'
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
  }
  template?: 'default' | 'landing' | 'contact' | 'about'
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Type aliases for specific paginated responses
export type PostsResponse = PaginatedResponse<Post>
export type CategoriesResponse = PaginatedResponse<Category>
export type TagsResponse = PaginatedResponse<Tag>

// Search and filter types
export interface PostFilters {
  category?: string
  tags?: string[]
  author?: string
  status?: Post['status']
  search?: string
  dateFrom?: string
  dateTo?: string
}

export interface PostsQuery extends PostFilters {
  page?: number
  limit?: number
  sortBy?: 'publishedAt' | 'updatedAt' | 'title' | 'viewCount'
  sortOrder?: 'asc' | 'desc'
}