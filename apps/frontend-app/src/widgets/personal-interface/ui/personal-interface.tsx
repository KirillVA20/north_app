import clsx from 'clsx';
import styles from './personal-interface.module.css';
import { Button } from '@app/shared/ui/Button';
import { UserCircleIcon } from '@app/shared/assets/icons/user-circle';
import { useState } from 'react';
import { AuthWidget } from '@app/widgets/auth-widget';

export const PersonalInterface = () => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className={clsx(styles.root)}>
      <div>
        <Button
          viewType={!showAuth ? 'blur' : 'primary'}
          size="small"
          className={styles.button}
          onClick={() => setShowAuth(!showAuth)}
        >
          <UserCircleIcon
            width={24}
            height={24}
            stroke={!showAuth ? '#000' : '#fff'}
          />
        </Button>
      </div>
      {showAuth && <AuthWidget />}
    </div>
  );
};
