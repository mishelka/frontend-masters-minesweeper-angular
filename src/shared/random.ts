export class Random {
    next(max): number {
        return Math.floor(Math.random()*(max+1));
    }
}