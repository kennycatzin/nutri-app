import { Routes, RouterModule, Router } from '@angular/router';
import { CuentasxpagarComponent } from './cuentasxpagar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { PasienteComponent } from './pasiente/pasiente.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { PerfilComponent } from './pasiente/perfil.component';
import { SesionesComponent } from './pasiente/sesiones/sesiones.component';
import { LoginGuardGuard } from './../services/service.index';
import { RecetasComponent } from './recetas/recetas.component';
const cuentasRoutes: Routes = [
    {
        path: '',
        component: CuentasxpagarComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'solicitudes', component: SolicitudComponent },
            { path: 'alimento', component: AlimentosComponent },
            { path: 'ejercicio', component: EjerciciosComponent },
            { path: 'pasiente', component: PasienteComponent },
            { path: 'receta', component: RecetasComponent },
            { path: 'paciente/perfil/:id', component: PerfilComponent },
            { path: 'paciente/perfil/sesion/:id/:paciente_id', component: SesionesComponent },

            { path: '', redirectTo: '/login', pathMatch: 'full'},

        ]
    },
];

        // canActivate: [ LoginGuardGuard ],
export const CUENTAS_ROUTES = RouterModule.forChild( cuentasRoutes );
