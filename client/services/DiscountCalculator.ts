/* eslint-disable class-methods-use-this */
interface IDiscountStrategy {
    calculateDiscount(price: number): number;
}

export class NoDiscountStrategy implements IDiscountStrategy {
    public calculateDiscount(price: number): number {
        return 0;
    }
}

export class PercentageDiscountStrategy implements IDiscountStrategy {
    private percentage: number;

    constructor(percentage: number) {
        this.percentage = percentage;
    }

    public calculateDiscount(price: number): number {
        return (price * this.percentage) / 100;
    }
}

export class FixedAmountDiscountStrategy implements IDiscountStrategy {
    private amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    public calculateDiscount(price: number): number {
        return Math.min(price, this.amount);
    }
}

export class DiscountCalculator {
    private discountStrategy!: IDiscountStrategy;

    public setDiscountStrategy(strategy: IDiscountStrategy): void {
        this.discountStrategy = strategy;
    }

    public calculateDiscount(price: number): number {
        return this.discountStrategy.calculateDiscount(price);
    }
}
