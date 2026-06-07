import type { Config } from 'stylelint';

export default {
  customSyntax: 'postcss-scss',
  extends: 'stylelint-config-standard-scss',
  rules: {
    'selector-type-no-unknown': null,
    'declaration-block-no-duplicate-properties': true,
    'no-descending-specificity': null,
    'at-rule-no-unknown': null,
    'max-nesting-depth': 3,
    'shorthand-property-no-redundant-values': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'no-unknown-animations': null,
    'no-invalid-double-slash-comments': null,
    'selector-pseudo-element-no-unknown': null
  }
} satisfies Config;