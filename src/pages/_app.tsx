import { AppProps } from "next/app";
import { useAuthStore } from "../store/useAuthStore";
import ProtectedRoute from "../components/ProtectedRoute";
import '@/app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    const token = useAuthStore((state) => state.token);
    const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    return (
        <>
            {(token || savedToken) ? (
                <ProtectedRoute>
                    <Component {...pageProps} />
                </ProtectedRoute>
            ) : (
                <Component {...pageProps} />
            )}

        </>
    );
}

export default MyApp;
