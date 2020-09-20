import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CuentasxpagarComponent } from './cuentasxpagar.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material';



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
import { ClasificacionesComponent } from './clasificaciones/clasificaciones.component';






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
    ClasificacionesComponent,

  ],
  imports: [
      sharedModule,
      CUENTAS_ROUTES,
      MatTabsModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      HttpClientModule,
      MatTreeModule,
      MatIconModule,
      BrowserAnimationsModule,
      MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule
  ],
  exports: [
    UsuariosComponent,
    SolicitudComponent
  ],
  providers: [],
  bootstrap: []
})
export class CuentasxpagarModule {}
