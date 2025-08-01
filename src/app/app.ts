import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  styleUrls: ['../styles/main.scss'],
  templateUrl: './app.html'
})
export class App {
  protected title = 'malecon-magico-veracruz';
}
