import { Divide, Minus, Multiply, Plus, toFrac } from "./frac"
import { Frac, Operation, Operator } from "./type"

export * from "./type"
export * from "./frac"

export function calc(
    operation: Operation,
): { to: Frac, success: boolean } {
    const [x, y] = operation.from
    if (operation.operator === Operator.PLUS)
        return { to: Plus(x, y), success: true }
    if (operation.operator === Operator.MINUS)
        return { to: Minus(x, y), success: true }
    if (operation.operator === Operator.MULTIPLY)
        return { to: Multiply(x, y), success: true }
    if (operation.operator === Operator.DIVIDE) {
        if (y.molecule === 0) return { to: toFrac(0), success: false }
        else return { to: Divide(x, y), success: true }
    }
    return { to: toFrac(0), success: false }
}