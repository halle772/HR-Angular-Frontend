import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loaderCheck = true;
  
  constructor(private loader: LoaderService) {}

  ngOnInit(): void {
    this.loader.getLoadingCheck().subscribe((check: any) => {
      this.loaderCheck = check;
    })
  }

}
