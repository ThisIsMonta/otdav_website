import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";


export const fadeIn =  trigger('fadeIn', [
    transition(':enter', [
      style({opacity: '0'}),
      animate('0.25s', style({opacity: '1'}))
    ]),
    transition(':leave', [
        style({opacity: '1'}),
        animate('0.25s', style({opacity: '0'}))
    ])
])