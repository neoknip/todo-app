import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoInfoComponent } from './create-todo-info.component';

describe('CreateTodoInfoComponent', () => {
  let component: CreateTodoInfoComponent;
  let fixture: ComponentFixture<CreateTodoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTodoInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTodoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
