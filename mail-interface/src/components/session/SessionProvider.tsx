'use client';
import React, { useState } from 'react';
import SessionContext from './SessionContext';

export default function SessionProvider({ children, ...props }: any) {
  const [session, setSession] = useState<any>(props.value?.user || {});

  const clearSession = () => {
    setSession({});
  };

  return <SessionContext.Provider value={{ session, setSession, clearSession }}>{children}</SessionContext.Provider>;
}
