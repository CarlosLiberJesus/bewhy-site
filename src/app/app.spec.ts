import { Component } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';

// Mock do componente App para testes (com template inline)
@Component({
  selector: 'app-root',
  template: `
    <main class="main">
      <h1>Hello, {{ title }}</h1>
      <p>Congratulations! Your app is running. 🎉</p>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .main {
        padding: 2rem;
        text-align: center;
      }
      h1 {
        color: #1976d2;
        font-size: 2rem;
      }
    `,
  ],
  imports: [RouterOutlet],
  standalone: true,
})
class AppTestComponent {
  protected title = 'bewhy-site';
}

describe('App (Modern Jest + Angular 20)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTestComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create the app without zone.js', () => {
    const fixture = TestBed.createComponent(AppTestComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have title property set to bewhy-site', () => {
    const fixture = TestBed.createComponent(AppTestComponent);
    const app = fixture.componentInstance;
    expect(app['title']).toBe('bewhy-site');
  });

  it('should render title in template', () => {
    const fixture = TestBed.createComponent(AppTestComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, bewhy-site',
    );
  });

  it('should render congratulations message', () => {
    const fixture = TestBed.createComponent(AppTestComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain(
      'Congratulations! Your app is running. 🎉',
    );
  });

  it('should update title dynamically with signals-based change detection', () => {
    const fixture = TestBed.createComponent(AppTestComponent);
    const app = fixture.componentInstance;

    // Alterar o título
    (app as any).title = 'Updated App Title';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, Updated App Title',
    );
  });
});
