class Fibonacci {
    constructor() {}

    calcuateFibonacciValue(number: number): number {
        let s = 0;
        if (number === 0) return s;
        if (number === 1) return (s += 1);
        return this.calcuateFibonacciValue(number - 1) + this.calcuateFibonacciValue(number - 2);
    }
}

export default new Fibonacci();
