import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrettyDurationPipe } from './pretty-duration.pipe';

@NgModule({
  declarations: [PrettyDurationPipe],
  imports: [
    CommonModule
  ],
  exports: [PrettyDurationPipe]
})
export class AppPipesModule { }
