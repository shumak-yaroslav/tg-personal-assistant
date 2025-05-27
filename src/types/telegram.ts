export interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
  is_premium?: boolean;
  allows_write_to_pm?: boolean;
}

export interface TelegramWebAppInitDataUnsafe {
  user?: TelegramWebAppUser;
  [key: string]: unknown;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: TelegramWebAppInitDataUnsafe;
  ready: () => void;
  expand: () => void;
  close: () => void;
  isExpanded: boolean;
  colorScheme: 'light' | 'dark';
  version: string;
  platform: string;
  mainButton: {
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    enable: () => void;
    disable: () => void;
  };
  onEvent: (eventName: string, callback: (...args: unknown[]) => void) => void;
}
