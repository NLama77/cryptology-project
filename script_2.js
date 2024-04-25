function cleanString(inputString) {
  // Removes spaces, non-alphabetic characters, and converts to uppercase
  return inputString.replace(/[^a-zA-Z]/g, "").toUpperCase();
}

function calculateDimensions(cipherText, keyword) {
  // Calculates the number of rows and columns based on the keyword
  var numColumns = keyword.length;
  var numRows = Math.ceil(cipherText.length / numColumns);
  return [numRows, numColumns];
}

function trimKeyword(keyword, plaintextLength) {
  if (keyword.length > plaintextLength) {
    return keyword.slice(0, plaintextLength);
  }
  return keyword;
}

function getSortedKeywordIndex(keyword) {
  // Returns the indices of keyword elements in sorted order
  return Array.from(keyword)
    .map((_, index) => index)
    .sort((a, b) => keyword.charCodeAt(a) - keyword.charCodeAt(b));
}
function findDuplicates(keyword) {
  const count = {};
  const duplicates = [];

  // Count occurrences of each element
  keyword.forEach((item) => {
    if (count[item]) {
      count[item]++;
    } else {
      count[item] = 1;
    }
  });

  // Push duplicates into the duplicates array
  for (const key in count) {
    if (count[key] > 1) {
      duplicates.push(key);
    }
  }

  return duplicates;
}

function replaceFirstOccurrence(arr, charToReplace ) {
replacementChar ="#"
  const index = arr.indexOf(charToReplace);
  if (index !== -1) {
    arr[index] = replacementChar;
  }
  return arr;
}

function getColumnsWithLessElements(
  keywordCleaned,
  cipherTextCleaned,
  numColumns,
  numRows
) {
  var desiredLen = numColumns * numRows;
  var columnsWithLessElementsSize = desiredLen - cipherTextCleaned.length;
  var columnsWithLessElements = keywordCleaned.slice(
    -columnsWithLessElementsSize
  );
  var columnsWithLessElementsIndex = [];

  duplicates = findDuplicates(keywordCleaned.split(""));
  sortedKeyword = keywordCleaned.split("").sort();
  duplicates.forEach(item => {
    sortedKeyword = replaceFirstOccurrence(sortedKeyword,item)
  });
  console.log(sortedKeyword)
  for (var i = 0; i < columnsWithLessElements.length; i++) {
    columnsWithLessElementsIndex.push(
      sortedKeyword.indexOf(columnsWithLessElements[i])
    );
  }

  return columnsWithLessElementsIndex;
}

function createMatrix(rows, columns, columnsIndexLessElements) {
  var matrix = [];
  for (var i = 0; i < rows; i++) {
    var row;
    if (i === rows - 1) {
      row = Array.from({ length: columns }, (_, j) =>
        columnsIndexLessElements.includes(j) ? -1 : 0
      );
    } else {
      row = Array.from({ length: columns }, () => 0);
    }
    matrix.push(row);
  }
  return matrix;
}

function fillMatrixColumnWise(matrix, string, rows, columns) {
  var matrixSize = rows * columns;

  if (matrixSize > string.length) {
    string += "-".repeat(matrixSize - string.length);
  } else if (matrixSize < string.length) {
    console.log("Error: Matrix size is smaller than the length of the string.");
    return null;
  }

  var stringIndex = 0;

  for (var col = 0; col < columns; col++) {
    for (var row = 0; row < rows; row++) {
      if (matrix[row][col] !== -1) {
        matrix[row][col] = string[stringIndex];
        stringIndex++;
      }
    }
  }

  return matrix;
}
function rearrangeColumns(array2D, order) {
  array2D.unshift(order);

  var sortedIndices = array2D[0]
    .slice(0)
    .sort((a, b) => array2D[0][a] - array2D[0][b]);

  var sortedMatrix = array2D
    .slice(1)
    .map((row) => sortedIndices.map((index) => row[index]));

  return sortedMatrix;
}

function flattenOutput(array2D) {
  var flattenedArray = [];

  // Step 1: Flatten the 2D array, ignoring elements equal to -1
  array2D.forEach((row) => {
    row.forEach((element) => {
      if (element !== -1) {
        flattenedArray.push(element);
      }
    });
  });

  // Step 2: Convert the flattened array to a string
  var arrayToString = flattenedArray.join("");

  // Step 3: Format the output string with spaces every 5 characters
  var formattedOutput = "";
  for (var i = 0; i < arrayToString.length; i += 5) {
    formattedOutput += arrayToString.slice(i, i + 5) + " ";
  }

  return formattedOutput.trim();
}

function createTable(data, headings) {
  const tableContainer = document.getElementById("table-container");

  // Remove previous table if exists
  while (tableContainer.firstChild) {
    tableContainer.removeChild(tableContainer.firstChild);
  }

  const table = document.createElement("table");

  // Create table header
  const headerRow = document.createElement("tr");
  headings.forEach((heading) => {
    const th = document.createElement("th");
    th.textContent = heading;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Iterate over each row of the array
  data.forEach((rowData) => {
    const row = document.createElement("tr");

    // Iterate over each element in the row
    rowData.forEach((cellData) => {
      const cell = document.createElement("td");
      // If cellData is "-1", set the text content to an empty string
      cell.textContent = cellData === -1 ? "" : cellData;
      row.appendChild(cell);
    });

    table.appendChild(row);
  });

  tableContainer.appendChild(table);
}

function decrypt() {
  // Get the keyword and cipher text from the input fields
  var keyword = document.getElementById("keyword").value.trim();
  var cipherText = document.getElementById("cipher-text").value.trim();
  var plainText = document.getElementById("plain-text");

  keyword = cleanString(keyword);
  cipherText = cleanString(cipherText);

  // Trim the keyword if it's longer than the plaintext
  keyword = trimKeyword(keyword, cipherText.length);

  let [numRows, numColumns] = calculateDimensions(cipherText, keyword);

  var sortedKeywordIndex = getSortedKeywordIndex(keyword);

  var columnsIndexLessElements = getColumnsWithLessElements(
    keyword,
    cipherText,
    numColumns,
    numRows
  );

  var matrix = createMatrix(numRows, numColumns, columnsIndexLessElements);

  var matrixFilled = fillMatrixColumnWise(
    matrix,
    cipherText,
    numRows,
    numColumns
  );

  var matrixRearranged = rearrangeColumns(matrixFilled, sortedKeywordIndex);

  createTable(matrixRearranged, keyword.split(""));

  var flatenedArray = flattenOutput(matrixRearranged);
  plainText.value = flatenedArray;
}
