export enum Operator {
    PLUS = 1,
    MINUS = 2,
    MULTIPLY = 3,
    DIVIDE = 4,
}

export interface Frac {
    molecule: number
    denominator: number
}

export interface Operation {
    from: [Frac, Frac]
    operator: Operator
}