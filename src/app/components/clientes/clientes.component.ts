import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICliente } from 'src/app/interfaces/cliente.interface';
import { ClientesService } from '@app/services/clientes.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule, ConfirmDialogModule, ToastModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
  providers: [ClientesService, ConfirmationService, MessageService],
})
export class ClientesComponent implements OnInit {
  @ViewChild('formulario') formulario!: NgForm;
  email: any;
  visibleError = false;
  mensajeError = '';
  clientes: ICliente[] = [];
  visibleConfirm = false;
  editar = false;
  cliente: ICliente = {
    cif: '',
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
  };

  constructor(
    private clientesService: ClientesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.clientesService.getClientes().subscribe({
      next: (data) => {
        this.visibleError = false;
        this.clientes = data;
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          this.visibleError = true;
          this.mensajeError = err.message;
        }
      },
    });
  }

  guardar() {
    if (this.editar === false) {
      this.clientesService.addCliente(this.cliente).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.formulario.reset();
          this.getClientes();
        },
        error: (err) => {
          console.error({ err });

          if (err instanceof HttpErrorResponse) {
            this.visibleError = true;
            this.mensajeError = err.message;
          }
        },
      });
    } else {
      this.clientesService.updateCliente(this.cliente).subscribe({
        next: (data) => {
          this.visibleError = false;
          this.cancelarEdicion();
          this.formulario.reset();
          this.getClientes();
          this.editar = false;
        },
        error: (err) => {
          console.error({ err });

          if (err instanceof HttpErrorResponse) {
            this.visibleError = true;
            this.mensajeError = err.message;
          }
        },
      });
    }
  }

  edit(cliente: ICliente) {
    this.cliente = { ...cliente };
    this.editar = true;
  }

  cancelarEdicion() {
    this.cliente = {
      cif: '',
      nombre: '',
      direccion: '',
      telefono: '',
      email: '',
      fechaAlta: new Date(),
    };
    this.editar = false;
  }

  confirmDelete(ev: Event, cliente: ICliente) {
    this.confirmationService.confirm({
      target: ev.target as EventTarget,
      message: `¿Eliminar cliente ${cliente.nombre}?`,
      header: '¿Está seguro? Esta acción no se puede deshacer',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'btn btn-danger mx-1 p-button-text',
      // acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass: 'btn btn-primary mx-1 p-button-text',
      // rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
        this.deleteCliente(cliente.cif);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  deleteCliente(cif: string) {
    this.clientesService.deleteCliente(cif).subscribe({
      next: (data) => {
        this.visibleError = false;
        this.formulario.reset({
          cif: '',
          nombre: '',
          direccion: '',
          telefono: '',
          email: '',
          fechaAlta: new Date(),
        });
        this.getClientes();
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          this.visibleError = true;
          this.mensajeError = err.message;
        }
      },
    });
  }
}
