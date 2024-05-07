import { Group } from "../group";
import { TreeView, TreeViewParams } from "./TreeView";
import { SVGViewDOM } from "./SVGViewDOM";
import { View } from "./View";
import { ViewFactory } from "./ViewFactory";

export class SVGViewFactory implements ViewFactory<SVGElement> {
    constructor(readonly params?: TreeViewParams) {

    }
    createView(viewBox: Group, containerId: string): View<SVGElement> {
        const viewDOM = new SVGViewDOM();
        return new TreeView(viewDOM, viewBox, containerId, this.params) as View<SVGElement>;
    }
}