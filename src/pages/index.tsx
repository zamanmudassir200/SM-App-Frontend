// pages/index.tsx

// import UserProfile from '../components/UserProfile';
// import UpdateProfile from '../components/UpdateProfile';
// import ResetPassword from '../components/ResetPassword';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '../store/useAuthStore';
// import AuthForm from '@/components/AuthForm';
import MainSection from '@/components/MainSection';
import Footer from '@/components/Footer';

const Home = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <div className=''>
            <Navbar/>
            <MainSection/>
            <Footer/>
       
        </div>
    );
};

export default Home;
