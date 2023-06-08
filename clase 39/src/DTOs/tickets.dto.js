class TicketDTO {
    constructor(code, purchase_dateTime, amount, purcharser) {
        this.code = code;
        this.purchase_dateTime = purchase_dateTime;
        this.amount = amount;
        this.purcharser = purcharser;
    }
}

export default TicketDTO