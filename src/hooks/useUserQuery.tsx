import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from 'apis';
import { useState } from 'react';
import { ProfileResult } from 'apis/User';

const useUserQuery = () => {
  const queryClient = useQueryClient();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const Profile = (): {update: () => void, loggedIn: boolean, data: ProfileResult | undefined} => {
    const { data, status } = useQuery({
      queryKey: ['profile'],
      staleTime: 1000 * 3600,
      retry: false,
      queryFn: User().profile,
      onSuccess: (res) => {
        setLoggedIn(res?.data.success ? true : false);
      },
      onError: () => {
        setLoggedIn(false);
      }
    });

    const update = () => {
      queryClient.prefetchQuery(['profile'], User().profile);
    }

    if(status === 'loading' && localStorage.getItem('id') !== null){ // loading 중 일 때는 localStroage에 저장되어 있는 정보 제공
      return {update, loggedIn: true, data: {
        ...JSON.parse(localStorage.getItem('data') || '{}') as ProfileResult,
        success: true
      }};
    }
  
    return {update, loggedIn, data: data?.data};
  }

  return { Profile }
}

export default useUserQuery