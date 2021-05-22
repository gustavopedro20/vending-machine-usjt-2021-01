import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LexicalAnalyzerRoutingModule} from './lexical-analyzer-routing.module';
import {SharedModule} from '../shared/shared.module';
import {LexicalAnalyzerComponent} from './lexical-analyzer.component';

@NgModule({
  declarations: [LexicalAnalyzerComponent],
  imports: [
    CommonModule,
    LexicalAnalyzerRoutingModule,
    SharedModule,
  ]
})
export class LexicalAnalyzerModule {
}
