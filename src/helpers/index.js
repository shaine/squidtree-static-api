const moment = require('moment');

exports.sortByCreatedAt = (list) => list.slice().sort((a, b) => {
    const aTime = moment(a.created_at);
    const bTime = moment(b.created_at);

    if (aTime === bTime) return 0;

    return aTime > bTime ? 1 : -1;
});
