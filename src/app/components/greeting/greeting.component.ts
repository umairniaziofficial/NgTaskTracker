import { Component, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-greeting',
  standalone: true, // Ensure standalone component
  imports: [FormsModule], // Add FormsModule here
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent {
  @Input() adminName = signal("Demo User");
}
