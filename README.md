# ReduxAppWithCrud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.12.
> This app will help you to understand the concept of `NgRX`. You will learn how to create and use <ins>'actions', 'selectors', 'reducers' and 'effects'</ins> with <ins>CRUD (Create, Read, Update and Delete)</ins> operation, and also you will learn how to write the unit cases in all aspects in an Angular project.
> 
> Features I have added are:
> 1. Whenever the user performs add or update operation on a row, after 3 minutes the system will notify the user to perform a new operation (update or delete) on the same by changing the background color to red of the row.
> 2. User can sort the timezone of the record
>    * India => Sort by Id (default)
>    * New York => Sort by Date (ASC)
>    * London => Sort by Date (DESC)

## Development server

Run <ins>***`ng serve --o`***</ins> or ***<ins>`npm start`</ins>*** for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Step to run the json-server (task.json will be the file)
0. Read [this article](https://www.tektutorialshub.com/angular/angular-http-post-example/) before further steps 
1. run cd .\src\assets\ 
2. json-server --watch task.json

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run <ins>***`ng test`***</ins> to execute the unit tests via [Karma](https://karma-runner.github.io).

> To see the code-coverage as well. Then run <ins>***`ng test --code-coverage`***</ins>

>To run the particular spec.ts file <ins>***`ng test --include=<path of spec.ts file> --watch --code-coverage`***</ins>

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
