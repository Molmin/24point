import { Frac } from "./type"

export function gcd(x: number, y: number): number {
    if (x === 0 || y === 0) return x + y
    return gcd(y, x % y)
}

export function Simplify(x: Frac): Frac {
    if (x.molecule === 0) return { molecule: 0, denominator: 1 }
    let div = gcd(x.molecule, x.denominator)
    return { denominator: x.denominator / div, molecule: x.molecule / div }
}

export function toFrac(x: number): Frac {
    return { molecule: x, denominator: 1 }
}

export function toFracString(n: Frac): string {
    if (n.denominator === 1) return `${n.molecule}`
    else return `${n.molecule}/${n.denominator}`
}

export function checkSame(x: Frac, y: Frac): boolean {
    return x.denominator === y.denominator && x.molecule === y.molecule
}

export function Plus(x: Frac, y: Frac): Frac {
    return Simplify({
        molecule: x.molecule * y.denominator + y.molecule * x.denominator,
        denominator: x.denominator * y.denominator,
    })
}

export function Minus(x: Frac, y: Frac): Frac {
    return Simplify({
        molecule: x.molecule * y.denominator - y.molecule * x.denominator,
        denominator: x.denominator * y.denominator,
    })
}

export function Multiply(x: Frac, y: Frac): Frac {
    return Simplify({
        molecule: x.molecule * y.molecule,
        denominator: x.denominator * y.denominator,
    })
}

export function Divide(x: Frac, y: Frac): Frac {
    if (y.molecule === 0) return x
    return Simplify({
        molecule: x.molecule * y.denominator,
        denominator: x.denominator * y.molecule,
    })
}