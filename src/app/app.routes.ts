import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './erp/cuentasxpagar/usuarios/usuarios.component';
import { ProveedoresComponent } from './erp/cuentasxpagar/proveedores/proveedores.component';
import { CuentasxpagarComponent } from './erp/cuentasxpagar/cuentasxpagar.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegistroComponent } from './login/registro.component';



const APP_ROUTES: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: '**', component: NopagefoundComponent },




];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});






