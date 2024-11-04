// import { useState } from 'react';
// import { useAuthStore } from '../store/useAuthStore';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';

// const UpdateProfile = () => {
//     const [name, setName] = useState('');
//     const [bio, setBio] = useState('');
//     const token = useAuthStore((state) => state.token);

//     const handleUpdate = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await axios.put('http://localhost:3000/v1/users/profile', { name, bio }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             alert('Profile updated successfully');
//         } catch (error) {
//             console.error('Update failed:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
//             <Input 
//                 placeholder="Name" 
//                 value={name} 
//                 onChange={(e) => setName(e.target.value)} 
//                 required 
//                 className="border rounded-lg p-2" 
//             />
//             <Textarea 
//                 placeholder="Bio" 
//                 value={bio} 
//                 onChange={(e) => setBio(e.target.value)} 
//                 required 
//                 className="border rounded-lg p-2" 
//             />
//             <Button type="submit" className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition">
//                 Update Profile
//             </Button>
//         </form>
//     );
// };

// export default UpdateProfile;
