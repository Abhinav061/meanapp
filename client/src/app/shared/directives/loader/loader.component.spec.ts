// import { environment } from './../../../../environments/environment';
// import { LoaderComponent } from "./loader.component";
// import { ComponentFixture, async, TestBed } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
// import { RouterTestingModule } from '@angular/router/testing';


// describe('LoaderComponent', () => {
//   let component: LoaderComponent;
//   let fixture: ComponentFixture<LoaderComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ LoaderComponent ],
//       schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
//       imports: [RouterTestingModule,
//         MsAdalAngular6Module.forRoot({
//           tenant: environment.adalConfig.tenant,    
//           clientId: environment.adalConfig.clientId,
//           redirectUri: environment.adalConfig.redirectUri ,
//           cacheLocation: environment.adalConfig.cacheLocation,     
//           endpoints:environment.adalConfig.endpoints
//         }),],
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoaderComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  
//  it('should check the component', () => {
//    component.ngOnChanges();
//  });


// });
