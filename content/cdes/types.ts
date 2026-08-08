export type CDEValue = {
  label: string;
  text: string;
};

export type CDETimelineItem = {
  year: string;
  title: string;
  text: string;
};

export type CDEEducator = {
  name: string;
  role: string;
  bio: string;
  interests: string[];
  image: string;
};

export type CDEProject = {
  title: string;
  description: string;
  status: string;
  date: string;
  image: string;
};

export type CDEGalleryItem = {
  src: string;
  alt: string;
  label: string;
};

export type CDEFeedPost = {
  author: string;
  role: string;
  text: string;
  time: string;
  comments: number;
  likes: number;
  image?: string;
};

export type CDEData = {
  slug: string;
  country: string;
  region: string;
  communityName: string;
  logoLabel: string;
  description: string;
  heroImage: string;
  welcome: string;
  history: string[];
  philosophy: string;
  mission: string;
  vision: string;
  values: CDEValue[];
  timeline: CDETimelineItem[];
  educators: CDEEducator[];
  projects: CDEProject[];
  gallery: CDEGalleryItem[];
  feed: CDEFeedPost[];
};
