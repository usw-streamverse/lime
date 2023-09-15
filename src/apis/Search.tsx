import JwtInterceptor from './JwtInterceptor';

export interface SearchItem {
    id: number,
    nickname: string,
    profile: string,
    title: string,
    created: string,
    view_count: number,
    duration: number,
    thumbnail: string,
    explanation: string
}

const Search = () => {
    const search = (query: string) => {
        return JwtInterceptor().instance.get<SearchItem[]>(`/search/${query}`);
    }

    return { search };
}

export default Search;