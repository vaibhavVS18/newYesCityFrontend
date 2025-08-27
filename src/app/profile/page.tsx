'use client';

import { useEffect, useState, useRef } from 'react';
import { handleImageUpload } from '@/utils/uploadImage';
import { getPremiumStatus, formatDate } from '@/utils/premiumUtils';

type User = {
  _id: string;
  email: string;
  username: string;
  phone: string;
  profileImage?: string;
  isPremium: 'FREE' | 'A' | 'B';
  premiumStartDate?: string;
  premiumExpiryDate?: string | null;
  referralCode?: string;
  referredBy?: string;
  contributionPoints: number;
  referralCount: number;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [usernameUpdating, setUsernameUpdating] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Failed to fetch user');
          return;
        }

        setUser(data.user);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && fileInputRef.current) {
      // Create a ref object with guaranteed non-null current
      const nonNullRef = { current: fileInputRef.current };
      handleImageUpload(file, setUser, setUploadError, setUploading, nonNullRef);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleUsernameEdit = () => {
    setIsEditingUsername(true);
    setNewUsername(user?.username || '');
    setUsernameError('');
  };

  const handleUsernameSave = async () => {
    if (!newUsername.trim()) {
      setUsernameError('Username cannot be empty');
      return;
    }

    if (newUsername === user?.username) {
      setIsEditingUsername(false);
      return;
    }

    setUsernameUpdating(true);
    setUsernameError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/updateUsername`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setUsernameError(data.error || 'Failed to update username');
        return;
      }

      // Update user state with new username
      setUser(prevUser => prevUser ? { ...prevUser, username: newUsername.trim() } : null);
      setIsEditingUsername(false);
    } catch (err) {
      console.error('Error updating username:', err);
      setUsernameError('Failed to update username');
    } finally {
      setUsernameUpdating(false);
    }
  };

  const handleUsernameCancel = () => {
    setIsEditingUsername(false);
    setNewUsername('');
    setUsernameError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center transform perspective-1000">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-spin mx-auto mb-6 shadow-2xl transform-gpu rotate-y-12"></div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-l from-blue-300 to-blue-500 rounded-full animate-pulse mx-auto opacity-50"></div>
          </div>
          <p className="text-blue-600 font-medium text-lg animate-pulse">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100 transform perspective-1000 rotate-x-2">
          <div className="text-red-500 mb-4 text-4xl">⚠️</div>
          <p className="text-red-600 font-medium text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100">
          <p className="text-blue-500 font-medium">No user data available</p>
        </div>
      </div>
    );
  }

  const premiumStatus = getPremiumStatus(user.isPremium, user.premiumExpiryDate || null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-full opacity-15 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full opacity-10 animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Upload Error Message */}
          {uploadError && (
            <div className="mb-8 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-2xl shadow-lg transform perspective-1000 rotate-x-1 animate-slideDown">
              <div className="flex items-center">
                <span className="mr-2">❌</span>
                {uploadError}
              </div>
            </div>
          )}

          {/* Username Error Message */}
          {usernameError && (
            <div className="mb-8 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 rounded-2xl shadow-lg transform perspective-1000 rotate-x-1 animate-slideDown">
              <div className="flex items-center">
                <span className="mr-2">❌</span>
                {usernameError}
              </div>
            </div>
          )}

          {/* Main Profile Container */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-100 overflow-hidden transform perspective-1000 hover:shadow-3xl transition-all duration-500">
            
            {/* 3D Header Section */}
            <div className="relative bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-8 py-12 transform-gpu">
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
                <div className="absolute bottom-8 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-float-delayed"></div>
                <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-bounce-slow"></div>
              </div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                
                {/* 3D Profile Image */}
                <div className="relative group transform-gpu">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white/50 overflow-hidden shadow-2xl transform-gpu hover:scale-105 hover:rotate-3 transition-all duration-300 bg-gradient-to-br from-white to-blue-100">
                    <img
                      src={user.profileImage || '/assets/default-avatar.jpg'}
                      alt={user.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* 3D Upload Overlay */}
                  <div 
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer transform-gpu hover:scale-105"
                    onClick={triggerFileSelect}
                  >
                    {uploading ? (
                      <div className="text-white text-sm animate-pulse text-center">
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <div className="font-medium">Uploading...</div>
                      </div>
                    ) : (
                      <div className="text-white text-sm text-center font-medium">
                        <div className="text-2xl mb-2">📷</div>
                        <div>Change Photo</div>
                      </div>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={uploading}
                  />
                </div>
                
                {/* User Info */}
                <div className="text-white text-center lg:text-left flex-1">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-3 drop-shadow-lg">{user.username}</h1>
                  <p className="text-blue-100 mb-4 text-lg">{user.email}</p>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${premiumStatus.color} backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-200`}>
                    {premiumStatus.text}
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Content Grid */}
            <div className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Personal Information Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-100 transform perspective-1000 hover:rotate-y-2 hover:shadow-2xl transition-all duration-300">
                  <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                    <span className="mr-3 text-blue-500">👤</span>
                    Personal Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl backdrop-blur-sm hover:bg-blue-50/80 transition-all duration-200">
                      <span className="text-blue-700 font-medium">Phone Number</span>
                      <span className="text-blue-900 font-mono font-semibold">{user.phone}</span>
                    </div>
                    
                    {/* Editable Username Field */}
                    <div className="p-3 bg-blue-50/50 rounded-xl backdrop-blur-sm hover:bg-blue-50/80 transition-all duration-200">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">Username</span>
                        {!isEditingUsername ? (
                          <div className="flex items-center space-x-2">
                            <span className="text-blue-900 font-semibold">{user.username}</span>
                            <button
                              onClick={handleUsernameEdit}
                              className="text-blue-500 hover:text-blue-700 transition-colors duration-200 p-1 rounded-full hover:bg-blue-100/50"
                              title="Edit username"
                            >
                              ✏️
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={newUsername}
                              onChange={(e) => setNewUsername(e.target.value)}
                              className="bg-white/80 border border-blue-300 rounded-lg px-3 py-1 text-blue-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                              disabled={usernameUpdating}
                              autoFocus
                              onKeyPress={(e) => e.key === 'Enter' && handleUsernameSave()}
                            />
                            <button
                              onClick={handleUsernameSave}
                              disabled={usernameUpdating}
                              className="text-green-500 hover:text-green-700 transition-colors duration-200 p-1 rounded-full hover:bg-green-100/50 disabled:opacity-50"
                              title="Save"
                            >
                              {usernameUpdating ? (
                                <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                '✓'
                              )}
                            </button>
                            <button
                              onClick={handleUsernameCancel}
                              disabled={usernameUpdating}
                              className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-100/50 disabled:opacity-50"
                              title="Cancel"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl backdrop-blur-sm hover:bg-blue-50/80 transition-all duration-200">
                      <span className="text-blue-700 font-medium">Email</span>
                      <span className="text-blue-900 text-sm break-all font-medium">{user.email}</span>
                    </div>
                  </div>
                </div>

                {/* Subscription Details Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-100 transform perspective-1000 hover:rotate-y-2 hover:shadow-2xl transition-all duration-300">
                  <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                    <span className="mr-3 text-blue-500">💎</span>
                    Subscription Details
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl backdrop-blur-sm hover:bg-blue-50/80 transition-all duration-200">
                      <span className="text-blue-700 font-medium">Plan Type</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${premiumStatus.color}`}>
                        {premiumStatus.text}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl backdrop-blur-sm hover:bg-blue-50/80 transition-all duration-200">
                      <span className="text-blue-700 font-medium">Start Date</span>
                      <span className="text-blue-900 font-medium">{formatDate(user.premiumStartDate)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl backdrop-blur-sm hover:bg-blue-50/80 transition-all duration-200">
                      <span className="text-blue-700 font-medium">Expiry Date</span>
                      <span className="text-blue-900 font-medium">
                        {user.premiumExpiryDate ? formatDate(user.premiumExpiryDate) : 'No Expiry'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Referral System Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-100 transform perspective-1000 hover:rotate-y-2 hover:shadow-2xl transition-all duration-300">
                  <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                    <span className="mr-3 text-blue-500">🤝</span>
                    Referral System
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl backdrop-blur-sm hover:bg-blue-50/80 transition-all duration-200">
                      <span className="text-blue-700 font-medium">Your Referral Code</span>
                      <span className="text-blue-900 font-mono bg-blue-100/80 px-3 py-1 rounded-lg font-semibold">
                        {user.referralCode || 'Not Set'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl backdrop-blur-sm hover:bg-blue-50/80 transition-all duration-200">
                      <span className="text-blue-700 font-medium">Referred By</span>
                      <span className="text-blue-900 font-medium">
                        {user.referredBy || 'No Referrer'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl backdrop-blur-sm hover:bg-blue-50/80 transition-all duration-200">
                      <span className="text-blue-700 font-medium">Total Referrals</span>
                      <span className="text-blue-600 font-bold text-2xl">{user.referralCount}</span>
                    </div>
                  </div>
                </div>

                {/* Points & Rewards Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-100 transform perspective-1000 hover:rotate-y-2 hover:shadow-2xl transition-all duration-300">
                  <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                    <span className="mr-3 text-blue-500">🏆</span>
                    Points & Rewards
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-xl backdrop-blur-sm hover:bg-blue-50/80 transition-all duration-200">
                      <span className="text-blue-700 font-medium">Contribution Points</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 font-bold text-2xl">{user.contributionPoints}</span>
                        <span className="text-blue-500 text-xl">🏆</span>
                      </div>
                    </div>
                    
                    {/* 3D Visual Points Display */}
                    <div className="mt-6 p-6 bg-gradient-to-r from-blue-50/70 to-blue-100/70 rounded-2xl border border-blue-200 backdrop-blur-sm shadow-inner">
                      <div className="flex items-center justify-between text-sm text-blue-700 mb-3 font-medium">
                        <span>Progress to Next Level</span>
                        <span className="font-bold">{user.contributionPoints} / 100</span>
                      </div>
                      <div className="w-full bg-blue-200/50 rounded-full h-4 overflow-hidden shadow-inner">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 rounded-full shadow-lg transform transition-all duration-700 ease-out hover:shadow-xl"
                          style={{ width: `${Math.min((user.contributionPoints / 100) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-blue-600 mt-2 font-medium">
                        <span>0</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }
        .rotate-x-2 {
          transform: rotateX(2deg);
        }
        .rotate-y-2:hover {
          transform: rotateY(2deg);
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }
        .animate-bounce-slow {
          animation: bounce 4s infinite;
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        .border-3 {
          border-width: 3px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}