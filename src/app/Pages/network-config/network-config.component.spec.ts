import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkConfigComponent } from './network-config.component';

describe('NetworkConfigComponent', () => {
  let component: NetworkConfigComponent;
  let fixture: ComponentFixture<NetworkConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
