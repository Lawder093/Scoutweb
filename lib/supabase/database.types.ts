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
      conecta_users: {
        Row: {
          id: string;
          name: string;
          password_hash: string | null;
          is_active: boolean;
          phone: string | null;
          photo_path: string | null;
          cde_slug: string | null;
          community: string | null;
          otp_code_hash: string | null;
          otp_expires_at: string | null;
          otp_requested_at: string | null;
          otp_attempts: number;
          last_login_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          password_hash?: string | null;
          is_active?: boolean;
          phone?: string | null;
          photo_path?: string | null;
          cde_slug?: string | null;
          community?: string | null;
          otp_code_hash?: string | null;
          otp_expires_at?: string | null;
          otp_requested_at?: string | null;
          otp_attempts?: number;
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          password_hash?: string | null;
          is_active?: boolean;
          phone?: string | null;
          photo_path?: string | null;
          cde_slug?: string | null;
          community?: string | null;
          otp_code_hash?: string | null;
          otp_expires_at?: string | null;
          otp_requested_at?: string | null;
          otp_attempts?: number;
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      conecta_posts: {
        Row: {
          id: string;
          title: string;
          caption: string;
          image_path: string;
          location: string | null;
          external_url: string | null;
          is_published: boolean;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          caption: string;
          image_path: string;
          location?: string | null;
          external_url?: string | null;
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          caption?: string;
          image_path?: string;
          location?: string | null;
          external_url?: string | null;
          is_published?: boolean;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      conecta_comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          body: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          body?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "conecta_comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "conecta_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conecta_comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "conecta_users";
            referencedColumns: ["id"];
          }
        ];
      };
      cde_activities: {
        Row: {
          id: string;
          cde_slug: string;
          slug: string;
          title: string;
          event_date: string;
          image_path: string | null;
          summary: string;
          body: string;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          cde_slug: string;
          slug: string;
          title: string;
          event_date: string;
          image_path?: string | null;
          summary: string;
          body?: string;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          cde_slug?: string;
          slug?: string;
          title?: string;
          event_date?: string;
          image_path?: string | null;
          summary?: string;
          body?: string;
          is_published?: boolean;
          published_at?: string | null;
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
