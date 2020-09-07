class Order {
    constructor(id,items,totalAmount,date){
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get readableDate() {
        return this.date.toLocaleString('en-EN', {
            year: 'numeric',
            month:'long',
            day:'numeric',
            hour:'digit',
            minute:'digit'
        });
    }

}

export default Order;