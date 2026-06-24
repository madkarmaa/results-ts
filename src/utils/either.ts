export type Left<L> = { readonly _tag: 'Left'; readonly left: L };
export type Right<R> = { readonly _tag: 'Right'; readonly right: R };
export type Either<L, R> = Left<L> | Right<R>;

export function Left<L>(value: L): Left<L> {
    return { _tag: 'Left', left: value };
}

export function Right<R>(value: R): Right<R> {
    return { _tag: 'Right', right: value };
}

export function isLeft<L, R>(either: Either<L, R>) {
    return either._tag === 'Left';
}

export function isRight<L, R>(either: Either<L, R>) {
    return either._tag === 'Right';
}
