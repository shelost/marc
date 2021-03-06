var Airtable = require('airtable');

var base = new Airtable({apiKey: 'keyyvLfhkvUVJ0cIX'}).base('app6y27Paqp7IMxyF');

var Results = []

function fetchProblems2(n){

    res = []

    base('problems2').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: n,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {

            let obj = {
                id: record.get('id'),
                name: record.get('name'),
                problems: record.get('problems'),
                props:
                {
                    num_lines: record.get('nume-lines'),
                    num_colors: record.get('nume-colors'),
                    difficulty: record.get('difficulty'),
                }
            }

            res.push(obj)
        });

        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });

    setTimeout(() => {

        for (let i=0; i<res.length; i++){
            let elem = res[i]
            Results.push(JSON.stringify(elem) + '!')
        }

        localStorage.setItem("Results2", Results)

    }, 500);

    //return array
}

function fetchProblems(n){

    res = []

    base('problems').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: n,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            let obj = {
                id: record.get('id'),
                name: record.get('name'),
                examples:
                [
                    {
                        input: record.get('example-1')[0].url,
                        output: record.get('example-1')[1].url
                    },
                    {
                        input: record.get('example-2')[0].url,
                        output: record.get('example-2')[1].url
                    },
                    {
                        input: record.get('example-3')[0].url,
                        output: record.get('example-3')[1].url
                    }
                ],
                props:
                {
                    num_lines: record.get('nume-lines'),
                    num_colors: record.get('nume-colors'),
                    difficulty: record.get('difficulty'),
                }
            }
            res.push(obj)
        });

        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });

    setTimeout(() => {

        for (let i=0; i<res.length; i++){
            let elem = res[i]
            Results.push(JSON.stringify(elem) + '!')
        }
        localStorage.setItem("Results", Results)

    }, 500);

    //return array
}

function uploadSet(set){

    let MATCH = ""

    // Search for duplicate
    base('problems2').select({
        maxRecords: 1000,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            if (record.get('id') == set.id){
                MATCH = record.get('recordid')
                console.log("MATCH: " + MATCH)
            }
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });

    let problems = "["
    for (let i=0; i<set.problems.length; i++){
        let p = set.problems[i]
        problems += p.toString()
        if (i < set.problems.length-1){
            problems += ","
        }
    }
    problems += "]"

    console.log(problems)
    console.log(JSON.parse(problems))
    problems = JSON.stringify(JSON.parse(problems))
    console.log(problems)

    setTimeout(()=> {
        if (MATCH == ""){
            let obj =
            {
                "fields":
                {
                  "id": set.id,
                  "name": set.name,
                  "problems": problems
                }
            }
            console.log("NEW")
            base('problems2').create([
                obj
              ], function(err, records) {
                if (err) {
                  console.error(err);
                  return;
                }
                records.forEach(function (record) {
                  console.log(record.getId());
                });
            });
        }else{
            let obj =
            {
                "id": MATCH,
                "fields":
                {
                  "id": set.id,
                  "name": set.name,
                  "problems": problems
                }
            }
            console.log("UPDATE")
            base('problems2').update([
               obj
              ], function(err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                records.forEach(function (record) {
                    console.log(record.getId());
                    fetchProblems2(1000)
                    processProblems()
                });
            });
        }
    }, 500)

}

function fetchSVG(n){

    let res = []

    base('svg').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: n,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function(record) {
            let obj = {
                id: record.get('id'),
                name: record.get('name'),
                description: record.get('description'),
                problems: record.get('problems'),
                solutions: [record.get('sol_1'),record.get('sol_2'),record.get('sol_3')],
                tags: record.get('tags'),
                date: record.get('date'),
                notes: record.get('notes'),
                numsols: record.get('num_solutions'),
                notes: record.get('notes'),
                recordid: record.get('recordid'),
            }
            res.push(obj)
        });
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });

    setTimeout(() => {
        let Results = []
        for (let i=0; i<res.length; i++){
            let elem = res[i]
            Results.push(string(elem) + '!')
        }
        localStorage.setItem("svg", Results)
    }, 300);
}

function uploadProblem(set, page){

    let MATCH = ""
    let SOLS = []
    let NUM_SOLS = 0

    // Search for duplicate
    base('svg').select({
        maxRecords: 1000,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log(record.get('id'), set.id)
            if (record.get('id') == set.id){
                MATCH = record.get('recordid')
                SOLS = [record.get('sol_1'), record.get('sol_2'), record.get('sol_3')]
                NUM_SOLS = record.get('num_solutions')
                console.log("MATCH: " + MATCH)
            }
        });
        fetchNextPage();
    }, function done(err) {
        if (err) { console.error(err); return; }
    });

    let problems = "["
    for (let i=0; i<set.problems.length; i++){
        let p = set.problems[i]
        problems += p
        if (i < set.problems.length-1){
            problems += ","
        }
    }
    problems += "]"

    let sols = ['','','']
    for (let i=0; i<set.solutions.length; i++){
        let p = set.solutions[i]
        sols[i] += p
    }

    tags = set.tags

    if (typeof tags != 'string'){
        tags = string(tags)
    }

    setTimeout(() => {
        if (MATCH == "") {
            let obj =
            {
                "fields":
                {
                    "id": set.id,
                    "name": set.name,
                    "description": "",
                    "problems": problems,
                    "sol_1": '[' + sols[0] + ']',
                    "sol_2": '[' + sols[1] + ']',
                    "sol_3": '[' + sols[2] + ']',
                    "tags": tags,
                    "num_solutions": '[0,0,0]',
                    "notes": ""
                }
            }
            console.log("NEW")
            base('svg').create([
                obj
            ], function (err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                records.forEach(function (record) {
                    console.log(record.getId());
                    Message("Submitted!")
                });
            });
        } else {
            if (page == "draw") {
                let num_sols = [0, 0, 0]
                for (let i = 0; i < sols.length; i++) {
                    console.log(i)
                    console.log(sols[i])
                    if (SOLS[i] != undefined && SOLS[i].length > 4 && sols[i].length > 0) {
                        sols[i] = SOLS[i].substring(1, SOLS[i].length - 1) + ',' + sols[i]
                        num_sols[i] = parse(SOLS[i]).length
                    } else if (SOLS[i] != undefined) {
                        num_sols[i] = parse(SOLS[i]).length
                    } else if (sols[i].length > 0) {
                        num_sols[i] += 1
                    }
                    sols[i] = '[' + sols[i] + ']'
                }
            }
            let sol_temp = []
            for (let i = 0; i < sols.length; i++) {
                if (sols[i] == '' || sols[i] == null || sols[i] == 'null') {
                    sol_temp[i] = 0
                } else {
                    sol_temp[i] = parse(sols[i]).length
                }
            }
            num_sols = string(sol_temp)
            let obj =
            {
                "id": MATCH,
                "fields":
                {
                  "id": set.id,
                  "name": set.name,
                  "description": set.description,
                  "problems": problems,
                  "sol_1": sols[0],
                  "sol_2": sols[1],
                  "sol_3": sols[2],
                  "tags": tags,
                  "num_solutions": num_sols,
                  "notes": set.notes
                }
            }
            console.log("UPDATE")
            base('svg').update([
               obj
              ], function(err, records) {
                if (err) {
                    console.error(err);
                    return;
                }
                records.forEach(function (record) {
                    console.log(record.getId());
                    Message("Updated!")
                });
            });
        }
    }, 300)
}
