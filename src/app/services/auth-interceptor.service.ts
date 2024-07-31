// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { catchError, Observable, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptorService implements HttpInterceptor {

//   constructor(private router: Router) { }
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     debugger;
//     const token = localStorage.getItem('token');
//     console.log('token:', token)
//     if (token) {
//       request = request.clone({
//         setHeaders: { Authorization: `Token ${token}` }
//       });
//     }

//     return next.handle(request).pipe(catchError((err) => {
//       if (err instanceof HttpErrorResponse) {
//         if (err.status === 401) {
//           this.router.navigateByUrl('/login');
//         }
//       }
//       return throwError(() => err);
//     }));

//   }
// }

  // constructor(private router: Router) { }

  // intercept(request: HttpRequest<any>, next: HttpHandler):
  //   Observable<HttpEvent<any>> {
  //     debugger;
  //     const token = localStorage.getItem('token');

  //     if (token) {
  //       request = request.clone({
  //         setHeaders: {Authorization: `Authorization token ${token}`}
  //       })
  //     }
  //   // pipe: Extra Funktion, die ausgeführt wird, sobald der Request fertig ist und uns unsere Antwort sendet
  //   return next.handle(request).pipe(
  //     catchError( (err) => {
  //       if (err instanceof HttpErrorResponse) {
  //         if(err.status === 401) {
  //           // redirect user to the logout page
  //           this.router.navigateByUrl('/login');
  //         }
  //       }
  //       return throwError( () => err)
  //     })
  //   );
  // }

