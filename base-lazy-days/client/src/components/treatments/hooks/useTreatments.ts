import { useQuery, useQueryClient } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
// import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  // const toast = useCustomToast();

  // TODO: get data from server via useQuery
  const defaultData: Treatment[] = [];
  const { data = defaultData } = useQuery(queryKeys.treatments, getTreatments, {
    staleTime: 600000,
    cacheTime: 50000,
    refetchOnMount: false,
    // refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // onError: (error) => {
    //   const title =
    //     error instanceof Error ? error.message : 'Error connecting to server';
    //   toast({ title, status: 'error' });
    // },
  });
  return data;
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments, getTreatments);
}
