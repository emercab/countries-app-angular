import { Component, OnInit, inject } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  private _countriesService = inject(CountryService)

  public countries: Country[] = []
  public initValue: string = ''
  public loading: boolean = false

  ngOnInit(): void {
    this.countries = this._countriesService.cacheCountries.byCountry.countries
    this.initValue = this._countriesService.cacheCountries.byCountry.term
  }


  searchByCountry(country: string): void {
    this.loading = true
    this._countriesService.searchByCountry(country)
      .subscribe({
        next: (countries) => {
          this.countries = countries
          this.initValue = country
          this.loading = false
        },
        error: () => this.countries = []
      })
  }

}
