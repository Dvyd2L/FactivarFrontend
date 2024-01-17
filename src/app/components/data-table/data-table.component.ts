import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICliente } from '@app/interfaces/cliente.interface';
import { ClientesService } from '@app/services/clientes.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [FormsModule, TableModule, ToastModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
  providers: [MessageService, ConfirmationService, ClientesService],
})
export class DataTableComponent {
  clientDialog: boolean = false;
  clients!: ICliente[];
  client!: ICliente;
  selectedClients!: ICliente[] | null;
  submitted: boolean = false;
  statuses!: any[];

  constructor(
    private clientesService: ClientesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.clientesService.getClientes().subscribe({
      next: (data) => {
        this.clients = data;
        console.log(data);
      },
      error: (err) => {
        console.error({ err });
      },
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  openNew() {
    this.client = {
      cif: '',
      direccion: '',
      email: '',
      nombre: '',
      telefono: '',
      fechaAlta: '',
    };
    this.submitted = false;
    this.clientDialog = true;
  }

  deleteSelectedClients() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected clients?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clients = this.clients.filter(
          (val) => !this.selectedClients?.includes(val)
        );
        this.selectedClients = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Clients Deleted',
          life: 3000,
        });
      },
    });
  }

  editClient(client: ICliente) {
    this.client = { ...client };
    this.clientDialog = true;
  }

  deleteClient(client: ICliente) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + client.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clients = this.clients.filter((val) => val.cif !== client.cif);
        this.client = {
          cif: '',
          direccion: '',
          email: '',
          nombre: '',
          telefono: '',
          fechaAlta: '',
        };
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Client Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.clientDialog = false;
    this.submitted = false;
  }

  saveClient() {
    this.submitted = true;

    if (this.client.nombre?.trim()) {
      if (this.client.cif) {
        this.clients[this.findIndexById(this.client.cif)] = this.client;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Client Updated',
          life: 3000,
        });
      } else {
        this.client.cif = this.createId();
        // this.client.image = 'client-placeholder.svg';
        this.clients.push(this.client);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Client Created',
          life: 3000,
        });
      }

      this.clients = [...this.clients];
      this.clientDialog = false;
      this.client ={
        cif: '',
        direccion: '',
        email: '',
        nombre: '',
        telefono: '',
        fechaAlta: '',
      };
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].cif === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'none';
    }
  }
}
