interface IDataPlayer {
    id: number;
    name: string;
    image: string;
}
interface IPlayer extends IDataPlayer {
    avatar: HTMLImageElement;
}
