import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify"; // Optional: for toast notifications
import ProtectedRoute from "@/components/ProtectedRoute";

const Feed = () => {
  const [open, setOpen] = useState(false); // State to control the dialog
  const clearToken = useAuthStore((state) => state.clearToken); // Clear token from the state
  const router = useRouter();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Call the logout API
      await axios.get("http://localhost:3000/v1/users/auth/logout"); // Update the URL as necessary
      
      // Clear token and user from local storage and state
      clearToken(); 
      localStorage.removeItem("token"); // Remove token from localStorage
      
    //   toast.success("Logged out successfully"); // Optional: notify user of successful logout
      router.push("/login"); // Redirect to login page
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Logout failed, please try again."
      ); // Optional: notify user of logout failure
    }
  };

  return (
    <ProtectedRoute>

    <div className="flex items-center justify-end">
      {/* Profile Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="ml-2">
            Logout
          </Button>
        </DialogTrigger>

        {/* Logout Confirmation Dialog */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to log in again to access your profile.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleLogout} className="bg-red-600 text-white">
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </ProtectedRoute>
  );
};

export default Feed;
