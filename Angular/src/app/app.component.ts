import { Component } from '@angular/core';
import {Metamask} from "glitter-bridge-sdk-web-dev";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular';

  constructor() {
    Metamask.connect()
      .then((response: any) => {
        console.log(response);
        Metamask.getProvider()
          .then((provider) => {
            console.log(provider);
          })
      })
  }

}
