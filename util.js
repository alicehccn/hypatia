'use strict';

function cleanRow(row) {
  if (row) return row.trim();
  return row;
}

function createSlug(name) {
  return name.toLowerCase().replace(/[^0-9a-z]+/gi, '-');
};

module.exports = {
  cleanRow,
  createSlug
}