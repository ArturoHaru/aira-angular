import { Routes } from '@angular/router';
import { VadPage } from './vad-page/vad-page';
import { TestTalkbot } from './components/test-talkbot/test-talkbot';

export const routes: Routes = [
  {
    path: 'vad',
    component: VadPage,
  },
  {
    path: 'talkbot',
    component: TestTalkbot,
  },
];
