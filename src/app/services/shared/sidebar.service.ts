import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Clasificaciones',
      icono: 'mdi mdi-chart-bubble',
      url: '/clasificacion'
    },
    {
      titulo: 'Alimentos',
      icono: 'mdi mdi-food-variant',
      url: '/alimento'
    },
    {
      titulo: 'Ejercicios',
      icono: 'mdi mdi-swim',
      url: '/ejercicio'
    },
    {
      titulo: 'Recetas',
      icono: 'mdi mdi-book',
      url: '/receta'
    },
    {
      titulo: 'Pasiente',
      icono: 'mdi mdi-emoticon',
      url: '/pasiente'
    }
  ];
  constructor() { }
}
// {
//   titulo: 'Usuarios',
//   icono: 'mdi mdi-chart-bubble',
//   url: '/usuarios'
// },
