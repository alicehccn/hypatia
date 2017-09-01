'use strict';

function cleanRow(row) {
  if (row) return row.trim();
  return row;
} 

module.exports = {
  cleanRow,
}