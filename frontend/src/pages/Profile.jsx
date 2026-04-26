import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User, Mail, Shield, BookOpen, Camera, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('photo', file);

      const res = await api.patch('/users/updateMe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.status === 'success') {
        updateUser(res.data.data.user);
        toast.success('Profile picture updated successfully!');
      }
    } catch (error) {
      console.error('Failed to upload image', error);
      toast.error(error.response?.data?.message || 'Failed to update profile picture');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="glass-effect rounded-2xl overflow-hidden">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-primary to-accent opacity-80"></div>
        
        <div className="px-8 pb-8">
          {/* Profile Avatar */}
          <div className="relative -mt-16 mb-6">
            <div 
              className="group relative w-32 h-32 rounded-full border-4 border-dark-card bg-dark-bg overflow-hidden flex items-center justify-center cursor-pointer"
              onClick={handleImageClick}
            >
              {uploading ? (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-300 z-10">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300" />
                </div>
              )}
              
              {user?.photo ? (
                <img 
                  src={user.photo} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : user?.name ? (
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.name}&size=128&background=random`} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-500" />
              )}
            </div>
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{user?.name || 'Student Name'}</h1>
              <p className="text-primary font-medium capitalize">{user?.role || 'Student'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-dark-border">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
                
                <div className="flex items-center gap-3 text-gray-300 bg-dark-card/50 p-4 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                    <p className="font-medium">{user?.email || 'student@example.com'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300 bg-dark-card/50 p-4 rounded-xl">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Account Status</p>
                    <p className="font-medium text-green-400">Active</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white mb-4">Learning Stats</h3>
                
                <div className="flex items-center gap-3 text-gray-300 bg-dark-card/50 p-4 rounded-xl">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Enrolled Courses</p>
                    <p className="font-medium text-xl">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
