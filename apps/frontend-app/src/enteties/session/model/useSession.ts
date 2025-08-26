import { useDispatch, useSelector } from 'react-redux';

import { getSession } from './selectors/get-session/get-session';
import { loadSession, setSessionToken } from './session-slice/session-slice';

export const useSession = () => {
  const dispatch = useDispatch();
  const session = useSelector(getSession);

  return {
    currentSession: session,
    loadSession: () => dispatch(loadSession()),
    setSessionToken: (token: string) => dispatch(setSessionToken(token)),
  };
};
