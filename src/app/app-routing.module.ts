import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDataComponent } from './components/user-data/user-data.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'detail/:id', component: UserDataComponent },
    { path: 'create', component: UserDataComponent },
    { path: 'edit/:id', component: UserDataComponent },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}