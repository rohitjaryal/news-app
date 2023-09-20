import { fetchRequest } from '../includes/axios.ts';
import once from 'lodash/once';
import { HeadlineRequest, HeadlineResponse, Source } from '../types/list.types.ts';

export interface SourceResponse {
  data: {
    status: string;
    sources: Source[];
  };
}

export const getTopHeadlines = async (data: HeadlineRequest): Promise<HeadlineResponse> => {
  const { country = 'us', q, sources } = data;
  const query = new URLSearchParams();
  query.set('country', country);
  if (q) {
    query.set('q', q);
  }

  const sourcesIds = sources?.map(({ id }) => id);
  if (sourcesIds) {
    query.set('sources', sourcesIds.toString());
    // The API doesn't work with both sources and country params.
    query.delete('country');
  }

  const requestUrl = `v2/top-headlines?${query.toString()}`;
  return fetchRequest.get(requestUrl);
};

export const getSources = once(async (): Promise<SourceResponse> => {
  return fetchRequest.get('v2/sources');
});

export const getErrorApiCall = async (): Promise<HeadlineResponse> => {
  return fetchRequest.get('v2/top-headlines/does-not-exist');
};
