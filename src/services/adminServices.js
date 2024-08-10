import PocketBase from 'pocketbase';

const url = 'https://footy-bet.pockethost.io/';
//const url = 'http://localhost:8090';
const pb = new PocketBase(url);
pb.autoCancellation(false);

export const fetchUnresolvedBets = async () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    const formattedDate = threeHoursAgo.toISOString().slice(0, 19).replace('T', ' ');

    return await pb.collection('bets').getList(1, 50, {
        filter: `commence_time <= "${formattedDate}" && status = "open"`,
        sort: '-commence_time',
        expand: 'userID',
    });
};

export const updateBetStatus = async (betId, status) => {
    const bet = await pb.collection('bets').getOne(betId);
    
    await pb.collection('bets').update(betId, { status });

    if (status === 'won' || status === 'moneyback' || status === 'halfback-halflost' || status === 'halfback-halfwon') {
        await processPayout(bet, status);
    } else {
        status = 'lost';
    }    
};

export const processPayout = async (bet, status) => {
    let payout;
    if (status === 'won') {
        payout = bet.bet_amount * bet.bet_quote;
    } else if (status === 'moneyback') {
        payout = bet.bet_amount;
    } else if (status === 'halfback-halfwon') {
        payout = (bet.bet_amount / 2) + (bet.bet_amount * bet.bet_quote / 2);
    } else if (status === 'halfback-halflost') {
        payout = (bet.bet_amount / 2);
    }

    if (payout) {
        await pb.collection('transactions').create({
            userID: bet.userID,
            amount: payout,
            ta_type: 'gain',
            betID: bet.id,
        });
    }
};