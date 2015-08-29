'use strict';

module.exports = {
  VERSE_END: '>>>',
  VERSE_COMMON_HEADER: /\:\s*$/,
  VERSE_CHORDS_HEADER: /\+\s*$/,
  VERSE_LYRICS_HEADER: /\-\s*$/,
  VERSE_TAB_HEADER: /\*\s*$/,
  ANY_VERSE_HEADER: /\:\s*$|\+\s*$|\-\s*$|\*\s*$/,
  GOTO: /^\-\>/
};
