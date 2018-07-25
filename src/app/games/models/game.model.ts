export interface Game {
    id: number;
    date: Date;
}

export interface Games {
    active: Game[],
    finished: Game[]
}