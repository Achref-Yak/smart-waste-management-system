import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navbarData} from "./nav-data";
import {animate, animation, style, transition, trigger} from "@angular/animations";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;

}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut',[
      transition(':enter',[
        style({opacity:0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave',[
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ])
  ]

})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false ;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize',['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768){
      this.collapsed = false ;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav() :void {
      this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});

  }

  constructor() { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

}