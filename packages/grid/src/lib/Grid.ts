import { Arrow, Board, G20, Group, Shape, Text } from "g2o";

export interface GridAttributes {
    id?: string
}

export class Grid extends Group {
    readonly xAxis: Arrow;
    readonly yAxis: Arrow;
    readonly xLabel: Text;
    readonly yLabel: Text;
    constructor(board: Board, attributes: GridAttributes = {}) {
        super(board, [], attributes);
        const bbox = board.getBoundingBox();
        const sx = Math.abs(bbox.right - bbox.left);
        const sy = Math.abs(bbox.top - bbox.bottom);
        const dx = sx * 0.05;
        const dy = sy * 0.05;

        const xHead: [x: number, y: number] = [(board.crazy ? bbox.left : bbox.right) - dx, 0];
        const xTail: [x: number, y: number] = [(board.crazy ? bbox.right : bbox.left) + dx, 0];

        const yHead: [x: number, y: number] = [0, (board.goofy ? bbox.bottom : bbox.top) - dy];
        const yTail: [x: number, y: number] = [0, (board.goofy ? bbox.top : bbox.bottom) + dy];

        this.xAxis = new Arrow(board, G20.ex.scale(sx - 2 * dx), {
            position: xTail,
            headLength: 0.025 * sx,
            strokeWidth: 2
        });
        this.add(this.xAxis);

        this.yAxis = new Arrow(board, G20.ey.scale(sy - 2 * dy), {
            position: yTail,
            headLength: 0.025 * sy,
            strokeWidth: 2
        });
        this.add(this.yAxis);

        this.xLabel = new Text(board, "x", {
            position: xHead,
            anchor: 'start',
            baseline: 'middle',
            dx: 16 * 0.6,   // fontSize * ratio of width / height for typical character
        });
        this.add(this.xLabel);
        resize(this.xLabel, board);

        this.yLabel = new Text(board, "y", {
            position: yHead,
            anchor: 'middle',
            baseline: 'middle',
            dy: 16, // fontSize
        });
        this.add(this.yLabel);
        resize(this.yLabel, board);
    }
    override dispose(): void {
        this.xLabel.dispose();
        this.yLabel.dispose();
        this.xAxis.dispose();
        this.yAxis.dispose();
        super.dispose();
    }
    override render(parentElement: HTMLElement | SVGElement, svgElement: SVGElement): void {
        if (this.zzz.elem) {
            // The element has already been defined.
        }
        else {
            super.render(parentElement, svgElement);
        }
    }
}

function resize(shape: Shape, board: Board): void {
    shape.scaleXY.set(1 / board.sx, 1 / board.sy);
}