import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private http = inject(HttpClient);
  private username = 'Dvyd2L'; // Reemplaza con tu propio nombre de usuario
  private token = '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'; // Reemplaza con tu propio token
  private apiUrl = 'https://api.github.com';

  public getGists(): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `token ${this.token}`
    );
    return this.http.get<any[]>(`${this.apiUrl}/users/${this.username}/gists`, { headers });
  }
}
