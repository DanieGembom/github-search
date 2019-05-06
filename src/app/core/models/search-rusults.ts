import { Repository } from './repository';

export class SearchResults {
    constructor(
        public total_count: number,
        public incomplete_results: boolean,
        public items: Repository[]
    ) { }
}