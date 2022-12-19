/**
 * The following code is a modified version of Prando from `zeh/prando` on
 * GitHub.
 *
 * Source:
 * https://github.com/zeh/prando/blob/acc2a3c09df12a41b5c82fbf44e49e070e6f60ac/src/Prando.ts
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Zeh Fernando
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const MIN = -2147483648; // Int32 min
const MAX = 2147483647; // Int32 max

const xorshift = (value: number): number => {
	// Xorshift*32
	// Based on George Marsaglia's work: http://www.jstatsoft.org/v08/i14/paper
	value ^= value << 13;
	value ^= value >> 17;
	value ^= value << 5;

	return value;
};

/**
 * Pseudorandom number generator.
 */
export class PRNG {
	private _value: number;

	/**
	 * Generate a new pseudo-random number generator.
	 *
	 * @param seed - A number or string seed that determines which pseudo-random
	 *   number sequence will be created.
	 */
	constructor(seed: number | string) {
		if (typeof seed === "string") {
			let hash = 0;
			if (seed) {
				const l = seed.length;
				for (let i = 0; i < l; i++) {
					hash = (hash << 5) - hash + seed.charCodeAt(i);
					hash |= 0;
					hash = xorshift(hash);
				}
			}

			this._value = hash;
		} else {
			this._value = seed;
		}

		if (this._value === 0) {
			this._value = 1;
		}
	}

	/**
	 * Generates a pseudo-random number.
	 *
	 * @returns The generated pseudo-random number.
	 */
	public next(): number {
		this._value = xorshift(this._value);

		return (this._value - MIN) / (MAX - MIN);
	}
}
