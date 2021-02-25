import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {
    }
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve) => {
            this.authService.isFirebaseAuthenticated().then((user) => {
                if ((!!user)) {
                    this.router.navigate(['/'], {skipLocationChange: true});
                }
                resolve(!(!!user));
            });
        });
    }
}
