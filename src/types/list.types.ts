export type Source = {
  id: null | string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};

export type Article = {
  source: Pick<Source, 'id' | 'name'>;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type HeadlineResponse = {
  data: {
    status: string;
    totalResults: number;
    articles: Article[];
  };
};

export type HeadlineRequest = {
  q?: string;
  country?: string;
  sources?: string[];
};

export interface Sources extends Source {
  status: string;
}
