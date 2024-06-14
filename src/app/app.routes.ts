import { Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';
import { ViewcategoryComponent } from './pages/admin/viewcategory/viewcategory.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionComponent } from './pages/user/instruction/instruction.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ViewComponent } from './pages/user/view/view.component';
import { Welcome1Component } from './pages/user/welcome1/welcome1.component';
import { adminGuard } from './services/admin.guard';
import { normalGuard } from './services/normal.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
    },
    {
        path: 'signup',
        component: SignupComponent,
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [adminGuard],
        children: [
            {
                path: '',
                component: WelcomeComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'category',
                component: ViewcategoryComponent
            },
            {
                path: 'add_category',
                component: AddCategoryComponent
            },
            {
                path: 'quiz',
                component: ViewQuizComponent
            },
            {
                path: 'add_quiz',
                component: AddQuizComponent
            },
            {
                path: 'quiz/:qid',
                component: UpdateQuizComponent
            },
            {
                path: 'view-question/:qid/:title',
                component: ViewQuizQuestionComponent
            },
            {
                path: 'add-question/:qid/:title',
                component: AddQuestionComponent
            }
        ],
    },
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        canActivate: [normalGuard],
        children: [
            {
                path: 'view/:qid',
                component: ViewComponent

            },
            
            {
                path: 'instruction/:qid',
                component: InstructionComponent,
            },
            {
                path: 'profile1',
                component: ProfileComponent,
            },
            {
                path: 'user-home',
                component: Welcome1Component
            },
            {
                path: ':catId',
                component: LoadQuizComponent
            },
            
        ]
    },
    {
        path: 'start/:qid',
        component: StartComponent,
        canActivate: [normalGuard],
    },
];
