import { Ok, Err, type Result } from '../src/result';
import { Some, None, type Option } from '../src/option';

// shared fixtures used across all bench files
export const ok: Result<number, number> = Ok(1);
export const err: Result<number, number> = Err(1);
export const some: Option<number> = Some(1);
export const none: Option<number> = None();
export const inc = (x: number): number => x + 1;
export const gt0 = (x: number): boolean => x > 0;
