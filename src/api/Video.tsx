import JwtInterceptor from './JwtInterceptor';

export interface UploadResult {
    success: boolean,
    url?: string
}

const Video = () => {
    const upload = (formData: any) => {
        return JwtInterceptor().instance.post<UploadResult>('http://localhost:3000/videos', formData);
    }

    return { upload };
}

export default Video;