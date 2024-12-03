import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPipePipe } from '../custom-pipe.pipe';
import { CustomDirectiveDirective } from '../custom-directive.directive';
import { OnInit } from '@angular/core';
import { CustomServiceService } from '../custom-service.service';

@Component({
  selector: 'app-custom-component',
  standalone: true,
  imports: [CommonModule, CustomPipePipe, CustomDirectiveDirective],
  templateUrl: './custom-component.component.html',
  styleUrls: ['./custom-component.component.scss'],
  providers: [CustomServiceService]
})

export class CustomComponentComponent implements OnInit {
  message: string = '';

  constructor(private customService: CustomServiceService) {}

  ngOnInit(): void {
    this.message = this.customService.getMessage();
  }
}