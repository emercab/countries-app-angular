import { Component, OnInit, inject } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  private _countriesService = inject(CountryService)

  public countries: Country[] = []
  public loading: boolean = false
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public selectedRegion?: Region

  ngOnInit(): void {
    this.countries = this._countriesService.cacheCountries.byRegion.countries
    this.selectedRegion = this._countriesService.cacheCountries.byRegion.term
  }


  searchByRegion(region: Region): void {
    this.loading = true
    this.selectedRegion = region
    
    this._countriesService.searchByRegion(region)
      .subscribe({
        next: (countries) => {
          this.countries = countries
          this.loading = false
        },
        error: () => this.countries = []
      })
  }

}
