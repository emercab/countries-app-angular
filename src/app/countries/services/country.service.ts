import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';
import { CacheCountries } from '../interfaces/cache-countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _http: HttpClient = inject(HttpClient)
  private _url: string = 'https://restcountries.com/v3.1'

  public cacheCountries: CacheCountries = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { countries: [] },
  }

  constructor() {
    this._getFromLocalStorage()
  }


  private _saveInLocalStorage(): void {
    localStorage.setItem('cacheCountries', JSON.stringify(this.cacheCountries))
  }


  private _getFromLocalStorage(): void {
    if (localStorage.getItem('cacheCountries')) {
      this.cacheCountries = JSON.parse(localStorage.getItem('cacheCountries')!)
    }
  }
  
  
  private _getCountriesRequest(url: string): Observable<Country[]> {
    return this._http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      )
  }


  searchByCode(code: string): Observable<Country | null> {
    return this._http.get<Country[]>(`${this._url}/alpha/${code}`)
      .pipe(
        map((countries) => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null)),
      )
  }


  searchByCapital(capital: string): Observable<Country[]> {
    const url = `${this._url}/capital/${capital}`
    return this._getCountriesRequest(url)
      .pipe(
        tap((countries) => {
          this.cacheCountries.byCapital = { term: capital, countries }
        }),
        tap(() => this._saveInLocalStorage()),
      )
  }


  searchByCountry(country: string): Observable<Country[]> {
    const url = `${this._url}/name/${country}`
    return this._getCountriesRequest(url)
      .pipe(
        tap((countries) => {
          this.cacheCountries.byCountry = { term: country, countries }
        }),
        tap(() => this._saveInLocalStorage()),
      )
  }


  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${this._url}/region/${region}`
    return this._getCountriesRequest(url)
      .pipe(
        tap((countries) => {
          this.cacheCountries.byRegion = { term: region, countries }
        }),
        tap(() => this._saveInLocalStorage()),
      )
  }
}