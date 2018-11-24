import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {parseCodeFromJson,initiateLineInCode,getAnsArray,initiateArray} from './ParserCodes';
var myTable = document.getElementById('MyTable');
var newRow;
$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        deleteTable();
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        newRow=myTable.insertRow(myTable.rows.length);
        initiateArray();
        initiateLineInCode(1);
        parseCodeFromJson(parsedCode);
        var ParsedProgram=getAnsArray();
        addParsedProgramToTable(ParsedProgram);
    });
});
function addParsedProgramToTable(ParsedProgram) {
    var i=0;
    for (i=0;i<ParsedProgram.length;i++) {
        var Line=[];
        Line[0]=ParsedProgram[i].line; Line[1]=ParsedProgram[i].type;Line[2]= ParsedProgram[i].name;Line[3]=ParsedProgram[i].condition;Line[4]=ParsedProgram[i].value;
        addLineToTable(Line);
        newRow=myTable.insertRow(myTable.rows.length);
    }
}
function addColum(columnNumber,Value)
{
    var newCell  = newRow.insertCell(columnNumber);
    var newText  = document.createTextNode(Value);
    newCell.appendChild(newText);
}
function addLineToTable(line)
{
    let i=0;
    while (i<5)
    {
        addColum(i,line[i]);
        i++;
    }
}
function deleteTable()
{
    var tableRows = myTable.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    for (var x=rowCount-1; x>0; x--) {
        myTable.deleteRow(x);
    }
}