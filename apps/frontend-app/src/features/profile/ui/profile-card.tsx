import React from 'react';

import styles from './profile-card.module.css';
import { User } from '@app/enteties/users';

interface ProfileCardProps {
  user: Omit<User, 'password'>;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className={styles.profileCard}>
      <h2 className={styles.username}>{user.username}</h2>
      <p className={styles.email}>Email: {user.email}</p>
      {user.firstName && (
        <p className={styles.firstName}>First Name: {user.firstName}</p>
      )}
      {user.lastName && (
        <p className={styles.lastName}>Last Name: {user.lastName}</p>
      )}
    </div>
  );
};

export default ProfileCard;
