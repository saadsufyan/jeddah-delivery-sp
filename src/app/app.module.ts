import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './pages/register/register.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PassCodeComponent } from './pages/forgot-password/pass-code/pass-code.component';
import { ResetPasswordComponent } from './pages/forgot-password/reset-password/reset-password.component';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        PassCodeComponent,
        ResetPasswordComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgxDatatableModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter
            }
        }),
        SidebarModule,
        NavbarModule,
        ToastrModule.forRoot(),
        FooterModule,
        FixedPluginModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [NgbActiveModal],
    bootstrap: [AppComponent]
})
export class AppModule {
}
