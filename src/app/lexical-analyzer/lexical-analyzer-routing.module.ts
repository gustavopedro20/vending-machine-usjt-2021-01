import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LexicalAnalyzerComponent} from './lexical-analyzer.component';

const routes: Routes = [{path: '', component: LexicalAnalyzerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LexicalAnalyzerRoutingModule {
}
