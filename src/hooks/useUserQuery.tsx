import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from 'api';
import { useState } from 'react';
import { ProfileResult } from 'api/User';

const useUserQuery = () => {
    const queryClient = useQueryClient();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const Profile = (): [() => void, boolean, ProfileResult | undefined] => {
        const { data } = useQuery({
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
    
        return [update, loggedIn, data?.data];
    }

    return { Profile }
}

export default useUserQuery