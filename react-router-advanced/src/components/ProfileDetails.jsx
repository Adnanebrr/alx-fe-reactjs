import React from 'react';

function ProfileDetails() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Details</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <p className="text-gray-900">John Doe</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">john.doe@example.com</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
            <p className="text-gray-900">January 15, 2024</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <p className="text-gray-900">
              React developer passionate about building amazing user experiences with modern web technologies.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <p className="text-gray-900">San Francisco, CA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;