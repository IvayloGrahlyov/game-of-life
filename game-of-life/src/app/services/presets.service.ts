import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PresetsService {
  constructor(private http: HttpClient) {}

  savePreset(data: { name: string; grid: boolean[][] }) {
    return this.http.post('/api/presets', data);
  }

  loadPreset(presetName: string) {
    return this.http.get(`/api/presets/${presetName}`);
  }
}
