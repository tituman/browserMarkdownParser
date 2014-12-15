// Contributed by peter dot kofler at code minus cop dot org

/**
 * @fileoverview
 * Registers a language handler for (Turbo) Pascal.
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-pascal">(my Pascal code)</pre>
 *
 * @author peter dot kofler at code minus cop dot org
 */

PR.registerLangHandler(
    PR.createSimpleLexer(
        [ // shortcutStylePatterns
          // 'single-line-string'
          [PR.PR_STRING,        /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$))/, null, '\''],
          // Whitespace
          [PR.PR_PLAIN,         /^\s+/, null, ' \r\n\t\xA0']
        ],
        [ // fallthroughStylePatterns
          // A cStyleComments comment (* *) or {}
          [PR.PR_COMMENT,       /^\(\*[\s\S]*?(?:\*\)|$)|^\{[\s\S]*?(?:\}|$)/, null],
          [PR.PR_KEYWORD,       /^(?:AND|ARRAY|ASM|BEGIN|CASE|CDECL|CLASS|CONST|CONSTRUCTOR|DEFAULT|DESTRUCTOR|DIV|DO|DOWNTO|ELSE|END|END.|EXCEPT|EXIT|EXPORTS|EXTERNAL|FAR|FILE|FINALIZATION|FINALLY|FUNCTION|GOTO|IF|IMPLEMENTATION|IN|INDEX|INHERITED|INITIALIZATION|INLINE|INTERFACE|LABEL|LIBRARY|MESSAGE|MOD|NEAR|NIL|NOT|OBJECT|OF|ON|OR|OUT|OVERLOAD|OVERRIDE|PACKED|PASCAL|PRIVATE|PROCEDURE|PROGRAM|PROPERTY|PROTECTED|PUBLIC|PUBLISHED|RAISE|READ|RECORD|REGISTER|REPEAT|RESOURCESTRING|SAFECALL|SET|SHL|SHR|STDCALL|STORED|STRING|THEN|THREADVAR|TO|TRY|TYPE|UNIT|UNTIL|USES|VAR|VIRTUAL|WHILE|WITH|WRITE|XOR|END_IF|END_WHILE|END_CASE|ELSIF|FOR|VAR_IN|VAR_INPUT|VAR_NAM|VAR_IN_OUT|INT|LINT|LWORD|REAL|SINT|STRUCT|E|WORD|CHAR|UINT|SINT|USINT|BYTE|DINT|BOOL)\b/i, null],
          [PR.PR_LITERAL,       /^(?:true|false|self|nil)/i, null],
          [PR.PR_PLAIN,         /^[a-z][a-z0-9]*/i, null],
          // Literals .0, 0, 0.0 0E13
          [PR.PR_LITERAL,       /^(?:\$[a-f0-9]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+\-]?\d+)?)/i,  null, '0123456789'],
          [PR.PR_PUNCTUATION,   /^.[^\s\w\.$@\'\/]*/, null]
        ]),
    ['st']);