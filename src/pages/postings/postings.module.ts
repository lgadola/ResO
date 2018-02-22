import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostingsPage } from './postings';

@NgModule({
  declarations: [
    PostingsPage,
  ],
  imports: [
    IonicPageModule.forChild(PostingsPage),
  ],
})
export class PostingsPageModule {}
