import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from 'src/app/services/security/security.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-account-menu',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
    @Input() visible: boolean = false;


    constructor(private _securityService: SecurityService) { }


    editProfile() {
        this._securityService.editProfile();
    }


    logout() {
        this._securityService.logout();
    }

    
}
