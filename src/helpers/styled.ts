import { Theme } from '../theme';

export const color = (name: keyof Theme['colors']) => ({ theme }: { theme?: Theme }) => theme!.colors[name];
export const media = (name: keyof Theme['media']) => ({ theme }: { theme?: Theme }) => theme!.media[name];
