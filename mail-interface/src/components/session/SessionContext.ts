'use client';

import {createContext} from 'react';

const SessionContext = createContext<any>({
  setSession: () => {},
  clearSession: () => {},
  session: {},
});

export default SessionContext;
