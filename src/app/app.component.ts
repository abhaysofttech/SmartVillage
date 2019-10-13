import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Update Password',
      url: '/list',
      icon: 'open'
    },
    {
      title: 'Share App',
      url: '/list',
      icon: 'share'
    },
    {
      title: 'Rate App',
      url: '/list',
      icon: 'pulse'
    },
    {
      title: 'Contact Us',
      url: '/list',
      icon: 'contact'
    },
    {
      title: 'Logout',
      url: '/list',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
