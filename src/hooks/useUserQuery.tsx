import { useQuery } from '@tanstack/react-query';
import { User } from 'api';

const useUserQuery = () => {
    const Profile = () => {
        const data = useQuery({
            queryKey: ['profile'],
            staleTime: 1000 * 3600,
            retry: false,
            queryFn: User().profile
        });
        const loggedIn: boolean = data.data?.data.success ? true : false;

        return { loggedIn, ...data.data?.data };
    }

    return { Profile }
}

export default useUserQuery