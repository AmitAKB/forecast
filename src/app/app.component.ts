import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Forecast';
  public forecast: FormGroup;
  foreCastData = [];
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private weatherService: WeatherService) {
  }
  ngOnInit() {
    this.forecast = this.formBuilder.group({
        city: new FormControl("",[Validators.required]),
    });
  }

  submitCity(value){
    if(this.forecast.valid){
      this.weatherService.getForecast(value.city).subscribe((response:any) => {
        if(response.cod==200){
          this.foreCastData = response.list;
        } else{
          alert("Something went wrong. Please try again");
        }
      });
    }else{
      alert("Please enter valid input");
    }
  }
}

