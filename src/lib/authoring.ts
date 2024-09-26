export interface Part {
	readonly name?: string;
	readonly revisionId?: string;
}

export interface RenderPartRevisionReq {
	readonly part?: Part;
	readonly sceneItemSuppliedId?: string;
}
