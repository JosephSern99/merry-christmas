import { Countries } from "src/app/core/models/profile/profile.model";
import { environment as env } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    route = env.apiServer + '/api/v1/';

    constructor(
        private http: HttpClient,
    ) { }

    getCountries(): Observable<Countries[]> {
        return this.http.get<Countries[]>(this.route + 'Users/countries')
            .pipe(map((data: any) => data));
    }

}
