import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit{
  currentYear: number = 0;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
