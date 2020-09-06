import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Usuarios',
      icono: 'mdi mdi-chart-bubble',
      url: '/usuarios'
    },
    {
      titulo: 'Alimentos',
      icono: 'mdi mdi-food-variant',
      url: '/alimento'
    },
    {
      titulo: 'Recetas',
      icono: 'mdi mdi-book',
      url: '/receta'
    },
    {
      titulo: 'Ejercicios',
      icono: 'mdi mdi-swim',
      url: '/ejercicio'
    },
    {
      titulo: 'Pasiente',
      icono: 'mdi mdi-emoticon',
      url: '/pasiente'
    }
  ];
  constructor() { }
}
