import { Component } from '@angular/core';
import { CurrencyapidataService } from './currencyapidata.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Currency Converter';
  currjson: any = [];

  base = 'USD';
  baseEur = 'EUR';
  cont2 = 'USD';
  currN = '1';
  result1: number = 1;
  result2: number = 1;
  resultUsd: number = 1;
  resultEur: number = 1;

  changebase(a: string) {
    this.base = a;
  }

  tocountry(b: string) {
    this.cont2 = b;
  }

  tocurr(c:string){
    this.currN = c;
  }
  constructor(private currency: CurrencyapidataService) {}

  ngOnInit() {
    this.currency.getcurrencydata(this.base).subscribe((data) => {
      this.currjson = JSON.stringify(data);
      this.currjson = JSON.parse(this.currjson);
      this.resultUsd = this.currjson.rates.UAH.toFixed(2);
    });
    this.currency.getcurrencydata(this.baseEur).subscribe((data) => {
      this.currjson = JSON.stringify(data);
      this.currjson = JSON.parse(this.currjson);
      this.resultEur = this.currjson.rates.UAH.toFixed(2);
    });
  }
 
  convert1() {
    this.currency.getcurrencydata(this.base).subscribe((data) => {
      this.currjson = JSON.stringify(data);
      this.currjson = JSON.parse(this.currjson);
      if (this.cont2 == 'USD') {
        this.result1 = (this.currjson.rates.USD * +this.currN);

      }
      if (this.cont2 == 'EUR') {
        this.result1 = this.currjson.rates.EUR * +this.currN;
      }
      if (this.cont2 == 'UAH') {
        this.result1 = this.currjson.rates.UAH * +this.currN;
      }
      this.result1 = +this.result1.toFixed(2)
    });  
  }
  convert2() {
      this.currency.getcurrencydata(this.cont2).subscribe((data) => {
      this.currjson = JSON.stringify(data);
      this.currjson = JSON.parse(this.currjson);
      if (this.base == 'USD') {
        this.result2 = (this.currjson.rates.USD * +this.currN);
      }
      if (this.base == 'EUR') {
        this.result2 = this.currjson.rates.EUR * +this.currN;
      }
      if (this.base == 'UAH') {
        this.result2 = this.currjson.rates.UAH * +this.currN;
      }
      this.result2 = +this.result2.toFixed(2)
    });
   
  }
}
