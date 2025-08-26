import React from 'react';

import ProfileCard from '../../ui/profile-card';
import { profileApi } from '../../api/profile-api';

export const Profile: React.FC = () => {
  const { data: profile, isLoading, error } = profileApi.useGetProfileQuery(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !profile) {
    return <p>Error loading profile.</p>;
  }

  return <ProfileCard user={profile} />;
};
