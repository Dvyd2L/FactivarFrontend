/**
 * Pruebas unitarias para el componente InvoiceTemplateComponent.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTemplateComponent } from './invoice-template.component';

describe('InvoiceTemplateComponent', () => {
  let component: InvoiceTemplateComponent;
  let fixture: ComponentFixture<InvoiceTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifica que el componente se haya creado correctamente.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
