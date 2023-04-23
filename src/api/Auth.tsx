import axios from 'axios';

const Auth = () => {
    const login = async (id: string, password: string) => {
        const res = await axios.get('http://localhost:3000/auth');
        return res;
    }

    return { login };
}

export default Auth;