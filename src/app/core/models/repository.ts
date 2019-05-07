export class Repository {
    public constructor(
        public id: number,
        public name: string,
        public owner: Owner
    ) { }
}

export class Owner {
    public constructor(
        public id: number,
        public avatar_url: string
    ) { }
}