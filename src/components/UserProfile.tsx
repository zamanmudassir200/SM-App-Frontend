// // // components/UserProfile.tsx
// // import useSWR from 'swr';
// // import { useAuthStore } from '../store/useAuthStore';
// // import axios from 'axios';

// // const fetcher = (url: string) => axios.get(url).then(res => res.data);

// // const UserProfile = () => {
// //     const token = useAuthStore((state) => state.token);
// //     const { data, error } = useSWR(token ? 'http://localhost:3000/v1/users/profile' : null, fetcher);

// //     if (error) return <div>Error loading profile</div>;
// //     if (!data) return <div>Loading...</div>;

// //     return (
// //         <div>
// //             <h1>{token}{data.name}</h1>
// //             <p>{data.email}</p>
// //             {/* Other profile details */}
// //         </div>
// //     );
// // };

// // export default UserProfile;
// import { useQuery } from '@tanstack/react-query';
// import { useAuthStore } from '../store/useAuthStore';
// import axios from 'axios';
// import { Card } from '@/components/ui/card'; // Import Shadcn UI components

// const fetchUserProfile = async (token: string) => {
//     const { data } = await axios.get(`http://localhost:3000/v1/users/${data._id}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return data;
// };

// const UserProfile = () => {
//     const token = useAuthStore((state) => state.token);
//     const { data, error, isLoading } = useQuery({
//         queryKey: ['userProfile', token],
//         queryFn: () => {
//             if (!token) throw new Error("Token is required"); // This ensures fetchUserProfile is only called with a valid token
//             return fetchUserProfile(token);
//         },
//         enabled: !!token, // Only run if token is present
//     });

//     if (isLoading) return <div className="text-center">Loading...</div>;
//     if (error) return <div className="text-center text-red-500">Error loading profile</div>;

//     return (
//         <Card className="p-4 shadow-md">
//             <h1 className="text-xl font-bold">{data.name}</h1>
//             <p className="text-gray-600">{data.email}</p>
//             {/* Other profile details */}
//         </Card>
//     );
// };

// export default UserProfile;

