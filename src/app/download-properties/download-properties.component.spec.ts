import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPropertiesComponent } from './download-properties.component';

describe('DownloadPropertiesComponent', () => {
  let component: DownloadPropertiesComponent;
  let fixture: ComponentFixture<DownloadPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
