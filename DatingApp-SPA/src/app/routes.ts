import {Routes} from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/_member-detail.resolver';
import { MemberListResolver } from './_resolvers/_member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/_member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent_unsaved_changes.guard';
import { LisstResolver } from './_resolvers/lists.resolver';


export const appRoutes: Routes = [
{ path: '', component: HomeComponent},
{
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
        { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
        { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
        { path: 'member/edit', component: MemberEditComponent,
        resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
        { path: 'lists', component: ListsComponent, resolve: {users : LisstResolver}},
        { path: 'messages', component: MessagesComponent},
    ]
},
{ path: '**', redirectTo: '', pathMatch: 'full' }
];
