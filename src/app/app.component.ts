import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/services/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import icDateRange from '@iconify/icons-ic/twotone-date-range';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import { ConfigName } from '../@vex/interfaces/config-name.model';

import baselineApps from '@iconify-icons/ic/baseline-apps';
import developerBoard from '@iconify-icons/mdi/developer-board';
import baselineShowChart from '@iconify-icons/ic/baseline-show-chart';
import baselineDashboard from '@iconify-icons/ic/baseline-dashboard';



@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vex';

  constructor(private configService: ConfigService,
              private styleService: StyleService,
              private renderer: Renderer2,
              private platform: Platform,
              @Inject(DOCUMENT) private document: Document,
              @Inject(LOCALE_ID) private localeId: string,
              private layoutService: LayoutService,
              private route: ActivatedRoute,
              private navigationService: NavigationService,
              private splashScreenService: SplashScreenService) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('rtl')),
      map(queryParamMap => coerceBooleanProperty(queryParamMap.get('rtl'))),
    ).subscribe(isRtl => {
      this.configService.updateConfig({
        rtl: isRtl
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));


    /**
     * Add your own routes here
     */
    this.navigationService.items = [
      {
        type: 'subheading',
        label: 'MENUS DO SISTEMA',
        children: [
          {
            type: 'dropdown',
            label: 'Cadastros',
            icon: baselineApps,
            children: [
              {
                type: 'link',
                label: 'Products',
                route: '/apps/aio-table',
                icon: developerBoard,
              }                           
            ]
          },
          {
            type: 'dropdown',
            label: 'Dashboard',
            icon: baselineShowChart,
            children: [
              {
                type: 'link',
                label: 'Agenda',
                route: '/apps/calendar',
                icon: icDateRange,         
              }, 
              {
                type: 'link',
                label: 'Indicadores',
                route: '/pages/indicadores',
                icon: baselineDashboard,         
              }, 
            ]
          }                                             
        ]
      },      
    ];
  }
}
