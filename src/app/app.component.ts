import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FacturaAvanzadoComponent } from './components/factura-avanzado/factura-avanzado.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { HomePageComponent } from './components/home-page2/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ListasDeClienteComponent } from './components/listas-de-cliente/listas-de-cliente.component';
import { MessageService } from 'primeng/api';
import { HexagonsComponent } from '@app/components/hexagons/hexagons.component';
import { Footer2Component } from './components/footer2/footer2.component';

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
    ListasDeClienteComponent,
    HexagonsComponent,
    Footer2Component,
  ],
  providers: [MessageService],
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
