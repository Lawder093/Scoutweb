export type PostcardView = {
  id: string;
  author_id: string;
  author_name: string;
  country_code: string;
  country_name: string;
  group_name: string;
  group_logo_url: string | null;
  cover_image_url: string | null;
  message: string;
  status: string;
  submitted_at: string;
  approved_at: string | null;
  published_at: string | null;
  expires_at: string | null;
  rejection_reason: string | null;
};
