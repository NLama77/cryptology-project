
function create_plaintext(ciphertext, crib) {
    var plaintext = [];


    for (let i = 0; i < ciphertext.length; i++) {
        if (i < crib.length) {
            plaintext[i] = crib[i];
        } 
        
        else {
            plaintext[i] = "";
        }
    }
    return plaintext;
}


function create_key(ciphertext) {
    var key = [];

    for (let i = 0; i < ciphertext.length; i++) {
        key[i] = "";
    }
    return key;
}
function shift_array_right(array) {

    var length = array.length;
    var new_arr = [];

    for (let i = 0; i < array.length; i++) {
        new_arr[i] = array[i];
    }

    if (array[length - 1] != '') {
        console.log("Cannot shift further right");
        return new_arr;
    }

    new_arr.unshift(new_arr.pop());
    return new_arr;
}

function shift_array_left(array) {

    var new_arr = [];

    for (let i = 0; i < array.length; i++) {
        new_arr[i] = array[i];
    }

    if (array[0] != '') {
        console.log("Cannot shift further left");
        return new_arr;
    }

    new_arr.push(new_arr.shift());
    return new_arr;
}


function compare_array(arr1, arr2) {
    if (arr1.length != arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false;
    }

    return true;
}


function find_crib_placement(plaintext, crib, crib_index) {
    var crib_indexes = []
    var j = 0;

    for (let i = crib_index; i < plaintext.length; i++) {
        if (j < crib.length) {
            crib_indexes.push(i);
            j++;
        }
    }

    return crib_indexes;
}


function fill_key(plaintext, ciphertext, key) {
    
    var plaintext_replacement = to_uppercase(plaintext);

    for (let i = 0; i < ciphertext.length; i++) {
        var current_ciphertext_letter = ciphertext[i];
        var current_plaintext_letter = plaintext_replacement[i];

        if (current_plaintext_letter != undefined) {
            var letter = get_letter(current_plaintext_letter, current_ciphertext_letter, table);
            key[i] = letter;
        }

        else {
            key[i] = "";
        }
    }
    
    return key;
}

function fill_plaintext(plaintext, ciphertext, key) {

    var key_replacement = to_uppercase(key);

    for (let i = 0; i < ciphertext.length; i++) {
        var current_ciphertext_letter = ciphertext[i];
        var current_key_letter = key_replacement[i];

        if (current_key_letter != undefined) {
            var letter = get_letter(current_key_letter, current_ciphertext_letter, table);
            plaintext[i] = letter;
        }

        else {
            plaintext[i] = "";
        }
    }
    
    return plaintext;
}


function generate_addition_table(alphabet) {

    var addition_table = create_array(alphabet.length, alphabet.length);

    for (let i = 0; i < alphabet.length; i++) {
    
        for (let j = 0; j < alphabet.length; j++) {
            addition_table[i][j] = alphabet[j];
        }

        alphabet.push(alphabet.shift());
    }

    return addition_table;
}


function create_array(length) {
    var arr = new Array(length);
    var i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = create_array.apply(this, args);
    }

    return arr;
}


function num_to_letter(num) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return alphabet[num];
}

function letter_to_num(letter) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    for (let i = 0; i < alphabet.length; i++) {
        if (letter == alphabet[i]) {
            return i;
        }
    }
}


function get_letter(plaintext_letter, ciphertext_letter, table) {

    for (let row = 0; row < table.length; row++) {

        var row_letter = num_to_letter(row);
        if (row_letter == plaintext_letter) {
            
            for (let col = 0; col < table[row].length; col++) {

                var col_letter = table[row][col];

                if (col_letter == ciphertext_letter) {
                    var key_letter = num_to_letter(col);
                    key_letter = to_lowercase(key_letter);

                    return key_letter;
                }
            }
        }
    }
}


function to_uppercase(arr) {
    var new_arr = []
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            new_arr[i] = arr[i].toString().toUpperCase();
        }
    }

    return new_arr;
}

function to_lowercase(arr) {
    var new_arr = []
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            new_arr[i] = arr[i].toString().toLowerCase();
        }
    }

    return new_arr;
}

var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var table = generate_addition_table(alphabet, alphabet);













