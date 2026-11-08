export type CategoryFilter = 'all' | 'PRODUCT CONCEPT' | 'COMMUNITY PROJECT';

export interface Initiative {
  id: string;
  projectNumber: string;
  status: string;
  isCommunity?: boolean;
  category: string;
  title: string;
  desc: string;
  categoryType: 'PRODUCT CONCEPT' | 'COMMUNITY PROJECT';
}

export interface PillarDetail {
  id: string;
  pillarNum: string;
  directionTag: string;
  title: string;
  desc: string;
  capabilities: { index: string; label: string }[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  direction: string;
  message: string;
}

