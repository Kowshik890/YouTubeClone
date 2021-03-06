import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-9f7vz7ht.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: 'DXUJfABmQ7dEFFQUtzCrkLI7qcunVlwu',
            scope: 'openid profile offline_access email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            secureRoutes: ['http://localhost:8080'],
            customParamsAuthRequest: {
                audience: 'http://localhost:8080'
            }
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
