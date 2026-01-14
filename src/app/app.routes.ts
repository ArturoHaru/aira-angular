import { Routes } from '@angular/router';
import { VadPage } from './vad-page/vad-page';
import { TestTalkbot } from './test-talkbot/test-talkbot';

export const routes: Routes = [
  {
    path: 'vad',
    component: VadPage,
  },
  {
    path: '',
    component: TestTalkbot,
  },
];
