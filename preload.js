const sqlite3 = require('sqlite3').verbose();

const IDS = [
    "Item1",
    "Item2",
    "Item3",
    "Name2",
    "Name3",
    "Name4",
    "Name5",
    "Name6"
]

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("button-search").addEventListener('click', () => {
        const db = new sqlite3.Database('example.db');

        let rankInput = document.getElementById("Rank")
        let rank = rankInput.value;

        let query = "";
        let queryParams = [];
        for (let id of IDS) {
            let element = document.getElementById(id);
            if (element === null || element === undefined) {
                continue;
            }
            let val = element.value;
            if (val.length > 0) {
                if (query.length > 0) {
                    query = query.concat(" AND ");
                } else {
                    query = query.concat(" WHERE ");
                }
                query = query.concat(id + " = (?)");
                queryParams.push(parseInt(val));
            }
        }

        let tableName = rank + "_Prizes";

        query = "select count(*) from " + tableName + query;

        console.log(query)

        db.each(query, queryParams, (err, row) => {
            console.log(row);
        });
    });
});
