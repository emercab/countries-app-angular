import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { Country, Languages } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {

  private _idCountry: string = ''
  private _country?: Country
  private _loading: boolean = false

  public nativeName: string = ''
  public languages: string[] = []

  private _routeActivated: ActivatedRoute = inject(ActivatedRoute)
  private _countryService: CountryService = inject(CountryService)
  private _router: Router = inject(Router)

  get country(): Country {
    return this._country!
  }


  get loading(): boolean {
    return this._loading
  }


  ngOnInit(): void {
    this._routeActivated.params.subscribe({
      next: (params) => {
        // Catch the id from the url
        this._idCountry = params['id']
        this._loading = true

        // Call the service to get the country
        this._countryService.searchByCode(this._idCountry).subscribe({
          next: (country) => {
            // Check if the country exists and assign it to the variable
            this._country = country ? country : undefined
            this._loading = false
            this._getLanguages()
            this.nativeName = this._getNativeName()
          },
          error: () => {
            // If the country doesn't exist, redirect to default page
            this._router.navigateByUrl('/countries')
            this._country = undefined
            this._loading = false
            this.nativeName = ''
          }
        })
      }
    })
  }


  _getLanguages(): void {
    const countryLangs: Languages | undefined = this._country?.languages;
    console.log(countryLangs);
    debugger

    if (countryLangs) {
      for (const lang in countryLangs) {
        if (lang) {
          // Get the languages of the country
          const language: string = `${lang}-${countryLangs[lang as keyof Languages]}`
          this.languages.push(language)
        }
      }
    }
    else {
      this.languages = []
    }
  }


  _getNativeName(): string {
    if (this.languages.length > 0) {
      // Get the native language of the country and then get the official name
      const lang: string = this.languages[0].split('-')[0]
      return this._country?.name.nativeName[lang as keyof Languages]?.official ?? ''
    }
    else {
      return 'Not available.'
    }
  }

}
