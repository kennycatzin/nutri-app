import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CuentasxpagarComponent } from './cuentasxpagar.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { sharedModule } from '../shared/shared.module';
import { CUENTAS_ROUTES } from './cuentasxpagar.routes';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { MatTabsModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PasienteComponent } from './pasiente/pasiente.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { PerfilComponent } from './pasiente/perfil.component';
import { SesionesComponent } from './pasiente/sesiones/sesiones.component';
import { RecetasComponent } from './recetas/recetas.component';






@NgModule({
  declarations: [
    UsuariosComponent,
    CuentasxpagarComponent,
    SolicitudComponent,
    PasienteComponent,
    AlimentosComponent,
    EjerciciosComponent,
    PerfilComponent,
    SesionesComponent,
    RecetasComponent,

  ],
  imports: [
      sharedModule,
      CUENTAS_ROUTES,
      MatTabsModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      HttpClientModule
  ],
  exports: [
    UsuariosComponent,
    SolicitudComponent
  ],
  providers: [],
  bootstrap: []
})
export class CuentasxpagarModule {}
