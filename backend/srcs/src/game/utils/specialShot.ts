export class SpecialShot {
    private color: string;
    private isReady: boolean;
    private charge: number;


    constructor(color: string) {
        this.color = color;
        this.isReady = false;
        this.charge = 0;
    }

    incrementCharge() {
        if (this.charge < 3) {
            this.charge++;
        }
        if (this.charge == 3) {
            this.isReady = true;
        }
        console.log("charge", this.charge);
    }

    getIsReady() {
        return this.isReady;
    }

    getColor() {
        return this.color;
    }

    getCharge() {
        return this.charge;
    }

    resetCharge() {
        this.charge = 0;
        this.isReady = false;
    }
}
