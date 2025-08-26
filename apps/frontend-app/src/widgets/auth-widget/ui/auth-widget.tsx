import { useEffect, useState } from 'react';
import styles from './auth-widget.module.css';
import clsx from 'clsx';
import { LoginForm } from '@app/features/auth/compose/login-form/login-form';
import { RegistrationForm } from '@app/features/auth/compose/registration-form/registration-form';
import { Button } from '@app/shared/ui/Button';
import { useSession } from '@app/enteties/session';
import { Profile } from '@app/features/profile';

export const AuthWidget = () => {
  const { currentSession, loadSession } = useSession();

  const [isLogin, setIsLogin] = useState(true); // true = вход, false = регистрация

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  if (currentSession.token) {
    return <Profile />;
  }
  return (
    <div className={styles.widget}>
      <div className={styles.tabs}>
        <Button
          viewType={isLogin ? 'primary' : 'outline'}
          size="small"
          className={clsx(styles.tab)}
          onClick={() => setIsLogin(true)}
        >
          Вход
        </Button>
        <Button
          viewType={!isLogin ? 'primary' : 'outline'}
          size="small"
          className={clsx(styles.tab)}
          onClick={() => setIsLogin(false)}
        >
          Регистрация
        </Button>
      </div>

      <div className={styles.content}>
        {isLogin ? <LoginForm /> : <RegistrationForm />}
      </div>
    </div>
  );
};
