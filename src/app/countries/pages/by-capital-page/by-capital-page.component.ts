import { Component, OnInit, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  private _countriesService = inject(CountryService)
  
  public countries: Country[] = []
  public initialValue: string = ''
  public loading: boolean = false

  ngOnInit(): void {
    this.countries = this._countriesService.cacheCountries.byCapital.countries
    this.initialValue = this._countriesService.cacheCountries.byCapital.term
  }

  searchByCapital(term: string): void {
    this.loading = true
    this._countriesService.searchByCapital(term)
      .subscribe({
        next: (countries) => {
          this.countries = countries
          this.initialValue = term
          this.loading = false
        },
        error: () => this.countries = []
      })
  }

}
