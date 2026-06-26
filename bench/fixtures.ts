import { Ok, Err, catchUnwind, type Result } from '../src/result';
import { Some, None, type Option } from '../src/option';
import { catchUnwindAsync } from '../src/async-result';

// shared fixtures used across all bench files

export const ok: Result<number, number> = Ok(1);
export const err: Result<number, number> = Err(1);
export const some: Option<number> = Some(1);
export const none: Option<number> = None();

export const gt0 = (x: number) => x > 0;

export const inc = (x: number) => x + 1;
export const safeInc = catchUnwind(inc);

export const thrower = (): number => {
    throw new Error('boom');
};
export const safeThower = catchUnwind(thrower);

export const asyncInc = async (x: number) => x + 1;
export const safeAsyncInc = catchUnwindAsync(asyncInc);

export const asyncReject = async (): Promise<number> => {
    throw new Error('boom');
};
export const safeAsyncReject = catchUnwindAsync(asyncReject);
