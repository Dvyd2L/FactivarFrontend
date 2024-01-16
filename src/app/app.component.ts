import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FacturaAvanzadoComponent } from './components/factura-avanzado/factura-avanzado.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    RouterOutlet,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    FacturaAvanzadoComponent,
    FacturasComponent,
    HomePageComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  title = 'Factivar';

  isHome() {
    return window.location.pathname === '/home';
  }

  isLogin() {
    return window.location.pathname === '/login';
  }

  isRegister() {
    return window.location.pathname === '/register';
  }
}
