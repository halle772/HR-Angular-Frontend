import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = "HR App";
  loaderCheck: number = 0;

  constructor(private _loading: LoaderService){}
  
  ngOnInit(): void {
    this._loading.getLoadingCheck().subscribe((check: boolean) => {
      if(check) this.loaderCheck++;
      else if(this.loaderCheck > 0) this.loaderCheck--;
    })
  }

}
