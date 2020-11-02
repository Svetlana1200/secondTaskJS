'use strict';
 
/**
 * Телефонная книга
 */
const phoneBook = new Map();


 
/**
 * Вызывайте эту функцию, если есть синтаксическая ошибка в запросе
 * @param {number} lineNumber – номер строки с ошибкой
 * @param {number} charNumber – номер символа, с которого запрос стал ошибочным
 */
function syntaxError(lineNumber, charNumber) {
    throw new Error(`SyntaxError: Unexpected token at ${lineNumber}:${charNumber}`);
}
 
/**
 * Выполнение запроса на языке pbQL
 * @param {string} query
 * @returns {string[]} - строки с результатами запроса
 */
function run(query) {
    let answers = []
    let partsQuery = query.split(";")
    let line = 1;

    for (let q of partsQuery) {
        let oneQuery = q
        let tokens = q.split(" ");
           
        if (tokens[0] == "Создай") {
            createContact(oneQuery, line)
        }
        
        else if (tokens[0] == "Добавь") {
            addNumberAndEmail(oneQuery, line)
        }
        else if (tokens[0] == "Покажи") {
            let ans = showNumbersAndEmails(oneQuery, line);
            if (ans) {
                for (let a of ans) {
                    answers.push(a);
                }
            }
        }
        else if (tokens[0] == "Удали") {
            if (tokens[1] == "контакты,") {
                deleteContactWhere(oneQuery, line)
            }
            else if (tokens[1] == "контакт") {
                deleteContact(oneQuery, line)
            }
            else {
                deleteNumberAndEmail(oneQuery, line)
            }
        }
        
        
        else if (line == partsQuery.length && oneQuery == "") {

        }        

        else {
            syntaxError(line, 1);
        }

        if (line == partsQuery.length && oneQuery != "") {
            syntaxError(line, oneQuery.length + 1);
        }   
        line ++;
    }
    return answers;
}

function createContact(q, line) {
    let tokens = q.split(" ");
    if (tokens[0] != "Создай") {
        syntaxError(line, 1)
    }
    else if (tokens[1] != "контакт") {
        syntaxError(line, 8)
    }
    let name = ""
    if (tokens.length > 2) {
        name = tokens.slice(2).join(' ')
    }

    let ind1 = name.indexOf("Удали");
    let ind2 = name.indexOf("Создай");
    let ind3 = name.indexOf("Добавь");
    let ind4 = name.indexOf("Покажи");
    if (ind1 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind2 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind3 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind4 != -1) {
        syntaxError(line + 1, 1)
    }

    if (!phoneBook.has(name)) {
        phoneBook.set(name, new Map());
        phoneBook.get(name).set("emails", []);
        phoneBook.get(name).set("numbers", [])
    }
}

function deleteContact(q, line) {
    let tokens = q.split(" ");
    if (tokens[0] != "Удали") {
        syntaxError(line, 1)
    }
    else if (tokens[1] != "контакт") {
        syntaxError(line, 7)
    }
    let name = ""
    if (tokens.length > 2) {
        name = tokens.slice(2).join(' ')
    }
    
    let ind1 = name.indexOf("Удали");
    let ind2 = name.indexOf("Создай");
    let ind3 = name.indexOf("Добавь");
    let ind4 = name.indexOf("Покажи");
    if (ind1 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind2 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind3 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind4 != -1) {
        syntaxError(line + 1, 1)
    }
    if (phoneBook.has(name)) {
        phoneBook.delete(name)
    }
}

function addNumberAndEmail(q, line) {
    let tokens = q.split(" ");
    if (tokens[0] != "Добавь") {
        syntaxError(line, 1);
    }
    if (tokens[1] !== 'почту' && tokens[1] !== 'телефон') {
        syntaxError(line, 8);
    }
    let info = check(q, line)
    let numbers = info.numbers
    let emails = info.emails
    let name = info.name

    let sym = info.sym

    let ind1 = name.indexOf("Удали");
    let ind2 = name.indexOf("Создай");
    let ind3 = name.indexOf("Добавь");
    let ind4 = name.indexOf("Покажи");
    if (ind1 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind2 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind3 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind4 != -1) {
        syntaxError(line + 1, 1)
    }

    if (phoneBook.has(name)) {
        for (let n of numbers) {
            if (phoneBook.get(name).get("numbers").indexOf(n) == -1) {
                phoneBook.get(name).get("numbers").push(n);
            }
        }
        for (let e of emails) {
            if (phoneBook.get(name).get("emails").indexOf(e) == -1) {
                phoneBook.get(name).get("emails").push(e);
            }
        }
    }
}

function deleteNumberAndEmail(q, line) { 
    let tokens = q.split(" ");
    if (tokens[0] != "Удали") {
        syntaxError(line, 1);
    }
    if (tokens[1] !== 'почту' && tokens[1] !== 'телефон') {
        syntaxError(line, 7);
    }
    let info = check(q, line)
    let numbers = info.numbers
    let emails = info.emails
    let name = info.name
    let sym = info.sym
    let ind1 = name.indexOf("Удали");
    let ind2 = name.indexOf("Создай");
    let ind3 = name.indexOf("Добавь");
    let ind4 = name.indexOf("Покажи");
    if (ind1 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind2 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind3 != -1) {
        syntaxError(line + 1, 1)
    }
    if (ind4 != -1) {
        syntaxError(line + 1, 1)
    }

    if (phoneBook.has(name)) {
        for (let n of numbers) {
            let ind = phoneBook.get(name).get("numbers").indexOf(n);
            if (ind != -1){
                phoneBook.get(name).get("numbers").splice(ind, 1);
            }
        }
        for (let e of emails) {
            let ind = phoneBook.get(name).get("emails").indexOf(e);
            if (ind != -1){
                phoneBook.get(name).get("emails").splice(ind, 1);
            }
        }
    }
}

function check(q, line) {
    let tokens = q.split(" ");
    let i = 2
    let sym = tokens[0].length + tokens[1].length + 3;

    let numbers = []
    let emails = []

    if (tokens[1] == "телефон") {
        if(!isValidPhoneNumber(tokens[2])) {
            syntaxError(line, sym);
        }
        numbers.push(tokens[2])
    }
    else {
        if(!isValidEmail(tokens[2])) {
            syntaxError(line, sym);
        }
        emails.push(tokens[2])
    }
    sym += tokens[2].length + 1;
    i ++;

    while (true) {
        if (i >= tokens.length) {
            syntaxError(line, sym);
        }
        if (tokens[i] == "для") {
            i ++;
            sym += "для".length + 1;
            break;
        }

        if (tokens[i] != "и") {
            syntaxError(line, sym);
        }
        else {
            i ++;
            sym += "и".length + 1;;
            if (tokens[i] == "телефон") {
                if(i + 1 >= tokens.length || !isValidPhoneNumber(tokens[i + 1])) {
                    syntaxError(line, sym + "телефон".length + 1);
                }
                numbers.push(tokens[i + 1])
            }
            else if (tokens[i] == "почту") {
                if (i + 1 >= tokens.length || !isValidEmail(tokens[i + 1])) {
                    syntaxError(line, sym + "почту".length + 1);
                }
                emails.push(tokens[i + 1])
            }
            else {
                syntaxError(line, sym);
            }
            
            sym += tokens[i].length + tokens[i + 1].length + 2;
            i += 2;
        }
    }
    if (i >= tokens.length || tokens[i] != "контакта") {
        syntaxError(line, sym);
    }
    i ++;
    sym += "контакта".length + 1;
    let name = tokens.slice(i).join(' ')
    
    let info = {"numbers": numbers, "emails": emails, "name": name, "sym": sym}
    return info;
}

function showNumbersAndEmails(q, line){
    let tokens = q.split(" ");
    if (tokens[0] != "Покажи") {
        syntaxError(line, 1);
    }
    if (tokens[1] !== 'имя' && tokens[1] !== 'почты' && tokens[1] !== 'телефоны') {
        syntaxError(line, 8);
    }

    let i = 2
    let sym = tokens[0].length + tokens[1].length + 3;
    let fields = []
    fields.push(tokens[1]);
    
    while (true) {
        if (tokens[i].startsWith("для")) {
            if (tokens[i] != "для"){
                syntaxError(line, sym);
            }
            i ++;
            sym += "для".length + 1;
            break;
        }
        if (tokens[i] != "и") {
            syntaxError(line, sym);
        }
        else {
            i ++;
            sym += 'и'.length + 1;
            if (tokens[i] != "телефоны" && tokens[i] != "почты" && tokens[i] != "имя") {
                syntaxError(line, sym);
            }
            fields.push(tokens[i]);
            sym += tokens[i].length + 1;
            i ++;
        }
    }

    if (tokens[i] != "контактов,") {
        syntaxError(line, sym);
    }
    i ++;
    sym += "контактов,".length;
    if (tokens[i] != "где") {
        syntaxError(line, sym);
    }
    i ++;
    sym += "где".length;
    
    if (tokens[i] != "есть") {
        syntaxError(line, sym);
    }
    i ++
    let query = tokens.slice(i).join(" ")
    if (query != "") {
        let shouldShow = [];
        for (let e of phoneBook.keys()) {
            if (e.indexOf(query) != -1) {
                shouldShow.push(e);
            }
            else {
                let nums = phoneBook.get(e).get("numbers");
                let emails = phoneBook.get(e).get("emails");
                for (let num of nums) {
                    if (num.indexOf(query) != -1) {
                        shouldShow.push(e);
                        break;
                    }
                }
                for (let email of emails) {
                    if (email.indexOf(query) != -1) {
                        shouldShow.push(e);
                        break;
                    }
                }  
            } 
        }
        let ansArray = [];
        for (let e of shouldShow) {
            let ans = "";
            for (let f of fields) {
                if (f === ""){
                    continue;
                }
                if (f == "имя") {
                    ans += e + ";";
                }
                else if (f == "почты") {
                    let emails = phoneBook.get(e).get("emails");
                    for (let email of emails) {
                        ans += email + ",";
                    }
                    if (emails.length != 0) {
                        ans = ans.slice(0, ans.length - 1);
                        ans += ";";
                    }
                }
                else if (f == "телефоны") {
                    let numbers = phoneBook.get(e).get("numbers");
                    for (let number of numbers) {
                        ans += "+7 (" + number.slice(0, 3) + ") "  + number.slice(3, 6) + "-" + number.slice(6, 8) + "-" + number.slice(8) + ",";
                    }
                    if (numbers.length != 0) {
                        ans = ans.slice(0, ans.length - 1);
                        ans += ";";
                    }
                }
            }
            ansArray.push(ans);
        }
        return ansArray;
    }
}

function deleteContactWhere(q, line) {
    let tokens = q.split(" ");
    let i = 0
    let sym = 1;
    if (tokens[i] != "Удали"){
        syntaxError(line, sym)
    }
    i ++;
    sym += "Удали".length + 1;
    if (tokens[i] != "контакты,") {
        syntaxError(line, sym);
    }
    i ++;
    sym += "контакты,".length + 1;
    if (tokens[i] != "где"){
        syntaxError(line, sym)
    }
    i ++;
    sym += "где".length + 1;
    if (tokens[i] != "есть"){
        syntaxError(line, sym)
    }
    i ++;
    sym += "есть".length + 1;
    let query = tokens.slice(i).join(" ")
    if (query.length != 0) {
        let shouldDelete = [];
        for (let e of phoneBook.keys()) {
            if (e.indexOf(query) != -1) {
                shouldDelete.push(e);
            }
            else{
                let nums = phoneBook.get(e).get("numbers");
                let emails = phoneBook.get(e).get("emails");
                for (let num of nums) {
                    if (num.indexOf(query) != -1) {
                        shouldDelete.push(e);
                        break;
                    }
                }
                for (let email of emails) {
                    if (email.indexOf(query) != -1) {
                        shouldDelete.push(e);
                        break;
                    }
                }
            } 
        }
        for (let e of shouldDelete) {
            phoneBook.delete(e);
        }
    }
}

function isValidPhoneNumber(phoneNumber) {
    let phoneRegExp = /^\d{10}$/;
    return phoneRegExp.test(phoneNumber);
}

function isValidEmail(email) {
    let emailRegExp = /[\S]*/;
    return emailRegExp.test(email);
}

module.exports = { phoneBook, run };


console.log(run(
    'Покажи имя для контактов, где есть ий;'
))




console.log(phoneBook)

