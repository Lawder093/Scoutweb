export type ContentTone = "primary" | "secondary" | "accent" | "ink" | "mist";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  publishedAt: string;
  dateLabel: string;
  coverImageUrl: string | null;
  authorName: string | null;
  sourceUrl: string | null;
  categories: string[];
  tags: string[];
  tone: ContentTone;
};

export type BlogPostSummary = Omit<BlogPost, "body">;

export type LibraryResource = {
  id: string;
  slug: string;
  title: string;
  creator: string;
  description: string;
  categories: string[];
  tags: string[];
  publishedAt: string;
  dateLabel: string;
  coverImageUrl: string | null;
  readerUrl: string | null;
  fileUrl: string | null;
  downloadUrl: string | null;
  displayOrder: number;
  tone: ContentTone;
};
