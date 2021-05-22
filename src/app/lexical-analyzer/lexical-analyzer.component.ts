import {Component} from '@angular/core';

type Token = {
  type: string,
  value: string
};

type CustomMap = {
  key: string
  value: RegExp
};

type ValueFounded = {
  index: number,
  found: string,
  pattern: string
};

const LEX_SPECIFICATION: CustomMap[] = [
  {key: 'STRING', value: /("([a-zA-Z0-9]+(|,|.|!|@|#|$|%|¨|&|\*|\(|\)-|=|\+)([ ]*))+")/},
  {key: 'NUMBER', value: /-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-][0-9]+)?/},
  {key: 'LITERAL', value: /true|false|null/},
  {key: 'OPERATOR', value: /[{}[\],:]/},
  {key: 'BLANK_SPACE', value: /\s+/},
  {key: 'ERROR', value: /./},
];

@Component({
  selector: 'app-lexical-analyzer',
  templateUrl: './lexical-analyzer.component.html',
  styleUrls: ['./lexical-analyzer.component.scss']
})
export class LexicalAnalyzerComponent {
  src = '';
  tokensFormatted = '';

  private static sortValuesFounded(valueFounded: ValueFounded[]): ValueFounded[] {
    return valueFounded.sort((a, b) => {
      if (a.index === b.index) {
        return 0;
      }
      return a.index > b.index ? 1 : -1;
    });
  }

  lex(): void {
    this.tokensFormatted = '';
    this.tokenize(this.src)
      .forEach(token => this.tokensFormatted = this.tokensFormatted + (`Token(type='${token.type}', value='${token.value})'\n`));
  }

  tokenize(src: string): Token[] {
    const tokens: Token[] = [];
    while (src !== '') {
      const values: ValueFounded[] = [];
      for (const item of LEX_SPECIFICATION) {
        const result = item.value.exec(src);
        if (result === null) {
          continue;
        }
        values.push({
          index: result.index,
          found: result[0],
          pattern: item.key
        });
      }
      const valuesSorted = LexicalAnalyzerComponent.sortValuesFounded(values);
      if (!valuesSorted || valuesSorted.length === 0) {
        continue;
      }
      const firstValue = valuesSorted[0];
      src = src.replace(firstValue.found, '');
      tokens.push({
        type: firstValue.pattern,
        value: firstValue.found,
      });
    }
    return tokens;
  }
}
