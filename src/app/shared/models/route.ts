export class Route {
    text: string = "";
    idroute: number = 0;
    idvehicle: number = 0;
    narrowpass: number = 0;
    nodes: Node[] = [];
}

export class Node {
    idnode: number = 0;
    idroute: number = 0;
    position: number = 0;
    latitude: number = 0;
    longitude: number = 0;
}