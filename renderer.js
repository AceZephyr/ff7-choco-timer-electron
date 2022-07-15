//js has an idiotic definition of the modulus operator where it returns negative results for negative inputs.
function mod(a, b) {
    return (a % b + b) % b;
}

const RANK_MAP = {
    'C': 0,
    'B': 1,
    'A': 2,
    'S': 3
}

const IDS = {
    "item-pool-1": "Item1",
    "item-pool-2": "Item2",
    "item-pool-3": "Item3",
    "choco-name-2": "Name2",
    "choco-name-3": "Name3",
    "choco-name-4": "Name4",
    "choco-name-5": "Name5",
    "choco-name-6": "Name6"
}

class RNG {
    constructor(seed = 0n) {
        this.rngState = BigInt.asUintN(32, seed);
        this.rngIncrs = 0n;
    }

    rng() {
        this.rngIncrs++;
        this.rngState = BigInt.asUintN(32, (0x41C64E6Dn * this.rngState) + 0x3039n);
        return (this.rngState >> 0x10n) & 0x7FFFn;
    }
}

class ChocoboData {
    constructor(items, tileCards, names) {
        this.items = items;
        this.tileCards = tileCards;
        this.names = names;
    }

    namesString() {
        let arr = new Array(this.names.length);
        for (let i = 0; i < this.names.length; i++) {
            arr[i] = CHOCO_NAMES[this.names[i]]
        }
        return arr;
    }

    itemsString() {
        let arr = new Array(this.items.length);
        for (let i = 0; i < this.items.length; i++) {
            arr[i] = ITEM_NAMES[this.items[i]]
        }
        return arr;
    }
}

const CHOCO_NAMES = [
    "SAM", "ELEN", "BLUES", "TOM", "JOHN", "GARY", "MIKE", "SANDY", "JU", "LY", "JOEL", "GREY", "EDWARD", "JAMES",
    "HARVEY", "DAN", "RUDY", "GRAHAM", "FOX", "CLIVE", "SEAN", "YOUNG", "ROBIN", "DARIO", "ARL", "SARA", "MARIE",
    "SAMMY", "LIA", "KNIGHT", "PAULA", "PAU", "LE", "PETER", "AIMEE", "TERRY", "ANDY", "NANCY", "TIM", "ROBER",
    "GEORGE", "JENNY", "RICA", "JULIA"
];

const ITEM_NAMES = [
    "Sprint Shoes", "Counter", "Magic Counter", "Precious Watch", "Cat's Bell", "Enemy Away", "Sneak Attack",
    "Chocobracelet", "Ether", "Elixir", "Hero Drink", "Bolt Plume", "Fire Fang", "Antarctic Wind", "Swift Bolt",
    "Fire Veil", "Ice Crystal", "Megalixir", "Turbo Ether", "Potion", "Phoenix Down", "Hyper", "Tranquilizer",
    "Hi-Potion"
];

const REWARD_TABLES = {
    "C": [ // C
        [0x17n, 0x00, 0x05, 0x01],
        [0x08n, 0x00, 0x14, 0x01],
        [0x15n, 0x00, 0x0A, 0x00],
        [0x16n, 0x00, 0x0A, 0x00],
        [0x14n, 0x00, 0x14, 0x00],
        [0x0Bn, 0x00, 0x05, 0x01],
        [0x0Cn, 0x00, 0x05, 0x00],
        [0x0Dn, 0x00, 0x05, 0x00],
        [0x13n, 0x00, 0x05, 0x01],
        [0x14n, 0x00, 0x14, 0x01],
    ], "B": [ // B
        [0x08n, 0x00, 0x1E, 0x00],
        [0x0An, 0x00, 0x0A, 0x00],
        [0x14n, 0x00, 0x14, 0x00],
        [0x12n, 0x00, 0x05, 0x01],
        [0x08n, 0x00, 0x1E, 0x00],
        [0x17n, 0x00, 0x05, 0x00],
        [0x15n, 0x00, 0x0A, 0x00],
        [0x16n, 0x00, 0x0A, 0x00],
        [0x17n, 0x00, 0x05, 0x00],
        [0x0Bn, 0x00, 0x0A, 0x01],
        [0x0Cn, 0x00, 0x0A, 0x00],
        [0x0Dn, 0x00, 0x0A, 0x00],
        [0x09n, 0x00, 0x0A, 0x01],
        [0x05n, 0x01, 0x05, 0x01],
        [0x17n, 0x00, 0x05, 0x00],
    ], "A": [ // A
        [0x08n, 0x00, 0x14, 0x00],
        [0x0An, 0x00, 0x0A, 0x00],
        [0x0En, 0x01, 0x0A, 0x00],
        [0x0Fn, 0x01, 0x0A, 0x00],
        [0x0Cn, 0x00, 0x0A, 0x00],
        [0x10n, 0x01, 0x0A, 0x00],
        [0x01n, 0x00, 0x0A, 0x01],
        [0x05n, 0x01, 0x05, 0x01],
        [0x0Bn, 0x00, 0x0A, 0x00],
        [0x0Cn, 0x00, 0x0A, 0x00],
        [0x0Dn, 0x00, 0x0A, 0x00],
        [0x09n, 0x00, 0x0A, 0x01],
        [0x17n, 0x00, 0x05, 0x00],
        [0x08n, 0x00, 0x14, 0x00],
        [0x00n, 0x01, 0x07, 0x01],
        [0x09n, 0x00, 0x05, 0x01],
        [0x14n, 0x00, 0x14, 0x00],
        [0x0Cn, 0x00, 0x0A, 0x00],
        [0x04n, 0x01, 0x07, 0x01],
        [0x06n, 0x01, 0x07, 0x01],
    ], "S": [ // S
        [0x12n, 0x01, 0x05, 0x00],
        [0x0An, 0x00, 0x05, 0x00],
        [0x09n, 0x00, 0x05, 0x01],
        [0x01n, 0x00, 0x05, 0x01],
        [0x05n, 0x01, 0x05, 0x01],
        [0x06n, 0x01, 0x05, 0x01],
        [0x0En, 0x01, 0x05, 0x00],
        [0x0Fn, 0x01, 0x05, 0x00],
        [0x0Bn, 0x00, 0x02, 0x00],
        [0x0Fn, 0x01, 0x05, 0x00],
        [0x14n, 0x00, 0x14, 0x00],
        [0x10n, 0x00, 0x05, 0x00],
        [0x11n, 0x01, 0x05, 0x01],
        [0x12n, 0x00, 0x05, 0x00],
        [0x00n, 0x01, 0x05, 0x01],
        [0x0En, 0x00, 0x05, 0x00],
        [0x04n, 0x01, 0x05, 0x01],
        [0x09n, 0x00, 0x05, 0x01],
        [0x07n, 0x01, 0x05, 0x01],
        [0x10n, 0x01, 0x05, 0x00],
        [0x03n, 0x01, 0x05, 0x01],
        [0x02n, 0x01, 0x05, 0x01],
    ]
};

const SOLUTION_STRINGS = {
    0: "Automatic",
    65536: "Manual",
    65552: "M Up",
    65600: "M Down",
    65664: "M Left",
    65568: "M Right",
    65680: "M Up-Left",
    65728: "M Down-Left",
    65584: "M Up-Right",
    65632: "M Down-Right",
    98304: "M Square",
    98320: "M Square Up",
    98368: "M Square Down",
    98432: "M Square Left",
    98336: "M Square Right",
    98448: "M Square Up-Left",
    98496: "M Square Down-Left",
    98352: "M Square Up-Right",
    98400: "M Square Down-Right",
    73728: "M Circle",
    73744: "M Circle Up",
    73792: "M Circle Down",
    73856: "M Circle Left",
    73760: "M Circle Right",
    73872: "M Circle Up-Left",
    73920: "M Circle Down-Left",
    73776: "M Circle Up-Right",
    73824: "M Circle Down-Right",
    68096: "M R1R2",
    68112: "M R1R2 Up",
    68160: "M R1R2 Down",
    68224: "M R1R2 Left",
    68128: "M R1R2 Right",
    68240: "M R1R2 Up-Left",
    68288: "M R1R2 Down-Left",
    68144: "M R1R2 Up-Right",
    68192: "M R1R2 Down-Right"
};

const AUDIO_MAP = {
    "f-clack": $("#audio-f-clack").get()[0],
    "f-click1": $("#audio-f-click1").get()[0],
    "f-ping1": $("#audio-f-ping1").get()[0],
    "f-ping2": $("#audio-f-ping2").get()[0],
    "e-beep": $("#audio-e-beep").get()[0],
    "e-ding": $("#audio-e-ding").get()[0],
    "e-pop": $("#audio-e-pop").get()[0],
    "e-tick": $("#audio-e-tick").get()[0]
}

function framesBetweenTimes(time1, time2) {
    return Math.round(((time1 - time2) * FPS) / 1000);
}

function framesToMilliseconds(frame) {
    return frame * (1000 / FPS);
}

function fetchRaceDataRows(frame, rank = 0) {
    let query = `select * from Prizes
                    where Rank = ${rank}
                    Frame = ${frame}
                    limit 1`
    return window.electronAPI.query(query)
}

function fetchRangePrizes(startFrame, endFrame, rank = 0) {
    let query = `select * from Prizes
                    where Rank = ${rank}
                    and Frame >= ${startFrame}
                    and Frame <= ${endFrame}
                    order by Frame asc`
    console.log(query)
    return window.electronAPI.query(query)
}

function fetchRangeRaces(startFrame, endFrame, rank = 0) {
    let query = `select * from Races
                    where Rank = ${rank}
                    and Frame >= ${startFrame}
                    and Frame <= ${endFrame}
                    order by Frame asc`
    console.log(query)
    return window.electronAPI.query(query)
}

function dbToRaceData(dbRow) {
    return new ChocoboData(
        [dbRow.Item1, dbRow.Item2, dbRow.Item3],
        [dbRow.Card1_1, dbRow.Card1_2, dbRow.Card1_3, dbRow.Card1_4, dbRow.Card1_5,
            dbRow.Card2_1, dbRow.Card2_2, dbRow.Card2_3, dbRow.Card2_4, dbRow.Card2_5,
            dbRow.Card3_1, dbRow.Card3_2, dbRow.Card3_3, dbRow.Card3_4, dbRow.Card3_5],
        [dbRow.Name2, dbRow.Name3, dbRow.Name4, dbRow.Name5, dbRow.Name6]);
}

let ivar;

let WINDOW_MAP = new Map();
let WINDOW_MAP_FRAMES_LIST_SORTED = [];
let WINDOW_MAP_ITEM_FLAGS = 0;
let WINDOW_MAP_FRAME_LIMIT = 0;
let WINDOW_MAP_RANK = null;

let FPS = parseFloat($("#input-fps").val());
let BEEPS = parseInt($("#input-beeps").val());
let TIME_BETWEEN_BEEPS = parseInt($("#input-between-beeps").val());
let CALIBRATION_TIMER = parseInt($("#input-calibration-timer").val());
let FRAME_CALCULATION_SEARCH_WINDOW_SIZE = parseInt($("#input-frame-calculation-search-window-size").val());
let MIN_TIME_BEFORE_WINDOW = parseInt($("#input-next-window-min-time").val())
let WINDOW_SEARCH_MAX_FRAMES = parseInt($("#input-window-search-max-frames").val())
let MIN_WINDOW_SIZE = parseInt($("#input-min-window-size").val())
let BEEP_TIMER_FREQUENCY = parseInt($("#input-beep-timer-frequency").val())

let TIMER_ELEMENT = $("#timer").get()[0];

let power_on_time;
let calibration_race_start_time;
let calibration_race_start_frame;
let next_window_start_frame;
let next_window_length;
let next_window_target_frame;
let next_window_target_time;
let next_window_last_frame;

function redraw() {
    $("#power-on-time").text(power_on_time);
    $("#race-start-time").text(calibration_race_start_time);
    $("#race-start-frame").text(calibration_race_start_frame);
    $("#next-window-start-frame").text(next_window_start_frame);
    $("#next-window-length").text(next_window_length);
    $("#next-window-target-frame").text(next_window_target_frame);
    $("#next-window-target-time").text(next_window_target_time);
    $("#next-window-last-frame").text(next_window_last_frame);
}

function getSelectedRank() {
    return RANK_MAP[$("input[type='radio'][name='rank']:checked").val()];
}


function getSelectedItems() {
    let selectedItems = new Set();
    let selectedItemsCheckboxes = $("#div-input-items>input[type='checkbox']:checked").get();
    for (let i = 0; i < selectedItemsCheckboxes.length; i++) {
        selectedItems.add(parseInt(selectedItemsCheckboxes[i].value));
    }
    return selectedItems;
}

function getSelectedItemFlags() {
    let i = 0;
    for (let item of getSelectedItems()) {
        i |= (1 << item);
    }
    return i;
}

function getUncheckedItems() {
    let uncheckedItems = new Set();
    let uncheckedItemCheckboxes = $("#div-input-items>input[type='checkbox']:not(:checked)").get();
    for (let i = 0; i < uncheckedItemCheckboxes.length; i++) {
        uncheckedItems.add(parseInt(uncheckedItemCheckboxes[i].value));
    }
    return uncheckedItems;
}

function runTimer(start) {
    let d = new Date();
    let audio = AUDIO_MAP[$("#input-beep-noise").val()];
    let ms_between_beeps = TIME_BETWEEN_BEEPS;
    let beep_time = Math.min((BEEPS - 1) * ms_between_beeps, start - d.getTime());
    if (ivar !== undefined && ivar !== null) {
        window.clearInterval(ivar);
    }
    ivar = window.setInterval(function () {
        d = new Date();
        let delta = start - d.getTime();
        let text = "" + delta
        let textA = text.substring(0, text.length - 3);
        let textB = text.substring(text.length - 3, text.length)
        text = "0".substring(0, 1 - textA.length) + textA + "." + "000".substring(0, 3 - textB.length) + textB;
        TIMER_ELEMENT.innerText = "0.000".substring(0, 5 - text.length) + text;
        if (delta <= beep_time) {
            beep_time -= ms_between_beeps;
            audio.play();
        }
        if (delta < 0) {
            TIMER_ELEMENT.innerText = "0.000";
            stopTimer();
        }
    }, BEEP_TIMER_FREQUENCY);
}

function stopTimer() {
    window.clearInterval(ivar);
    TIMER_ELEMENT.innerText = "0.000";
}

function clearFrameData(div = "#div-fwi-1") {
    $(div).html("");
}

function putFramesData(startFrame, endFrame, rank, targetPrizes, div = "#div-fwi-1", closeButton = false) {
    fetchRangePrizes(startFrame, endFrame, rank).then((prizesRows) => {
        fetchRangeRaces(startFrame, endFrame, rank).then((racesRows) => {
            let racesByFrame = new Map();
            for (let i = 0; i < racesRows.length; i++) {
                let raceData = racesRows[i];
                if (!racesByFrame.has(raceData.Frame)) {
                    racesByFrame.set(raceData.Frame, []);
                }
                racesByFrame.get(raceData.Frame).push(raceData)
            }
            for (let i = 0; i < prizesRows.length; i++) {
                let frame = startFrame + i;
                let prizeData = dbToRaceData(prizesRows[i]);

                let solutionsByPrize = new Map();
                for (let raceData of racesByFrame.get(frame)) {
                    let racePrize = prizeData.items[prizeData.tileCards[raceData.Winner - 2]];
                    if (targetPrizes.has(racePrize) && !solutionsByPrize.has(racePrize)) {
                        solutionsByPrize.set(racePrize, raceData);
                    }
                }

                let table = $("<table class='table-race-data'>");
                if (closeButton) {
                    table.append(`<tr><th colspan='5'><button onclick="$(this).parent().parent().parent().remove()">×</button> ${frame} [${rank}]</th></tr>`);
                } else {
                    table.append(`<tr><th colspan='5'>${frame} [${rank}]</th></tr>`);
                }
                table.append(`<tr><th colspan='5'>Item Pool</th></tr>`);
                for (let j = 0; j < prizeData.items.length; j++) {
                    let item = ITEM_NAMES[prizeData.items[j]];
                    table.append(`<tr><td colspan='5'>${item}</td></tr>`);
                }
                table.append(`<tr><th colspan='5'>Racers</th></tr>`);
                for (let j = 0; j < prizeData.names.length; j++) {
                    let name = CHOCO_NAMES[prizeData.names[j]];
                    table.append(`<tr><td colspan='5'>${name}</td></tr>`);
                }
                table.append(`<tr><th colspan='5'>Tiles</th></tr>`);
                for (let j = 0; j < 3; j++) {
                    let row = $("<tr></tr>");
                    for (let k = 0; k < 5; k++) {
                        let card = prizeData.tileCards[j * 5 + k] + 1;
                        row.append(`<td>${card}</td>`)
                    }
                    table.append(row)
                }
                table.append(`<tr><th colspan="5">Solution</th></tr>`);

                for (let targetPrize of solutionsByPrize.keys()) {
                    let raceSolution = solutionsByPrize.get(targetPrize);
                    table.append(`<tr><td colspan="5">${ITEM_NAMES[targetPrize]}</td></tr>`);
                    table.append(`<tr><td colspan="5">${SOLUTION_STRINGS[raceSolution.Inputs]}</td></tr>`);
                }

                $(div).append(table);
            }
        });
    });
}

function clickPowerOn() {
    let d = new Date();
    power_on_time = d.getTime();
    redraw();
}

function clickStartCalibration() {
    let d = new Date();
    calibration_race_start_time = d.getTime() + CALIBRATION_TIMER;
    redraw();
    runTimer(calibration_race_start_time);
}

function clickCalculateFrame() {
    let itemsStrs = [
        $("#item-pool-1").val(),
        $("#item-pool-2").val(),
        $("#item-pool-3").val()
    ];
    let namesStrs = [
        $("#choco-name-2").val(),
        $("#choco-name-3").val(),
        $("#choco-name-4").val(),
        $("#choco-name-5").val(),
        $("#choco-name-6").val()
    ];
    let items = new Array(3);
    let names = new Array(5);
    for (let i = 0; i < items.length; i++) {
        items[i] = ITEM_NAMES.indexOf(itemsStrs[i]);
    }
    for (let i = 0; i < names.length; i++) {
        names[i] = CHOCO_NAMES.indexOf(namesStrs[i]);
    }
    let rank = getSelectedRank();
    let conditions = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i] !== -1) {
            conditions.push(`Item${i + 1} = ${items[i]}`);
        }
    }
    for (let i = 0; i < names.length; i++) {
        if (names[i] !== -1) {
            conditions.push(`Name${i + 2} = ${names[i]}`);
        }
    }
    let frames_first_estimate = framesBetweenTimes(calibration_race_start_time, power_on_time);
    let query = `select * from Prizes
                    where Rank = ${rank}
                    and ${conditions.join(' and ')}
                    order by Frame asc`;
    window.electronAPI.query(query).then((rows) => {
        if (rows.length === 0) {
            window.electronAPI.error("No matching frame exists. (Check selected rank?)")
            return;
        }
        // sort by number of frames away from estimate, get minimum
        let closestFrame = rows.sort((a, b) => Math.abs(a.Frame - frames_first_estimate) - Math.abs(b.Frame - frames_first_estimate))[0];
        $("#input-calibration-frame").val(closestFrame.Frame);
    });
}

function clickCalibrate() {
    if (power_on_time === undefined || power_on_time === null || calibration_race_start_time === undefined || calibration_race_start_time === null) {
        window.electronAPI.error("Signal a power on time and prepare to calibrate with a race before putting in data.");
        return;
    }
    calibration_race_start_frame = parseInt($("#input-calibration-frame").val());
    power_on_time = calibration_race_start_time - Math.round((1000 / FPS) * calibration_race_start_frame);
    redraw();
}

function clickDisplayFrameData() {
    // let frame = parseInt($("#input-calibration-frame").val());
    // let rank = RANK_MAP[$("input[type='radio'][name='rank']:checked").val()];
    // putFramesData(frame, frame, rank, "#div-fwi-2", true);
}

function clickResetFrameData() {
    clearFrameData("#div-fwi-2");
}

function clearInput() {
    $("#sync-input-table input").val("");
}

function clickClearInput() {
    if (window.confirm("Are you sure you want to clear the table input?")) {
        clearInput();
    }
}

function isWindowMapValid(selItemFlags, rank) {
    return WINDOW_MAP_ITEM_FLAGS === selItemFlags && WINDOW_MAP_RANK === rank;
}

function wipeWindowMap(selItemFlags, rank) {
    WINDOW_MAP.clear();
    WINDOW_MAP_FRAMES_LIST_SORTED = [];
    WINDOW_MAP_ITEM_FLAGS = selItemFlags;
    WINDOW_MAP_RANK = rank;
    WINDOW_MAP_FRAME_LIMIT = 0;
}

function expandWindowMap(selItems, frame, rank, expandByFrames = 30 * 60 * 60, callback = () => undefined) {
    let frameStart;
    if (!isWindowMapValid(selItems, rank)) {
        // current cache map is invalid
        wipeWindowMap(selItems, rank);
        frameStart = frame;
    } else {
        frameStart = WINDOW_MAP_FRAME_LIMIT;
    }
    let frameEnd = frame + expandByFrames;
    let query = `SELECT DISTINCT Races.Frame, Races.Teioh, Races.Winner, Prizes.Item1, Prizes.Item2, Prizes.Item3, Prizes.Card1_1, Prizes.Card1_2, Prizes.Card1_3, Prizes.Card1_4, Prizes.Card1_5 FROM Prizes
        INNER JOIN Races ON (
            Races.Frame = Prizes.Frame AND
            Races.Rank = Prizes.rank
            )
        WHERE Races.Teioh = 0
        and Races.Winner != -1
        and Prizes.Rank = ${rank}
        and Races.Frame >= ${frameStart}
        and Races.Frame < ${frameEnd}
        ORDER BY Prizes.Frame`;
    window.electronAPI.query(query).then((rows) => {
        if (!isWindowMapValid(selItems, rank)) {
            return;
        }
        let winnersByFrame = new Map();
        for (let r of rows) {
            let f = r.Frame;
            if (!winnersByFrame.has(f)) {
                winnersByFrame.set(f, []);
            }
            if (r.Winner !== -1) {
                winnersByFrame.get(f).push(r.Winner);
            }
        }
        let fdata = new Map();
        for (let r of rows) {
            let f = r.Frame;
            if (!fdata.has(f)) {
                let items = [r.Item1, r.Item2, r.Item3];
                let cards = [r.Card1_1, r.Card1_2, r.Card1_3, r.Card1_4, r.Card1_5];
                let winners = winnersByFrame.get(f);
                let itemFlags = 0;
                for (let w of winners) {
                    itemFlags |= (1 << items[cards[w - 2]]);
                }
                if ((itemFlags & WINDOW_MAP_ITEM_FLAGS) !== 0) {
                    fdata.set(f, {
                        "teioh": r.Teioh,
                        "winners": winners,
                        "items": items,
                        "itemFlags": itemFlags,
                        "cards": cards
                    });
                }
            }
        }
        let frames_list = Array.from(fdata.keys());
        frames_list.sort((a, b) => a - b);

        let windowStartFrame = frames_list[0];
        let windowLength = 1;
        let itemFlags = fdata.get(frames_list[0])['itemFlags']
        for (let i = 1; i < frames_list.length; i++) {
            let f = frames_list[i];
            let d = fdata.get(f);
            if (f < WINDOW_MAP_FRAME_LIMIT) {
                continue;
            }
            if (windowStartFrame === f - windowLength) {
                itemFlags |= fdata.get(f)['itemFlags'];
                windowLength++;
            } else {
                if (windowLength > 1) {
                    WINDOW_MAP.set(windowStartFrame, {
                        "rank": rank,
                        "startFrame": windowStartFrame,
                        "winLength": windowLength,
                        "itemFlags": itemFlags
                    });
                    WINDOW_MAP_FRAMES_LIST_SORTED.push(windowStartFrame);
                }
                windowStartFrame = f;
                windowLength = 1;
                itemFlags = fdata.get(f)['itemFlags']
            }
        }
        WINDOW_MAP_FRAMES_LIST_SORTED.sort((a, b) => a - b);
        console.log("Generated more window frames, current size: " + WINDOW_MAP_FRAMES_LIST_SORTED.length)
        callback();
    });
}

function binSearch(arr, x) {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo <= hi) {
        let mid = (lo + hi) >> 1;
        if (arr[mid] === x)
            return mid;
        else if (arr[mid] < x)
            lo = mid + 1;
        else
            hi = mid - 1;
    }
    return lo;
}

async function getNextWindow(startFrame, minWindowSize, selectedItems, rank, currentFrame, remainingTries = 1) {
    let selectedItemFlags = 0;
    for (let s of selectedItems) {
        selectedItemFlags |= (1 << s);
    }
    return new Promise((resolve, reject) => {
        if (!isWindowMapValid(selectedItemFlags, rank)) {
            console.log("Invalid window. Attempting to generate valid window.")
            if (remainingTries > 0) {
                expandWindowMap(selectedItemFlags, currentFrame, rank, 30 * 60 * 60, () => {
                    getNextWindow(startFrame, minWindowSize, selectedItems, rank, currentFrame, remainingTries - 1).then((x) => {
                        resolve(x);
                    });
                });
            } else {
                window.electronAPI.error("No windows.")
                resolve(null);
            }
            return;
        }

        let startIndex = binSearch(WINDOW_MAP_FRAMES_LIST_SORTED, startFrame);

        for (let i = startIndex; i < WINDOW_MAP_FRAMES_LIST_SORTED.length; i++) {
            let frameData = WINDOW_MAP.get(WINDOW_MAP_FRAMES_LIST_SORTED[i]);
            if (frameData.rank === rank
                && frameData.startFrame > startFrame
                && frameData.winLength >= minWindowSize
                && (frameData.itemFlags & selectedItemFlags) !== 0) {
                resolve(WINDOW_MAP_FRAMES_LIST_SORTED[i]);
                return;
            }
        }
        console.log("Couldn't find window. Attempting to generate more windows.")
        if (remainingTries > 0) {
            expandWindowMap(selectedItemFlags, currentFrame, rank, 30 * 60 * 60, () => {
                getNextWindow(startFrame, minWindowSize, selectedItems, rank, currentFrame, remainingTries - 1).then((x) => {
                    resolve(x);
                });
            });
        } else {
            window.electronAPI.error("No windows.")
            resolve(null);
        }
    });
}

function clickLoadNextWindow() {
    if (power_on_time === undefined || power_on_time === null
        || calibration_race_start_time === undefined || calibration_race_start_time === null
        || calibration_race_start_frame === undefined || calibration_race_start_frame === null) {
        window.electronAPI.error("Power on and calibrate first!");
        return;
    }
    let d = new Date();
    let current_frame = framesBetweenTimes(d.getTime(), power_on_time)
    let start_frame = framesBetweenTimes(MIN_TIME_BEFORE_WINDOW + d.getTime(), power_on_time);
    let selectedItems = getSelectedItems();
    if (selectedItems.size === 0) {
        window.electronAPI.error("Select at least one item");
        return;
    }
    let rank = RANK_MAP[$("input[type='radio'][name='rank']:checked").val()];
    getNextWindow(start_frame, MIN_WINDOW_SIZE, selectedItems, rank, current_frame).then((winFrame) => {
        if (winFrame === null) {
            window.electronAPI.error("Could not find window.");
            return;
        }
        let win = WINDOW_MAP.get(winFrame);
        next_window_start_frame = win.startFrame;
        next_window_length = win.winLength;
        next_window_target_frame = next_window_start_frame + Math.floor(next_window_length / 2);
        next_window_target_time = power_on_time + Math.round(framesToMilliseconds(next_window_target_frame));
        next_window_last_frame = next_window_start_frame + next_window_length - 1;
        calibration_race_start_time = next_window_target_time;
        calibration_race_start_frame = "";
        redraw();

        clearFrameData();
        putFramesData(next_window_start_frame, next_window_last_frame, rank, selectedItems);
        runTimer(next_window_target_time);
    });
}

function clickGenerateWindows() {
    if (power_on_time === undefined || power_on_time === null
        || calibration_race_start_time === undefined || calibration_race_start_time === null
        || calibration_race_start_frame === undefined || calibration_race_start_frame === null) {
        window.electronAPI.error("Power on and calibrate first!");
        return;
    }
    let d = new Date();
    let current_frame = framesBetweenTimes(d.getTime(), power_on_time);
    expandWindowMap(getSelectedItemFlags(), current_frame, getSelectedRank())
}

function clickCancelTimer() {
    stopTimer();
}

function changeVolume(volume) {
    let audios = $("audio").get();
    for (let i = 0; i < audios.length; i++) {
        audios[i].volume = volume;
    }
}

function clickOffsetFrames(scale) {
    if (power_on_time === undefined || power_on_time === null) {
        window.electronAPI.error("Must power on first");
        return;
    }
    power_on_time -= scale * framesToMilliseconds(parseInt($("#input-offset-frames").val()));
}

for (let i = 0; i < ITEM_NAMES.length; i++) {
    $("#item-options").append($(`<option value="${ITEM_NAMES[i]}">${ITEM_NAMES[i]}</option>`));
}

for (let i = 0; i < CHOCO_NAMES.length; i++) {
    $("#choco-name-options").append($(`<option value="${CHOCO_NAMES[i]}">${CHOCO_NAMES[i]}</option>`));
}

changeVolume($("#input-beep-volume").val());