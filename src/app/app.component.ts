import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <h1>
      <app-header adminName="{{adminName()}}" />
      <div class="body-container"><router-outlet /></div>
    </h1>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular_basics';
  adminName = signal("Umair");
}
