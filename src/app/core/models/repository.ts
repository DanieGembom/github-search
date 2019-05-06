export class Repository {
    public constructor(
        public id: number,
        public name: string,
        public owner: { id: number; avatar_url: string }
    ) { }
}