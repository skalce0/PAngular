// component
import { Component } from '@angular/core';
import {DataService} from '../config/service';
import {empty, Observable} from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [DataService]
})
export class SearchBarComponent {
  searchTerm: string;
  suggestions: Observable<string[]>;

  constructor(private dataService: DataService) {}

  getSuggestions() {
    this.suggestions = this.dataService.getSuggestions(this.searchTerm);
  }

  selectSuggestion(suggestion: string) {
    this.searchTerm = suggestion;
    this.suggestions = empty();
  }
}
