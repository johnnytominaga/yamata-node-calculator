const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const workbook = xlsx.readFile(path.join(__dirname, '../public/yamata-nodes.xlsx'));

console.log('Sheet names:', workbook.SheetNames);

const sheetName = workbook.SheetNames[0]; // Use first sheet
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const jsonData = xlsx.utils.sheet_to_json(worksheet);

console.log('Total rows:', jsonData.length);
console.log('Sample data:', JSON.stringify(jsonData.slice(0, 5), null, 2));

// Write to JSON file
fs.writeFileSync(
  path.join(__dirname, '../lib/data.json'),
  JSON.stringify(jsonData, null, 2)
);

console.log('\nExcel data converted to JSON successfully!');
