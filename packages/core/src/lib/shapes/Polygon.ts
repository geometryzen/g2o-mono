import { Anchor } from "../anchor";
import { Color } from "../effects/ColorProvider";
import { Board } from "../IBoard";
import { Path, PathAttributes } from "../Path";
import { PositionLike, position_from_like } from "../Shape";

export interface PolygonAttributes {
    id?: string;
    opacity?: number;
    fill?: Color,
    fillOpacity?: number,
    stroke?: Color,
    strokeOpacity?: number,
    strokeWidth?: number
}

export class Polygon extends Path implements PolygonAttributes {
    constructor(board: Board, points: PositionLike[] = [], attributes: PolygonAttributes = {}) {

        const vertices = points
            .map((point) => position_from_like(point))
            .map((position, index) => new Anchor(position, index === 0 ? 'M' : 'L'));

        super(board, vertices, true, false, false, path_attributes(attributes));

        this.flagReset(true);
        this.update();
    }
}

function path_attributes(attributes: PolygonAttributes): PathAttributes {
    const retval: PathAttributes = {
        id: attributes.id,
        opacity: attributes.opacity,
        fill: attributes.fill,
        fillOpacity: attributes.fillOpacity,
        stroke: attributes.stroke,
        strokeOpacity: attributes.strokeOpacity,
        strokeWidth: attributes.strokeWidth
    };
    return retval;
}