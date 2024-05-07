import { Board } from "./Board";
import { GraphicsBoard } from "./GraphicsBoard";
import { HTMLElementDOM } from "./HTMLElementDOM";
import { SVGViewDOM } from "./renderers/SVGViewDOM";
import { SVGViewFactory } from "./renderers/SVGViewFactory";

export interface BoardOptions {
    boundingBox?: { left: number, top: number, right: number, bottom: number };
}

/**
 * A convenience function for initializing a new GraphicsBoard using SVG.
 * @param elementOrId HTML identifier (id) of element in which the board is rendered.
 * @param options An object that sets some of the board properties.
 */
export function initBoard(elementOrId: string | HTMLElement, options: BoardOptions = {}): Board {
    const elementDOM = new HTMLElementDOM();
    const viewDOM = new SVGViewDOM();
    return new GraphicsBoard<HTMLElement, SVGElement>(elementOrId, elementDOM, viewDOM, new SVGViewFactory(), options);
}
