import TicketRepository from "../repositories/tickets.repository";

const ticketRepository = new TicketRepository();

const serviceCreateTicket = async (newTicket) => {
    let newTicket = await ticketRepository.createNewTicket(newTicket);
    return newTicket;
}

const serviceFindTicketById = async (tid) => {
    let existTicket = await ticketRepository.findTicketById(tid);
    return existTicket;
}

export { serviceCreateTicket, serviceFindTicketById }