import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Screen1Component } from './components/screen1/screen1.component';
import { Screen2Component } from './components/screen2/screen2.component';

const routes: Routes = [{
  path : 'screen1',
  component : Screen1Component
},
{
  path : '**',
  component : Screen2Component
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
