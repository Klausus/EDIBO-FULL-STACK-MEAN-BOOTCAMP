# Crear proyecto angular con Angular CLI
Pasos:

1. Instalar Angular CLI
```
npm i -g @angular/cli@latest
```
1. Crear Carpeta
```
mkdir c:\cursoNG
cd c:\cursoNG
```
1. Crear proyecto

```
ng new proyectoBasico --routing --style=scss
cd proyectoBasico
```
1. Instalar Angular Material  y hammerjs
```
npm i --save @angular/material @angular/cdk hammerjs
```
1. Añadir @angular/Material
```
ng add @angular/material
```
1. Añadir soporte para iconos
```
npm install material-design-icons --save
```
1.  Añadir soporte para animaciones
```
npm install --save @angular/animations
```
## Creación de componentes
1. Módulo del componente de inicio
```
ng g m home --routing
```
1. componente de inicio
```
ng g c home/home 
```
1. Componentes header y footer
```
ng g c header
ng g c footer
```
1. Crear módulo about
```
 ng g m --routing about
 ```
 1. Crear componente about
 ```
 ng g c about/about
 ```
1. Crear componente notFound
 ```
 ng g c notFound
 ```

1. Crear módulo students
```
 ng g m --routing students
 ```
 1. Crear componente listing, detail
 ```
 ng g c students/listing
 ng g c students/student-detail
 ```
 1. Crear módulo Material design
 ```
 ng g m materialDesign
 ```
 1. Crear el servicio para obtener la información de los estudiantes
 ```
 ng g service  services/student
 ```
 1. Crear el bloque auth
 ```
 ng g g auth/auth
 ```
 1. Crear el modelo
 ```
 ng g i models/address
 ng g i models/phone
 ng g i models/email
 ng g i models/todo
 ng g i models/user
 ```
1. Crear el módulo dairy
```
ng g m --routing dairy
```
1. crear los componentes del modulo dairy
```
ng g c dairy/todoListing
ng g c dairy/todoDetail
ng g c dairy/todoCreate
```
1. Crear el módulo viajes
```
ng g m --routing visitedSites
```
1. crear los componentes del modulo visitedSites
```
ng g c visited-sites/sitesListing
ng g c visited-sites/siteDetail
ng g c visited-sites/siteCreate
```
