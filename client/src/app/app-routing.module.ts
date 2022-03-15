import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

{ path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
{ path: 'tranglivestream', loadChildren: () => import('./pages/tranglivestream/tranglivestream.module').then(m => m.TranglivestreamModule) },
{ path: 'gamegenre', loadChildren: () => import('./pages/gamegenre/gamegenre.module').then(m => m.GamegenreModule)},
{ path: 'createStream', loadChildren: () => import('./pages/create-stream/create-stream.module').then(m => m.CreateStreamModule) },

{ path: 'livstream', loadChildren: () => import('./pages/livstream/livstream.module').then(m => m.LivstreamModule) },];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
