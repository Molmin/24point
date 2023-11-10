import { Frac, Operation, Operator, calc, checkSame, toFrac } from "@24point/utils"

let cache: Record<string, { success: boolean, operation: Operation[] }> = {}
let cacheAll: Record<string, Operation[][]> = {}

function _solve(
    numbers: Frac[], target: Frac,
): { success: boolean, operation: Operation[] } {
    if (numbers.length === 1) return {
        success: checkSame(numbers[0], target),
        operation: [],
    }
    const tar = `${JSON.stringify(numbers)},${target}`
    if (cache[tar]) return cache[tar]
    let calced: Record<string, boolean> = {}
    for (let i = 0; i < numbers.length; i++)
        for (let j = 0; j < numbers.length; j++) {
            if (i === j) continue
            for (let op = 1; op <= 4; op++) {
                if ((op === 1 || op === 3) && i > j) continue
                const operation: Operation = {
                    from: [numbers[i], numbers[j]],
                    operator: op as Operator,
                }
                if (calced[JSON.stringify(operation)]) continue
                calced[JSON.stringify(operation)] = true
                const result = calc(operation)
                if (!result.success) continue
                let newNumbers: Frac[] = []
                for (let k = 0; k < numbers.length; k++)
                    if (k !== i && k !== j) newNumbers.push(numbers[k])
                newNumbers.push(result.to)
                const solution = _solve(newNumbers, target)
                if (solution.success) return cache[tar] = {
                    success: true,
                    operation: [operation].concat(solution.operation),
                }
            }
        }
    return cache[tar] = { success: false, operation: [] }
}

export function solve(
    numbers: number[], target = 24
): { success: boolean, operation: Operation[] } {
    return _solve(numbers.map(number => toFrac(number)), toFrac(target))
}

function _solveAll(
    numbers: Frac[], target: Frac,
): Operation[][] {
    if (numbers.length === 1) {
        if (checkSame(numbers[0], target)) return [[]]
        else return []
    }
    const tar = `${JSON.stringify(numbers)},${target}`
    if (cacheAll[tar]) return cacheAll[tar]
    let solutions: Operation[][] = []
    let calced: Record<string, boolean> = {}
    for (let i = 0; i < numbers.length; i++)
        for (let j = 0; j < numbers.length; j++) {
            if (i === j) continue
            for (let op = 1; op <= 4; op++) {
                if ((op === 1 || op === 3) && i > j) continue
                const operation: Operation = {
                    from: [numbers[i], numbers[j]],
                    operator: op as Operator,
                }
                if (calced[JSON.stringify(operation)]) continue
                calced[JSON.stringify(operation)] = true
                const result = calc(operation)
                if (!result.success) continue
                let newNumbers: Frac[] = []
                for (let k = 0; k < numbers.length; k++)
                    if (k !== i && k !== j) newNumbers.push(numbers[k])
                newNumbers.push(result.to)
                const solution = _solveAll(newNumbers, target)
                solutions = solutions.concat(solution.map(sol => [operation].concat(sol)))
            }
        }
    return cacheAll[tar] = solutions
}

export function solveAll(
    numbers: number[], target = 24
): Operation[][] {
    return _solveAll(numbers.map(number => toFrac(number)), toFrac(target))
}

function _toSolutionString(
    numbers: Frac[], display: string[], operations: Operation[],
): string {
    if (numbers.length === 1) return display[0]
    const operation = operations[0]
    let i = 0, j = 0
    while (!checkSame(operation.from[0], numbers[i])) i++
    while (!checkSame(operation.from[1], numbers[j]) || i === j) j++
    let newNumbers: Frac[] = []
    let newDisplays: string[] = []
    for (let k = 0; k < numbers.length; k++)
        if (k !== i && k !== j) {
            newNumbers.push(numbers[k])
            newDisplays.push(display[k])
        }
    newNumbers.push(calc(operation).to)
    newDisplays.push(`(${display[i]}${"+-*/"[operation.operator - 1]}${display[j]})`)
    let newOperations: Operation[] = []
    for (let k = 1; k < operations.length; k++)
        newOperations.push(operations[k])
    return _toSolutionString(newNumbers, newDisplays, newOperations)
}

export function toSolutionString(
    numbers: number[], operations: Operation[]
): string {
    return _toSolutionString(
        numbers.map(number => toFrac(number)),
        numbers.map(number => `${number}`),
        operations,
    )
}

// const numbers = [7, 6, 8, 10]
// console.log(solveAll(numbers, 24).map(sol => toSolutionString(numbers, sol)))