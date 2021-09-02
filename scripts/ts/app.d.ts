interface IDataPlayer {
    id: number;
    name: string;
    image: string;
}

interface IDataGame {
    id: number;
    players: number[];
    scores: number[];
    extansions: number[];
}

interface IDataExtansion {
    id: number;
    name: string;
}

interface IPlayer extends IDataPlayer {
    avatar: HTMLImageElement;
}
