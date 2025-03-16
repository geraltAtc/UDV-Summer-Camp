import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedItemsComponent } from './deleted-items.component';

describe('DeletedItemsComponent', () => {
  let component: DeletedItemsComponent;
  let fixture: ComponentFixture<DeletedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
