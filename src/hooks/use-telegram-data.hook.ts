import { useState, useEffect } from 'react';
import type { TelegramWebAppUser, TelegramWebApp } from '../types/telegram.ts';

interface UseTelegramDataReturnValues {
  user: TelegramWebAppUser | null;
  isLoading: boolean;
}

export const useTelegramData = (): UseTelegramDataReturnValues => {
  const [user, setUser] = useState<TelegramWebAppUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!window.Telegram || !window.Telegram.WebApp) {
      console.error('Telegram Web App API is not available');
      setIsLoading(false);
      return;
    }
    const app = window.Telegram.WebApp;

    app.ready();
    app.expand();

    if (app.initDataUnsafe.user) {
      setUser(app.initDataUnsafe.user);
    }

    setIsLoading(false);
  }, []);

  return { user, isLoading };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    }
  }
}
