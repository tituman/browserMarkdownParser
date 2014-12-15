// Copyright (C) 2008 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



/**
 * @fileoverview
 * Registers a language handler for Common Lisp and related languages.
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-lisp">(my lisp code)</pre>
 * The lang-cl class identifies the language as common lisp.
 * This file supports the following language extensions:
 *     lang-cl - Common Lisp
 *     lang-el - Emacs Lisp
 *     lang-lisp - Lisp
 *     lang-scm - Scheme
 *     lang-lsp - FAT 8.3 filename version of lang-lisp.
 *
 *
 * I used http://www.devincook.com/goldparser/doc/meta-language/grammar-LISP.htm
 * as the basis, but added line comments that start with ; and changed the atom
 * production to disallow unquoted semicolons.
 *
 * "Name"    = 'LISP'
 * "Author"  = 'John McCarthy'
 * "Version" = 'Minimal'
 * "About"   = 'LISP is an abstract language that organizes ALL'
 *           | 'data around "lists".'
 *
 * "Start Symbol" = [s-Expression]
 *
 * {Atom Char}   = {Printable} - {Whitespace} - [()"\'']
 *
 * Atom = ( {Atom Char} | '\'{Printable} )+
 *
 * [s-Expression] ::= [Quote] Atom
 *                  | [Quote] '(' [Series] ')'
 *                  | [Quote] '(' [s-Expression] '.' [s-Expression] ')'
 *
 * [Series] ::= [s-Expression] [Series]
 *            |
 *
 * [Quote]  ::= ''      !Quote = do not evaluate
 *            |
 *
 *
 * I used <a href="http://gigamonkeys.com/book/">Practical Common Lisp</a> as
 * the basis for the reserved word list.
 *
 *
 * @author mikesamuel@gmail.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         ['opn',             /^\(+/, null, '('],
         ['clo',             /^\)+/, null, ')'],
         // A line comment that starts with //
         [PR['PR_COMMENT'],     /^\/[^\r\n]*/, null, '/'],
         // Whitespace
         [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
         // A double quoted, possibly multi-line, string.
         [PR['PR_STRING'],      /^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/, null, '"']
        ],
        [
         [PR['PR_KEYWORD'],     /^(?:ABSTRACT|AND|ANY|ARRAY|AT|BOOL|BRANCH|BYTE|CASE|CHR|CONST|CONSTANT|CONTINUE|DBGUSERINFOLOG|DELETE|DESELECT|DESELECT|DEVICE_HANDLE|DINT|DO|DWORD|ELSE|ELSIF|END_CASE|END_CONSTANT|END_FOR|END_IF|AXISPOS|END_ROUTINE|END_STRUCT|END_TYPE|END_VAR|END_WHILE|ENTER|ERROR|EXIT|EXPORT|FOR|GLOBAL|HIGH|IF|INFO|INHERIT|INIT|INSTANCE_ID|INSTANCE_NAME|INSTANCE_TYPE|INT|INTERRUPT|IS_CHANGED|IS_COMPLETED|IS_FINISHED|IS_INSTANCE|IS_MAPPED|IS_MAPPED|IS_MAPPING_CHANGED|IS_SYSTEMFLOW|IS_USED|LINT|LOCK|LOOP|LOW|LWORD|MAIN_RUN|MAP|MAPTO|MAPX|NAME|NEW|NOT|OF|OPTIONAL|OR|ORD|PARENT|PRINT|PRIO|PRIVATE|RANGE_HANLDE|READONLY|REAL|RELEASE|REPEAT|REPEATE|RESERVE|RETURN|ROUTINE|SELECT|SELECT|SELF|SET_EVENT|SETPC|SINT|START|START|STOP|STR|STRING|STRUCT|SUPER|THEN|THIS|TO|TYPE|UNLOCK|UNTIL|UPDATE|USER|VAR|VAR_IN|VAR_NAME|WAIT|WARNING|WHILE|WORD|XOR|FALSE|TRUE|CARTPOS|RUN|CALL|KILL|END_LOOP|CARTREFSYS|baseRefSys|mode|CARTDIST|DYNAMIC|OVLABS|ACFLANGE|WORKPIECE|TOOL|DIN|AIN|AOUT|DOUT|OFFSETTCP|PALLET|FROMEND)\b/, null],
         [PR['PR_TYPE'],     /^(?:PTP|Lin|Tool|RefSys|WaitTime|WaitIsFinished|WaitJustInTime|Set|OnDistance|OnParameter|OnPlane|OnPosition|Dyn|OvlAbs|Ovl|SplineSeg|Workpiece)\b/, null],
        
         [PR['PR_LITERAL'],
          /^[+\-]?(?:[0#]x[0-9a-f]+|\d+\/\d+|(?:\.\d+|\d+(?:\.\d*)?)(?:[ed][+\-]?\d+)?)/i],
         // A single quote possibly followed by a word that optionally ends with
         // = ! or ?.
         [PR['PR_LITERAL'],
          /^\'(?:-*(?:\w|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?)?/],
         // A word that optionally ends with = ! or ?.
         [PR['PR_PLAIN'],
          /^-*(?:[a-z_]|\\[\x21-\x7e])(?:[\w-]*|\\[\x21-\x7e])[=!?]?/i],
         // A printable non-space non-special character
         [PR['PR_PUNCTUATION'], /^[^\w\t\n\r \xA0()\"\\\';]+/]
        ]),
    ['kairo']);