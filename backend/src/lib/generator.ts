import { solve, solveAll, toSolutionString } from "./solve"

function _generate(
    maxNumber: number, count: number,
): number[] {
    return new Array(count).fill(0)
        .map(() => Math.floor(Math.random() * maxNumber) + 1)
        .sort((x, y) => x - y)
}

export function generate(
    target = 24, maxNumber = 13, count = 4,
): number[] {
    let problem = _generate(maxNumber, count)
    while (!solve(problem, target).success)
        problem = _generate(maxNumber, count)
    return problem
}

// for (let i = 0; i < 100; i++)
//     console.log(`${i + 1}. ` + generate(42).join(', '))
// const problem = generate(11)
// console.log(problem)
// console.log(solveAll(problem,11).map(sol => toSolutionString(problem, sol)))