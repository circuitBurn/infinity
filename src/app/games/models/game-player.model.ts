export enum GamePlayerStatus {
    INVITED = "invited",
    PLAYING = "playing",
    COMPLETE = "complete"
}

export interface GamePlayer {
    id: number;
    game_id: number;
    user_id: number;
    status: GamePlayerStatus;

}