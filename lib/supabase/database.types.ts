export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      content_authors: {
        Row: {
          id: string;
          name: string;
          slug: string;
          bio: string | null;
          avatar_path: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          bio?: string | null;
          avatar_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          bio?: string | null;
          avatar_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          body: string;
          category: string;
          cover_image_path: string | null;
          author_id: string | null;
          source_id: number | null;
          source_url: string | null;
          source_modified_at: string | null;
          author_name: string | null;
          categories: string[];
          tags: string[];
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          body?: string;
          category: string;
          cover_image_path?: string | null;
          author_id?: string | null;
          source_id?: number | null;
          source_url?: string | null;
          source_modified_at?: string | null;
          author_name?: string | null;
          categories?: string[];
          tags?: string[];
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          body?: string;
          category?: string;
          cover_image_path?: string | null;
          author_id?: string | null;
          source_id?: number | null;
          source_url?: string | null;
          source_modified_at?: string | null;
          author_name?: string | null;
          categories?: string[];
          tags?: string[];
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "content_authors";
            referencedColumns: ["id"];
          }
        ];
      };
      library_resources: {
        Row: {
          id: string;
          slug: string;
          title: string;
          creator: string;
          description: string;
          cover_image_path: string | null;
          file_path: string | null;
          file_mime_type: string | null;
          is_public: boolean;
          published_at: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          creator: string;
          description: string;
          cover_image_path?: string | null;
          file_path?: string | null;
          file_mime_type?: string | null;
          is_public?: boolean;
          published_at?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          creator?: string;
          description?: string;
          cover_image_path?: string | null;
          file_path?: string | null;
          file_mime_type?: string | null;
          is_public?: boolean;
          published_at?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"];
