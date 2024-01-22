import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { FacturaAvanzadoComponent } from './pages/factura-avanzado/factura-avanzado.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ListasDeClienteComponent } from './components/listas-de-cliente/listas-de-cliente.component';
import { MessageService } from 'primeng/api';
import { HexagonsComponent } from '@app/components/hexagons/hexagons.component';
import { FooterComponent } from './components/footer/footer.component';

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
    LoginComponent,
    RegisterComponent,
    FacturaAvanzadoComponent,
    HomePageComponent,
    ListasDeClienteComponent,
    HexagonsComponent,
    FooterComponent,
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
