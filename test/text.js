import { expect } from 'chai'

import * as error from '../src/utils/error.js'
import * as text from '../src/text.js'

describe('Text', () => {
  it('CHAR', () => {
    expect(text.CHAR(65)).to.equal('A')
    expect(text.CHAR(255)).to.equal('ÿ')
    expect(text.CHAR(1000)).to.equal('Ϩ')
    expect(text.CHAR(undefined)).to.equal(error.value)
    expect(text.CHAR(error.na)).to.equal(error.na)
    expect(text.CHAR('invalid')).to.equal(error.value)
  })

  it('CLEAN', () => {
    expect(text.CLEAN(undefined)).to.equal('')
    expect(text.CLEAN(error.na)).to.equal(error.na)
    expect(text.CLEAN('Monthly Report')).to.equal('Monthly Report')
  })

  it('CODE', () => {
    expect(text.CODE()).to.equal(error.value)
    expect(text.CODE(undefined)).to.equal(error.value)
    expect(text.CODE(error.na)).to.equal(error.na)
    expect(text.CODE('A')).to.equal(65)
    expect(text.CODE('Ϩ')).to.equal(1000)
  })

  it('CONCATENATE', () => {
    expect(text.CONCATENATE('a', undefined, 'b')).to.equal('ab')
    expect(text.CONCATENATE('a', error.na, 'b')).to.equal(error.na)
    expect(text.CONCATENATE('hello', ' ', 'world')).to.equal('hello world')
    expect(text.CONCATENATE(['hello', ' my ', 'world'])).to.equal('hello my world')
    expect(text.CONCATENATE(1, 'one')).to.equal('1one')
    expect(text.CONCATENATE(true, 'yes')).to.equal('TRUEyes')
    expect(text.CONCATENATE(false, 'no')).to.equal('FALSEno')
  })

  it('CONCAT', () => {
    expect(text.CONCAT('a', undefined, 'b')).to.equal('ab')
    expect(text.CONCAT('a', error.na, 'b')).to.equal(error.na)
    expect(text.CONCAT('hello', ' ', 'world')).to.equal('hello world')
    expect(text.CONCAT(['hello', ' my ', 'world'])).to.equal('hello my world')
    expect(text.CONCAT(1, 'one')).to.equal('1one')
    expect(text.CONCAT(true, 'yes')).to.equal('TRUEyes')
    expect(text.CONCAT(false, 'no')).to.equal('FALSEno')
  })

  it('DOLLAR', () => {
    expect(text.DOLLAR(1234.567)).to.equal('$1,234.57')
    expect(text.DOLLAR(1234.567, -2)).to.equal('$1,200')
    expect(text.DOLLAR(-1234.567, -2)).to.equal('$(1,200)')
    expect(text.DOLLAR(-0.123, 4)).to.equal('$(0.1230)')
    expect(text.DOLLAR(-99.888)).to.equal('$(99.89)')
    expect(text.DOLLAR('invalid')).to.equal(error.value)
    expect(text.DOLLAR(255)).to.equal('$255.00')
    expect(text.DOLLAR(367.456, 2)).to.equal('$367.46')
  })

  it('EXACT', () => {
    expect(text.EXACT(undefined, undefined)).to.equal(true)
    expect(text.EXACT(undefined, null)).to.equal(true)
    expect(text.EXACT(undefined, '')).to.equal(true)
    expect(text.EXACT(error.na, error.na)).to.equal(error.na)
    expect(text.EXACT('yes', 'yes')).to.equal(true)
    expect(text.EXACT('yes', 'no')).to.equal(false)
    expect(text.EXACT('yes', 'yes', 'yes')).to.equal(error.na)
    expect(text.EXACT()).to.equal(error.na)
    expect(text.EXACT('true', true)).to.equal(true)
    expect(text.EXACT('12', 12)).to.equal(true)
    expect(text.EXACT('Word', '0')).to.equal(false)
  })

  it('FIND', () => {
    const data = 'Miriam McGovern'
    expect(text.FIND(undefined, undefined)).to.equal(1)
    expect(text.FIND('M', data)).to.equal(1)
    expect(text.FIND('m', data)).to.equal(6)
    expect(text.FIND('M', data, 3)).to.equal(8)
    expect(text.FIND('M', undefined)).to.equal(error.value)
    expect(text.FIND('M')).to.equal(error.na)
    expect(text.FIND()).to.equal(error.na)
    expect(text.FIND(true, '12true')).to.equal(3)
    expect(text.FIND(12, '312')).to.equal(2)
    expect(text.FIND(12, 312)).to.equal(2)
  })

  it('FIXED', () => {
    expect(text.FIXED(1234.567, 1)).to.equal('1,234.6')
    expect(text.FIXED(1234.567, -1)).to.equal('1,230')
    expect(text.FIXED(-1234.567, -1, true)).to.equal('-1230')
    expect(text.FIXED(44.332)).to.equal('44.33')
    expect(text.FIXED('invalid')).to.equal(error.value)
    expect(text.FIXED(1234567.89, 3)).to.equal('1,234,567.890')
    expect(text.FIXED(123456.789, undefined, true)).to.equal('123456.79')
    expect(text.FIXED(12345.6789, -2)).to.equal('12,300')
    expect(text.FIXED(12134567.89, -3, 1)).to.equal('12135000')
    expect(text.FIXED(12345.789, 3 / 4)).to.equal('12,346')
    expect(text.FIXED(12345.789, 8 / 5)).to.equal('12,345.8')
    expect(text.FIXED(1234.56789, 5)).to.equal('1,234.56789')
    expect(text.FIXED(1234.567899, 5)).to.equal('1,234.56790')
    expect(text.FIXED(1234.5, 5)).to.equal('1,234.50000')
    expect(text.FIXED(123456.9, 4)).to.equal('123,456.9000')
  })

  it('LEFT', () => {
    expect(text.LEFT(error.na, 2)).to.equal(error.na)
    expect(text.LEFT('text', error.na)).to.equal(error.na)
    expect(text.LEFT(undefined, undefined)).to.equal('')
    expect(text.LEFT(undefined, 3)).to.equal('')
    expect(text.LEFT('Sale Price', 4)).to.equal('Sale')
    expect(text.LEFT('Sweeden')).to.equal('S')
    expect(text.LEFT(42)).to.equal('4')
    expect(text.LEFT(true)).to.equal('t')
  })

  it('LEN', () => {
    expect(text.LEN(undefined)).to.equal(0)
    expect(text.LEN(error.na)).to.equal(error.na)
    expect(text.LEN(true)).to.equal(4)
    expect(text.LEN('four')).to.equal(4)
    expect(text.LEN([1, 2, 3, 4, 5])).to.equal(error.value)
    expect(text.LEN()).to.equal(error.error)
    expect(text.LEN(null)).to.equal(0)
    expect(text.LEN([])).to.equal(error.value)
    expect(text.LEN(123)).to.equal(3)
  })

  it('LOWER', () => {
    expect(text.LOWER(undefined)).to.equal('')
    expect(text.LOWER(error.na)).to.equal(error.na)
    expect(text.LOWER('abcd')).to.equal('abcd')
    expect(text.LOWER('ABcd')).to.equal('abcd')
    expect(text.LOWER('ABCD')).to.equal('abcd')
    expect(text.LOWER('')).to.equal('')
    expect(text.LOWER(true)).to.equal('true')
    expect(text.LOWER(1)).to.equal('1')
    expect(text.LOWER()).to.equal(error.value)
  })

  describe('MID', () => {
    describe('args: (text, start_num, num_chars)', () => {
      describe('should extract numbers of characters (num_chars) from text, starting from start_num (1-based index)', () => {
        it('examples from Microsoft docs', () => {
          const data = 'Fluid Flow'
          expect(text.MID(data, 1, 5)).to.equal('Fluid')
          expect(text.MID(data, 7, 20)).to.equal('Flow')
          expect(text.MID(data, 20, 5)).to.equal('')
        })

        const textTest = 'Programming language and core technology of the Web'
        it('when start_num + num_chars less than or equal text length => simple substring', () => {
          expect(text.MID(textTest, 12, 10)).to.equal(' language ')
          expect(text.MID(textTest, 31, 21)).to.equal('technology of the Web')
        })

        it('when start_num + num_chars greater than text length => substring until end', () => {
          expect(text.MID(textTest, 12, 100)).to.equal(' language and core technology of the Web')
          expect(text.MID(textTest, 31, 25)).to.equal('technology of the Web')
        })

        it('when start_num greater than text length => returns empty text', () => {
          const start_num = textTest.length + 1
          expect(text.MID(textTest, start_num, 1)).to.equal('')
        })

        it('when non defined text provided => return empty text', () => {
          expect(text.MID(undefined, 20, 3)).to.equal('')
          expect(text.MID(null, 52, 8)).to.equal('')
        })

        it('when text defined and not string typed => treated as string', () => {
          expect(text.MID(-162, 1, 3)).to.equal('-16')
          expect(text.MID(162.178925, 3, 6)).to.equal('2.1789')
          expect(text.MID(true, 3, 2)).to.equal('ue')
          expect(text.MID(false, 2, 6)).to.equal('alse')
        })
      })

      describe('should throw error #VALUE!', () => {
        it('when start_num or num_chars are not strictly positive (> 1)', () => {
          expect(text.MID('', -3, 3)).to.equal(error.value)
          expect(text.MID('', 3, -3)).to.equal(error.value)
          expect(text.MID('', -3, -3)).to.equal(error.value)
        })
      })
    })
  })

  describe('NUMBERVALUE', () => {
    it('should parse text value', () => {
      expect(text.NUMBERVALUE('2.500,27', ',', '.')).to.equal(2500.27)
      expect(text.NUMBERVALUE('250', ',', '.')).to.equal(250)
      expect(text.NUMBERVALUE('', ',', '.')).to.equal(0)
      // expect(text.NUMBERVALUE("3.5%")).to.equal(.035);
    })

    it('should work with empty inputs', () => {
      expect(text.NUMBERVALUE(null, ',', '.')).to.equal(0)
      expect(text.NUMBERVALUE(undefined, ',', '.')).to.equal(0)
    })

    it('should work with number input', () => {
      expect(text.NUMBERVALUE(3)).to.equal(3)
    })

    it('should throw an error in case of text input different from string', () => {
      expect(text.NUMBERVALUE(true)).to.equal(error.na)
    })
  })

  it('PROPER', () => {
    expect(text.PROPER(undefined)).to.equal('')
    expect(text.PROPER(null)).to.equal('')
    expect(text.PROPER(error.na)).to.equal(error.na)
    expect(text.PROPER('a title case')).to.equal('A Title Case')
    expect(text.PROPER(true)).to.equal('True')
    expect(text.PROPER(false)).to.equal('False')
    expect(text.PROPER(90)).to.equal('90')
    expect(text.PROPER(NaN)).to.equal(error.value)
    expect(text.PROPER()).to.equal('')
  })

  it('REPLACE', () => {
    expect(text.REPLACE('abcdefghijk', 6, 5, '*')).to.equal('abcde*k')
    expect(text.REPLACE('2009', 3, 2, '10')).to.equal('2010')
    expect(text.REPLACE('123456', 1, 3, '@')).to.equal('@456')
    expect(text.REPLACE()).to.equal(error.value)
  })

  it('REPT', () => {
    expect(text.REPT(undefined, undefined)).to.equal('')
    expect(text.REPT('text', undefined)).to.equal('')
    expect(text.REPT(undefined, 3)).to.equal('')
    expect(text.REPT(error.na, 3)).to.equal(error.na)
    expect(text.REPT('multiple ', 3)).to.equal('multiple multiple multiple ')
    expect(text.REPT('m')).to.equal('')
    expect(text.REPT()).to.equal('')
    expect(text.REPT(true, 2)).to.equal('truetrue')
    expect(text.REPT(12, 2)).to.equal('1212')
  })

  it('RIGHT', () => {
    expect(text.RIGHT(error.na, 2)).to.equal(error.na)
    expect(text.RIGHT('text', error.na)).to.equal(error.na)
    expect(text.RIGHT(undefined, undefined)).to.equal('')
    expect(text.RIGHT(undefined, 3)).to.equal('')
    expect(text.RIGHT('Sale Price', 5)).to.equal('Price')
    expect(text.RIGHT('Stock Number')).to.equal('r')
    expect(text.RIGHT('something', 'invalid')).to.equal(error.value)
    expect(text.RIGHT()).to.equal('')
    expect(text.RIGHT(42)).to.equal('2')
    expect(text.RIGHT(true)).to.equal('e')
  })

  it('SEARCH', () => {
    expect(text.SEARCH('e', 'Statements', 6)).to.equal(7)
    expect(text.SEARCH('margin', 'Profit Margin')).to.equal(8)
    expect(text.SEARCH(true, 'bool')).to.equal(error.value)
    expect(text.SEARCH('foo', 'bar')).to.equal(error.value)
    expect(text.SEARCH('ba', 'bar')).to.equal(1)
  })

  describe('SUBSTITUTE', () => {
    it('should substitute all occurrences of a string for another string', () => {
      expect(text.SUBSTITUTE('Jim Alateras', 'Jim', 'James')).to.equal('James Alateras')
      expect(text.SUBSTITUTE('Jim Alateras', 'im', 'ames')).to.equal('James Alateras')
      expect(text.SUBSTITUTE('Jim Alateras', '', 'ames')).to.equal('Jim Alateras')
      expect(text.SUBSTITUTE('Jim Alateras', undefined, 'ames')).to.equal('Jim Alateras')
      expect(text.SUBSTITUTE('Jim, Alateras, Sr.', ',', '')).to.equal('Jim Alateras Sr.')
      expect(text.SUBSTITUTE('', 'im', 'ames')).to.equal('')
      expect(text.SUBSTITUTE(undefined, 'im', 'ames')).to.not.exist
    })

    it('should substitute regex meta-characters without interpretation', () => {
      expect(text.SUBSTITUTE('J. Alateras', '.', 'ames')).to.equal('James Alateras')
    })

    it('should return an #N/A error if not enough inputs', () => {
      expect(text.SUBSTITUTE('Jim Alateras')).to.equal(error.na)
      expect(text.SUBSTITUTE()).to.equal(error.na)
    })

    it('should substitute the nth occurrence of a string for another string', () => {
      expect(text.SUBSTITUTE('a-a-a', ':', '', 1)).to.equal('a-a-a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '2')).to.equal('a-a:a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '2.5')).to.equal('a-a:a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '3')).to.equal('a-a-a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 2)).to.equal('a-a:a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 2.5)).to.equal('a-a:a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 3)).to.equal('a-a-a')
    })

    it('should return a #VALUE! error if occurrence is not a number greater than or equal to 1', () => {
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '')).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 'x')).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '-1')).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '-0.5')).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', -1)).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 0)).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 0.5)).to.equal(error.value)
    })
  })

  it('T', () => {
    expect(text.T(undefined)).to.equal('')
    expect(text.T(error.na)).to.equal(error.na)
    expect(text.T('Rainfall')).to.equal('Rainfall')
    expect(text.T(19)).to.equal('')
    expect(text.T(true)).to.equal('')
  })

  describe('TEXT', () => {
    it('should use fixed number of decimals and include commas if specified', () => {
      expect(text.TEXT(1234.59, '###0.0')).to.equal('1234.6')
      expect(text.TEXT(1234.59, '0')).to.equal('1235')
      expect(text.TEXT(1234.52, '###0.0')).to.equal('1234.5')
      expect(text.TEXT(1234.56, '###0.00')).to.equal('1234.56')
      expect(text.TEXT(1234, '###0.0000')).to.equal('1234.0000')
      expect(text.TEXT(123456.9, '#,##0.0000')).to.equal('123,456.9000')
      expect(text.TEXT()).to.equal(error.na)
    })

    it('should format numbers with $ sign', () => {
      expect(text.TEXT(1234567.89, '$#,##0.00')).to.equal('$1,234,567.89')
      expect(text.TEXT(1234.59, '$#,##0.00')).to.equal('$1,234.59')
      expect(text.TEXT(-1234567.89, '$#,##0.00')).to.equal('-$1,234,567.89')
      expect(text.TEXT(-1234.59, '$#,##0.00')).to.equal('-$1,234.59')
      expect(text.TEXT(0, '$#,##0.00')).to.equal('$0.00')
    })

    it('should format percentages', () => {
      expect(text.TEXT(0.89, '0.00%')).to.equal('89.00%')
      expect(text.TEXT(0.1234, '0.00%')).to.equal('12.34%')
      expect(text.TEXT(1, '0.00%')).to.equal('100.00%')
    })

    it('should handle errors', () => {
      expect(text.TEXT(error.value, '0.00%')).to.equal(error.na)
      expect(text.TEXT(0.89, error.na)).to.equal(error.na)
      expect(text.TEXT(error.value, error.na)).to.equal(error.na)
      expect(text.TEXT(123, undefined)).to.equal('')
      expect(text.TEXT(123, null)).to.equal('')
      expect(text.TEXT(123, 111)).to.equal('111')
      expect(text.TEXT(123, true)).to.equal(error.value)
    })

    describe('does not support date formatting but should not crash', () => {
      it('should return ISO formatted Date', () => {
        expect(text.TEXT(new Date(2023, 3, 11, 12), 'DD MMMM, YYYY')).to.equal('2023-04-11')
      })
    })
  })

  it('TEXTJOIN', () => {
    expect(text.TEXTJOIN(' ', true, 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'The sun will come up tomorrow.'
    )
    expect(text.TEXTJOIN(' ', 'TRUE', 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'The sun will come up tomorrow.'
    )
    expect(text.TEXTJOIN(' ', false, 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'The  sun will come up tomorrow.'
    )
    expect(text.TEXTJOIN(' ', 'FALSE', 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'The  sun will come up tomorrow.'
    )
    expect(text.TEXTJOIN(['_', '>'], true, 'The', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'The_sun>will_come>up_tomorrow.'
    )
    expect(text.TEXTJOIN(' ', true, ['The', 'sun', 'will'], 'come', ['up', 'tomorrow.'])).to.equal(
      'The sun will come up tomorrow.'
    )
    expect(text.TEXTJOIN(true, true, ['The', 'sun', 'will'], 'come', ['up', 'tomorrow.'])).to.equal(
      'Thetruesuntruewilltruecometrueuptruetomorrow.'
    )
    expect(text.TEXTJOIN(undefined, undefined, 'The', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'Thesunwillcomeuptomorrow.'
    )
    expect(text.TEXTJOIN(' ', true)).to.equal(error.na)
  })

  it('TRIM', () => {
    expect(text.TRIM(undefined)).to.equal('')
    expect(text.TRIM(error.na)).to.equal(error.na)
    expect(text.TRIM(' more  spaces ')).to.equal('more spaces')
    expect(text.TRIM(true)).to.equal('true')
    expect(text.TRIM(10)).to.equal('10')
    expect(
      text.TRIM(
        `  spaces,      tabs, and
      new lines`
      )
    ).to.equal('spaces, tabs, and new lines')
    expect(text.TRIM('  spaces,\t\t\ttabs, and\nnew lines')).to.equal('spaces, tabs, and new lines')
  })

  it('UNICHAR', () => {
    expect(text.UNICHAR(undefined)).to.equal(error.value)
    expect(text.UNICHAR(error.na)).to.equal(error.na)
    expect(text.UNICHAR(65)).to.equal('A')
    expect(text.UNICHAR(255)).to.equal('ÿ')
    expect(text.UNICHAR(1000)).to.equal('Ϩ')
  })

  it('UNICODE', () => {
    expect(text.UNICODE(undefined)).to.equal(error.value)
    expect(text.UNICODE(error.na)).to.equal(error.na)
    expect(text.UNICODE('A')).to.equal(65)
    expect(text.UNICODE('Ϩ')).to.equal(1000)
  })

  it('UPPER', () => {
    expect(text.UPPER(undefined)).to.equal('')
    expect(text.UPPER(error.na)).to.equal(error.na)
    expect(text.UPPER('to upper case please')).to.equal('TO UPPER CASE PLEASE')
    expect(text.UPPER(true)).to.equal('TRUE')
    expect(text.UPPER(1)).to.equal('1')
  })

  describe('VALUE', () => {
    it('should thrown an error in case of error input', () => {
      expect(text.VALUE(error.na)).to.equal(error.na)
    })

    it('should return the input in case of number input', () => {
      expect(text.VALUE(3)).to.equal(3)
    })

    it('should return 0 in case of null, empty input', () => {
      expect(text.VALUE('')).to.equal(0)
      expect(text.VALUE()).to.equal(0)
      expect(text.VALUE(null)).to.equal(0)
    })

    it('should thrown an error in case of boolean input', () => {
      expect(text.VALUE(true)).to.equal(error.value)
    })

    it('should thrown an error in case of malformed input', () => {
      expect(text.VALUE('SOMETEXT')).to.equal(error.value)
      expect(text.VALUE('2+2')).to.equal(error.value)
      expect(text.VALUE('3%22')).to.equal(error.value)
      expect(text.VALUE('3D22')).to.equal(error.value)
      expect(text.VALUE('SOMETEXT 42')).to.equal(error.value)
    })

    it('should parse scientific notation string', () => {
      expect(text.VALUE('10E3')).to.equal(10000)
    })

    it('should parse percentage string', () => {
      expect(text.VALUE('%12')).to.equal(0.12)
      expect(text.VALUE('12%')).to.equal(0.12)
    })

    it('should allow numeric input', () => {
      expect(text.VALUE(12)).to.equal(12)
    })

    /**
     * Only supports thousands separator "," and decimal separator "."
     *
     * These separators are not yet configurable. But the aim is not be as extensive as dedicated parsing library
     * such as Numeral.js or Numbro.
     */
    it('should parse a number as string', () => {
      expect(text.VALUE('123.45')).to.equal(123.45)
      expect(text.VALUE('10,000')).to.equal(10000)
      expect(text.VALUE('1,210,000')).to.equal(1210000)
      expect(text.VALUE('11 000')).to.equal(11000)
      expect(text.VALUE('-3.14')).to.equal(-3.14)
    })

    it('should parse dollar monetary string', () => {
      expect(text.VALUE('$1000')).to.equal(1000)
      expect(text.VALUE('$11,000')).to.equal(11000)
    })

    /**
     * These test cases illustrate permissive input cases. They do not mirror exactly Excel behaviors.
     */
    it('could be less permissive', () => {
      expect(text.VALUE('EUR1000')).to.equal(1000)
    })
  })
})

// Expected values were observed in Microsoft Excel Desktop (Formula2, through COM) for the same arguments, except for
// the documentation examples. Behaviours that depend on the Excel locale (decimal separator, TRUE / FALSE as text) are not tested.
describe('TEXTAFTER', () => {
  describe('args: (text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])', () => {
    describe('should return the text after the delimiter.', () => {
      it('examples from Microsoft docs', () => {
        expect(text.TEXTAFTER("Red riding hood's, red hood", 'hood')).to.equal("'s, red hood")
        expect(text.TEXTAFTER("Red riding hood's, red hood", '')).to.equal("Red riding hood's, red hood")
        expect(text.TEXTAFTER("Red riding hood's, red hood", '', -1)).to.equal('')
        expect(text.TEXTAFTER("Little Red Riding Hood's red hood", 'Red')).to.equal(" Riding Hood's red hood")
        expect(text.TEXTAFTER("Little Red Riding Hood's red hood", 'basket')).to.eql(error.na)
        expect(text.TEXTAFTER("Little red Riding Hood's red hood", 'red', 2)).to.equal(' hood')
        expect(text.TEXTAFTER("Little red Riding Hood's red hood", 'red', -2)).to.equal(" Riding Hood's red hood")
        expect(text.TEXTAFTER('Marcus Aurelius', ' ', undefined, undefined, 1)).to.equal('Aurelius')
      })

      it('with only the required args => first instance, case-sensitive', () => {
        expect(text.TEXTAFTER('apple,banana,cherry', ',')).to.equal('banana,cherry')
        expect(text.TEXTAFTER('apple,banana,cherry', ',', 1)).to.equal('banana,cherry')
      })

      it('with instance_num > 0 => counts from the start of the text', () => {
        expect(text.TEXTAFTER('apple,banana,cherry', ',', 2)).to.equal('cherry')
        expect(text.TEXTAFTER('a,,b', ',', 2)).to.equal('b')
      })

      it('with instance_num < 0 => counts from the end of the text', () => {
        expect(text.TEXTAFTER('apple,banana,cherry', ',', -1)).to.equal('cherry')
        expect(text.TEXTAFTER('apple,banana,cherry', ',', -2)).to.equal('banana,cherry')
        expect(text.TEXTAFTER('a,b,c', ',', -2)).to.equal('b,c')
        expect(text.TEXTAFTER('a,b,c', ',', -1, 0, 1)).to.equal('c')
      })

      it('with a decimal instance_num => rounded down', () => {
        expect(text.TEXTAFTER('a,b,c', ',', 1.9)).to.equal('b,c')
        expect(text.TEXTAFTER('a,b,c', ',', -1.9)).to.equal('b,c')
        expect(text.TEXTAFTER('a,b,c,d', ',', -2.5)).to.equal('b,c,d')
        expect(text.TEXTAFTER('a,b,c,d,e', ',', -0.5)).to.equal('e')
        expect(text.TEXTAFTER('a,b,c,d,e', ',', -2.5)).to.equal('c,d,e')
        expect(text.TEXTAFTER('a,b,c,d,e', ',', 1.5)).to.equal('b,c,d,e')
        expect(text.TEXTAFTER('a,b,c,d,e', ',', 2.5)).to.equal('c,d,e')
        expect(text.TEXTAFTER('a,b', ',', 3.9)).to.eql(error.na)
      })

      it('with a numeric text or a boolean instance_num => converted to a number', () => {
        expect(text.TEXTAFTER('a,b,c', ',', '2')).to.equal('c')
        expect(text.TEXTAFTER('a,b,c', ',', true)).to.equal('b,c')
        expect(text.TEXTAFTER('a,b,c', ',', '-1')).to.equal('c')
        expect(text.TEXTAFTER('a,b,c', ',', ' 2 ')).to.equal('c')
      })

      it('with overlapping delimiters => matches do not overlap', () => {
        expect(text.TEXTAFTER('aaaa', 'aa', 2)).to.equal('')
        expect(text.TEXTAFTER('aaaa', 'aa', 3)).to.eql(error.na)
        expect(text.TEXTAFTER('aaaa', 'aa', -1)).to.equal('')
        expect(text.TEXTAFTER('aaa', 'aa', 1)).to.equal('a')
        expect(text.TEXTAFTER('aaa', 'aa', -1)).to.equal('')
        expect(text.TEXTAFTER('aaa', 'aa', 2)).to.eql(error.na)
        expect(text.TEXTAFTER('aaa', 'aa', -2)).to.eql(error.na)
        expect(text.TEXTAFTER('ababa', 'aba', 2)).to.eql(error.na)
        expect(text.TEXTAFTER('ababa', 'aba', -2)).to.eql(error.na)
        expect(text.TEXTAFTER('ababa', 'aba', -1)).to.equal('')
      })

      it('with a delimiter equal to the whole text', () => {
        expect(text.TEXTAFTER('abc', 'abc')).to.equal('')
        expect(text.TEXTAFTER('abc', 'abc', -1)).to.equal('')
      })

      it('with a delimiter at the start or at the end of the text', () => {
        expect(text.TEXTAFTER(',a', ',')).to.equal('a')
        expect(text.TEXTAFTER('a,', ',')).to.equal('')
        expect(text.TEXTAFTER(',', ',')).to.equal('')
      })

      it('with a multi-character delimiter', () => {
        expect(text.TEXTAFTER('a::b::c', '::')).to.equal('b::c')
        expect(text.TEXTAFTER('a  b', ' ')).to.equal(' b')
        expect(text.TEXTAFTER('a , b', ' , ')).to.equal('b')
      })
    })

    describe('should handle special characters and types.', () => {
      it('with wildcards, tilde and regex characters => taken literally', () => {
        expect(text.TEXTAFTER('a*b', '*')).to.equal('b')
        expect(text.TEXTAFTER('a?b', '?')).to.equal('b')
        expect(text.TEXTAFTER('a~b', '~')).to.equal('b')
        expect(text.TEXTAFTER('axb', '*')).to.eql(error.na)
        expect(text.TEXTAFTER('a.b', '.')).to.equal('b')
        expect(text.TEXTAFTER('a(+)b', '(+)')).to.equal('b')
      })

      it('with a newline delimiter', () => {
        expect(text.TEXTAFTER('a' + '\n' + 'b', '\n')).to.equal('b')
      })

      it('with an emoji delimiter (UTF-16 surrogate pair)', () => {
        expect(text.TEXTAFTER('a😀b😀c', '😀', 2)).to.equal('c')
        expect(text.TEXTAFTER('😀ab', '😀')).to.equal('ab')
      })

      it('with a non-breaking space => not equal to a space', () => {
        expect(text.TEXTAFTER('a' + String.fromCodePoint(160) + 'b', ' ')).to.eql(error.na)
      })

      it('with an accented letter => not equal to its decomposed form', () => {
        expect(text.TEXTAFTER('e' + String.fromCodePoint(769) + 'x', 'é')).to.eql(error.na)
      })

      it('with numbers as text and delimiter => converted to text', () => {
        expect(text.TEXTAFTER(12345, 3)).to.equal('45')
        expect(text.TEXTAFTER('a1b', 1)).to.equal('b')
        expect(text.TEXTAFTER('a0b', '0')).to.equal('b')
        expect(text.TEXTAFTER('a0b', 0)).to.equal('b')
        expect(text.TEXTAFTER(0, '0')).to.equal('')
        expect(text.TEXTAFTER(10, '0')).to.equal('')
        expect(text.TEXTAFTER(1e21, 'E')).to.equal('+21')
      })
    })

    describe('should handle match_mode.', () => {
      it('with match_mode = 0 => case-sensitive', () => {
        expect(text.TEXTAFTER('Apple,banana,cherry', ',', 1, 0)).to.equal('banana,cherry')
        expect(text.TEXTAFTER('apple Banana cherry', 'BANANA', 1, 0)).to.eql(error.na)
        expect(text.TEXTAFTER('Éa,b', 'é', 1, 0)).to.eql(error.na)
        expect(text.TEXTAFTER('ab', 'xyz', 2)).to.eql(error.value)
        expect(text.TEXTAFTER('Ab', 'B', 1, 0.5)).to.eql(error.na)
        expect(text.TEXTAFTER('Ab', 'B', 1, -0.5)).to.eql(error.na)
        expect(text.TEXTAFTER('Ab', 'B', 1, -0.9)).to.eql(error.na)
        expect(text.TEXTAFTER('Ab', 'B', 1, false)).to.eql(error.na)
        expect(text.TEXTAFTER('Ab', 'B', 1, null)).to.eql(error.na)
      })

      it('with match_mode = 1 => case-insensitive', () => {
        expect(text.TEXTAFTER('apple Banana cherry', 'BANANA', 1, 1)).to.equal(' cherry')
        expect(text.TEXTAFTER('Éa,b', 'é', 1, 1)).to.equal('a,b')
        expect(text.TEXTAFTER('xABxabx', 'AB', -1, 1)).to.equal('x')
        expect(text.TEXTAFTER('abc', 'B', 1, 1)).to.equal('c')
        expect(text.TEXTAFTER('аБв', 'б', 1, 1)).to.equal('в')
        expect(text.TEXTAFTER('aİb', 'i̇', 1, 1)).to.eql(error.na)
        expect(text.TEXTAFTER('aßb', 'SS', 1, 1)).to.eql(error.na)
        expect(text.TEXTAFTER('aΣb', 'ς', 1, 1)).to.eql(error.na)
      })

      it('with a numeric text, a boolean or a decimal match_mode => converted then truncated', () => {
        expect(text.TEXTAFTER('Ab', 'B', 1, '1')).to.equal('')
        expect(text.TEXTAFTER('Ab', 'B', 1, true)).to.equal('')
        expect(text.TEXTAFTER('Ab', 'B', 1, 1.5)).to.equal('')
        expect(text.TEXTAFTER('Ab', 'B', 1, 1.9)).to.equal('')
      })
    })

    describe('should handle match_end.', () => {
      it('with match_end = 1 => the end of the text counts as a delimiter', () => {
        expect(text.TEXTAFTER('apple,banana,cherry', 'cherry', 1, 0, 1)).to.equal('')
        expect(text.TEXTAFTER('Marcus Aurelius', ' ', 1, 0, 1)).to.equal('Aurelius')
        expect(text.TEXTAFTER('a,b', ',', 2, 0, 1)).to.equal('')
        expect(text.TEXTAFTER('abc', ',', 1, 0, 1)).to.equal('')
        expect(text.TEXTAFTER('abc', ',', -1, 0, 1)).to.equal('abc')
        expect(text.TEXTAFTER('a,B,c', 'b', 1, 1, 1)).to.equal(',c')
        expect(text.TEXTAFTER('abc', 'X', 1, 1, 1)).to.equal('')
      })

      it('with match_end = 1 and a negative instance_num => the start of the text counts as a delimiter', () => {
        expect(text.TEXTAFTER('a,b,c', ',', -3, 0, 1)).to.equal('a,b,c')
        expect(text.TEXTAFTER('abc', ',', -1, 0, 1)).to.equal('abc')
        expect(text.TEXTAFTER(',a', ',', -2, 0, 1)).to.equal(',a')
        expect(text.TEXTAFTER(',a', ',', -1, 0, 1)).to.equal('a')
        expect(text.TEXTAFTER('a,b,', ',', -1, 0, 1)).to.equal('')
      })

      it('with match_end = 1 => it stands for one more delimiter only', () => {
        expect(text.TEXTAFTER('a,b', ',', 3, 0, 1)).to.eql(error.na)
        expect(text.TEXTAFTER('a,b,c', ',', -4, 0, 1)).to.eql(error.na)
        expect(text.TEXTAFTER('abc', ',', 2, 0, 1)).to.eql(error.na)
        expect(text.TEXTAFTER('a,b,', ',', 3, 0, 1)).to.equal('')
        expect(text.TEXTAFTER('a,b,', ',', 4, 0, 1)).to.eql(error.na)
      })

      it('with match_end = 0 => the end of the text is not a delimiter', () => {
        expect(text.TEXTAFTER('a,b', ',', 2, 0, 0)).to.eql(error.na)
        expect(text.TEXTAFTER('a,b,c', ',', -3, 0, 0)).to.eql(error.na)
      })

      it('with a boolean, a numeric text or a decimal match_end => converted then truncated', () => {
        expect(text.TEXTAFTER('a,b', ',', 2, 0, true)).to.equal('')
        expect(text.TEXTAFTER('a,b', ',', 2, 0, '1')).to.equal('')
        expect(text.TEXTAFTER('a,b', ',', 2, 0, 1.5)).to.equal('')
        expect(text.TEXTAFTER('a,b', ',', 2, 0, 0.9)).to.eql(error.na)
        expect(text.TEXTAFTER('a,b', ',', 2, 0, false)).to.eql(error.na)
        expect(text.TEXTAFTER('a,b', ',', 2, 0, null)).to.eql(error.na)
      })
    })

    describe('should handle if_not_found.', () => {
      it('with the delimiter not found => returns if_not_found as text', () => {
        expect(text.TEXTAFTER('abc', ',', undefined, undefined, undefined, 'nf')).to.equal('nf')
        expect(text.TEXTAFTER('abc', ',', undefined, undefined, undefined, '')).to.equal('')
        expect(text.TEXTAFTER('abc', ',', undefined, undefined, undefined, 0)).to.equal('0')
        expect(text.TEXTAFTER('abc', ',', undefined, undefined, undefined, null)).to.equal('')
        expect(text.TEXTAFTER('', ',', undefined, undefined, undefined, 'nf')).to.equal('nf')
        expect(text.TEXTAFTER('abc', ',', 3, 0, 0, 'nf')).to.equal('nf')
      })

      it('with the delimiter found => ignores if_not_found', () => {
        expect(text.TEXTAFTER('a,b', ',', undefined, undefined, undefined, 'nf')).to.equal('b')
        expect(text.TEXTAFTER('a,b', ',', undefined, undefined, undefined, error.div0)).to.equal('b')
      })

      it('with an omitted if_not_found => #N/A', () => {
        expect(text.TEXTAFTER('abc', ',', undefined, undefined, undefined, undefined)).to.eql(error.na)
      })

      it('with an error as if_not_found => returns it when the delimiter is not found', () => {
        expect(text.TEXTAFTER('abc', ',', undefined, undefined, undefined, error.div0)).to.eql(error.div0)
        expect(text.TEXTAFTER('abc', ',', 1, 0, 0, error.na)).to.eql(error.na)
      })
    })

    describe('should handle an empty delimiter.', () => {
      it('with a positive instance_num => the delimiter matches at the start of the text', () => {
        expect(text.TEXTAFTER('apple,banana,cherry', '')).to.equal('apple,banana,cherry')
        expect(text.TEXTAFTER('abc', '', 2)).to.equal('abc')
        expect(text.TEXTAFTER('abc', '', 3)).to.equal('abc')
        expect(text.TEXTAFTER('abc', '', 4)).to.equal('abc')
        expect(text.TEXTAFTER('abc', '', 5)).to.equal('abc')
        expect(text.TEXTAFTER('abc', '', 100)).to.equal('abc')
        expect(text.TEXTAFTER('abc', '', 1e10)).to.equal('abc')
      })

      it('with a negative instance_num => the delimiter matches at the end of the text', () => {
        expect(text.TEXTAFTER('apple,banana,cherry', '', -1)).to.equal('')
        expect(text.TEXTAFTER('abc', '', -2)).to.equal('')
        expect(text.TEXTAFTER('abc', '', -4)).to.equal('')
        expect(text.TEXTAFTER('abc', '', -100)).to.equal('')
      })

      it('with match_end = 1', () => {
        expect(text.TEXTAFTER('abc', '', 1, 0, 1)).to.equal('abc')
        expect(text.TEXTAFTER('abc', '', -1, 0, 1)).to.equal('')
      })

      it('with an empty cell as delimiter', () => {
        expect(text.TEXTAFTER('a,b', null)).to.equal('a,b')
      })

      it('with an empty text', () => {
        expect(text.TEXTAFTER('', '')).to.equal('')
        expect(text.TEXTAFTER('', '', -1)).to.equal('')
        expect(text.TEXTAFTER('', '', 2)).to.equal('')
        expect(text.TEXTAFTER(null, null)).to.equal('')
      })
    })

    describe('should handle an empty text.', () => {
      it('with a delimiter => not found', () => {
        expect(text.TEXTAFTER('', ',')).to.eql(error.na)
        expect(text.TEXTAFTER(null, ',')).to.eql(error.na)
        expect(text.TEXTAFTER('', ',', undefined, undefined, undefined, 'nf')).to.equal('nf')
        expect(text.TEXTAFTER('', ',', undefined, undefined, 1)).to.eql(error.na)
        expect(text.TEXTAFTER('', ',', undefined, undefined, 1, 'nf')).to.equal('nf')
        expect(text.TEXTAFTER('', ',', undefined, 1)).to.eql(error.na)
      })
    })

    describe('should handle several delimiters.', () => {
      it('with an array of delimiters => the first match of any delimiter is used', () => {
        expect(text.TEXTAFTER('a,b;c', [[',', ';']])).to.equal('b;c')
        expect(text.TEXTAFTER('a,b;c', [[',', ';']], 2)).to.equal('c')
        expect(text.TEXTAFTER('a,b;c', [[',', ';']], -1)).to.equal('c')
        expect(text.TEXTAFTER('a,b;c', [[';', ',']])).to.equal('b;c')
        expect(text.TEXTAFTER('abc', [[',', ';']])).to.eql(error.na)
        expect(text.TEXTAFTER('a,b', [[',']], 2, 0, 1)).to.equal('')
        expect(text.TEXTAFTER('a,b;c', [[','], [';']])).to.equal('b;c')
        expect(text.TEXTAFTER('abcbcd', [['b', 'bc']], 2)).to.equal('d')
        expect(text.TEXTAFTER('abcbcd', [['b', 'bc']], -2)).to.equal('bcd')
      })

      it('with an array of delimiters => the longest one wins when several match at the same position', () => {
        expect(text.TEXTAFTER('abcd', [['bc', 'b']])).to.equal('d')
        expect(text.TEXTAFTER('abcd', [['b', 'bc']])).to.equal('d')
        expect(text.TEXTAFTER('aBCd', [['b', 'bc']], 1, 1)).to.equal('d')
        expect(text.TEXTAFTER('abcd', [['b', 'bc']], -1)).to.equal('d')
        expect(text.TEXTAFTER('abcd', [['cd', 'd']], -1)).to.equal('')
        expect(text.TEXTAFTER('abcd', [['bc', 'cd']], -1)).to.equal('')
        expect(text.TEXTAFTER('abcd', [['c', 'bc']], -1)).to.equal('d')
        expect(text.TEXTAFTER('a,b', [['', ',']])).to.equal('a,b')
      })

      it('with an array of delimiters and match_mode = 1', () => {
        expect(text.TEXTAFTER('aXbYc', [['x', 'y']], 2, 1)).to.equal('c')
      })

      it('with an array of delimiters => the shortest one sets the maximum instance_num', () => {
        expect(text.TEXTAFTER('abc', [['abcd', 'x']], 1)).to.eql(error.na)
        expect(text.TEXTAFTER('abc', [['x', 'yy']], 3)).to.eql(error.na)
        expect(text.TEXTAFTER('abc', [['x', 'yy']], 4)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', [[',', ';']], 4)).to.eql(error.value)
      })
    })

    describe('throws error', () => {
      it('#N/A when the delimiter is not found', () => {
        expect(text.TEXTAFTER('apple', ',')).to.eql(error.na)
        expect(text.TEXTAFTER('axb', '*')).to.eql(error.na)
        expect(text.TEXTAFTER('a' + String.fromCodePoint(160) + 'b', ' ')).to.eql(error.na)
      })

      it('#N/A when instance_num exceeds the number of occurrences', () => {
        expect(text.TEXTAFTER('apple,banana', ',', 5)).to.eql(error.na)
        expect(text.TEXTAFTER('apple,banana,cherry', 'banana', 2)).to.eql(error.na)
        expect(text.TEXTAFTER('a,b,c', ',', -3)).to.eql(error.na)
        expect(text.TEXTAFTER('a,b', ',', -3)).to.eql(error.na)
        expect(text.TEXTAFTER('abc', ',', 3)).to.eql(error.na)
        expect(text.TEXTAFTER('abc', ',', -3)).to.eql(error.na)
        expect(text.TEXTAFTER('a,b', ',', 3)).to.eql(error.na)
        expect(text.TEXTAFTER('a,b', ',', 2, 0, 0)).to.eql(error.na)
      })

      it('#N/A when the delimiter is longer than the text and instance_num is omitted', () => {
        expect(text.TEXTAFTER('abc', 'abcd')).to.eql(error.na)
        expect(text.TEXTAFTER('abc', 'abcd', undefined, undefined, 1)).to.eql(error.na)
        expect(text.TEXTAFTER('abc', 'abcd', undefined, 1)).to.eql(error.na)
      })

      it('#VALUE! when instance_num is 0 or rounds down to 0', () => {
        expect(text.TEXTAFTER('apple,banana,cherry', ',', 0)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b,c', ',', 0.5)).to.eql(error.value)
        expect(text.TEXTAFTER('', '', 0)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b,c', ',', 0.99999)).to.eql(error.value)
      })

      it('#VALUE! when instance_num is not a number', () => {
        expect(text.TEXTAFTER('a,b,c', ',', 'x')).to.eql(error.value)
        expect(text.TEXTAFTER('a,b,c', ',', null)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', '')).to.eql(error.value)
        expect(text.TEXTAFTER('a,b,c', ',', false)).to.eql(error.value)
      })

      it('#VALUE! when instance_num exceeds the length of the text', () => {
        expect(text.TEXTAFTER('a,b', ',', 4)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', -4)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b,c', ',', 1e10)).to.eql(error.value)
        expect(text.TEXTAFTER('abc', ',', 4)).to.eql(error.value)
        expect(text.TEXTAFTER('abc', ',', -4)).to.eql(error.value)
        expect(text.TEXTAFTER('abc', ',', 4, 0, 1)).to.eql(error.value)
        expect(text.TEXTAFTER('😀', ',', 3)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', 4.1)).to.eql(error.value)
      })

      it('#VALUE! when instance_num is given and the delimiter is longer than the text', () => {
        expect(text.TEXTAFTER('abc', 'abcd', 1)).to.eql(error.value)
        expect(text.TEXTAFTER('abc', 'abcd', -1)).to.eql(error.value)
        expect(text.TEXTAFTER('abc', 'abcd', 1, 0, 0, 'nf')).to.eql(error.value)
        expect(text.TEXTAFTER('ab', 'abc', 1)).to.eql(error.value)
        expect(text.TEXTAFTER('abc', 'abd', 2)).to.eql(error.value)
        expect(text.TEXTAFTER('ab', 'xyz', 2)).to.eql(error.value)
        expect(text.TEXTAFTER('ab', 'xyz', 3)).to.eql(error.value)
      })

      it('#VALUE! when instance_num is given and the text is empty', () => {
        expect(text.TEXTAFTER('', ',', 1)).to.eql(error.value)
        expect(text.TEXTAFTER('', ',', 2)).to.eql(error.value)
        expect(text.TEXTAFTER('', ',', -1)).to.eql(error.value)
        expect(text.TEXTAFTER('', ',', 0)).to.eql(error.value)
        expect(text.TEXTAFTER('', ',', 1, 0, 0)).to.eql(error.value)
        expect(text.TEXTAFTER('', ',', -1, 0, 1)).to.eql(error.value)
        expect(text.TEXTAFTER('', ',', 1, 0, 1, 'nf')).to.eql(error.value)
      })

      it('#VALUE! when match_mode is not 0 or 1', () => {
        expect(text.TEXTAFTER('a,b,c', ',', 1, 2)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b,c', ',', 1, -1)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b,c', ',', 1, 'x')).to.eql(error.value)
        expect(text.TEXTAFTER('Ab', 'B', 1, 2.5)).to.eql(error.value)
        expect(text.TEXTAFTER('Ab', 'B', 1, '')).to.eql(error.value)
        expect(text.TEXTAFTER('abc', '', 1, 5)).to.eql(error.value)
      })

      it('#VALUE! when match_end is not 0 or 1', () => {
        expect(text.TEXTAFTER('a,b,c', ',', 1, 0, 2)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b,c', ',', 1, 0, -1)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', 2, 0, 'x')).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', 2, 0, 2.5)).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', 2, 0, '')).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', 2, 0, -1)).to.eql(error.value)
        expect(text.TEXTAFTER('abc', '', 1, 0, 5)).to.eql(error.value)
      })

      it('#VALUE! when an argument is invalid, even if if_not_found is given', () => {
        expect(text.TEXTAFTER('a,b', ',', 5, undefined, undefined, 'nf')).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', 0, undefined, undefined, 'nf')).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', 1, 2, undefined, 'nf')).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', 1, 0, 2, 'nf')).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', -5, undefined, undefined, 'nf')).to.eql(error.value)
        expect(text.TEXTAFTER('a,b', ',', 0, 0, 0, error.div0)).to.eql(error.value)
      })

      it('#VALUE! when the text is empty and match_mode is invalid', () => {
        expect(text.TEXTAFTER('', ',', 1, 5)).to.eql(error.value)
        expect(text.TEXTAFTER('', '', 1, 5)).to.eql(error.value)
        expect(text.TEXTAFTER('', ',', undefined, 5)).to.eql(error.value)
      })

      it('the error of the first invalid argument when text is an error', () => {
        expect(text.TEXTAFTER(error.div0, ',')).to.eql(error.div0)
        expect(text.TEXTAFTER(error.div0, ',', 0)).to.eql(error.div0)
        expect(text.TEXTAFTER(error.na, ',', 0)).to.eql(error.na)
        expect(text.TEXTAFTER(error.div0, ',', 1, 5)).to.eql(error.div0)
        expect(text.TEXTAFTER(error.value, ',')).to.eql(error.value)
        expect(text.TEXTAFTER(error.na, ',', undefined, undefined, undefined, 'nf')).to.eql(error.na)
      })

      it('the error of the first invalid argument when another argument is an error', () => {
        expect(text.TEXTAFTER('a,b', error.div0)).to.eql(error.div0)
        expect(text.TEXTAFTER('a,b', ',', error.div0)).to.eql(error.div0)
        expect(text.TEXTAFTER('a,b', ',', 1, error.div0)).to.eql(error.div0)
        expect(text.TEXTAFTER('a,b', ',', 1, 0, error.div0)).to.eql(error.div0)
        expect(text.TEXTAFTER('a,b', error.na, undefined, undefined, undefined, 'nf')).to.eql(error.na)
        expect(text.TEXTAFTER('a,b', ',', error.div0, 5)).to.eql(error.div0)
        expect(text.TEXTAFTER('a,b', ',', 9, 0, error.div0)).to.eql(error.div0)
      })

      it('the error of the first invalid argument when several arguments are errors => the first one wins', () => {
        expect(text.TEXTAFTER(error.div0, error.na)).to.eql(error.div0)
        expect(text.TEXTAFTER(error.na, ',', error.div0)).to.eql(error.na)
        expect(text.TEXTAFTER('a,b', ',', 0, error.div0)).to.eql(error.div0)
        expect(text.TEXTAFTER('a,b', ',', 1, error.div0, error.na)).to.eql(error.div0)
        expect(text.TEXTAFTER('a,b', error.div0, error.na)).to.eql(error.div0)
      })
    })
  })
})

describe('TEXTBEFORE', () => {
  describe('args: (text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])', () => {
    describe('should return the text before the delimiter.', () => {
      it('examples from Microsoft docs', () => {
        expect(text.TEXTBEFORE("Red riding hood's, red hood", 'hood')).to.equal('Red riding ')
        expect(text.TEXTBEFORE("Red riding hood's, red hood", '')).to.equal('')
        expect(text.TEXTBEFORE("Red riding hood's, red hood", '', -1)).to.equal("Red riding hood's, red hood")
        expect(text.TEXTBEFORE("Little Red Riding Hood's red hood", 'Red')).to.equal('Little ')
        expect(text.TEXTBEFORE("Little red Riding Hood's red hood", 'Red')).to.eql(error.na)
        expect(text.TEXTBEFORE("Little red Riding Hood's red hood", 'red', 2)).to.equal("Little red Riding Hood's ")
        expect(text.TEXTBEFORE('Marcus Aurelius', ' ', undefined, undefined, 1)).to.equal('Marcus')
        expect(text.TEXTBEFORE('Socrates', ' ', undefined, undefined, 1)).to.equal('Socrates')
      })

      it('with only the required args => first instance, case-sensitive', () => {
        expect(text.TEXTBEFORE('apple,banana,cherry', ',')).to.equal('apple')
        expect(text.TEXTBEFORE('apple,banana,cherry', ',', 1)).to.equal('apple')
      })

      it('with instance_num > 0 => counts from the start of the text', () => {
        expect(text.TEXTBEFORE('apple,banana,cherry', ',', 2)).to.equal('apple,banana')
        expect(text.TEXTBEFORE('a,,b', ',', 2)).to.equal('a,')
      })

      it('with instance_num < 0 => counts from the end of the text', () => {
        expect(text.TEXTBEFORE('apple,banana,cherry', ',', -1)).to.equal('apple,banana')
        expect(text.TEXTBEFORE('apple,banana,cherry', ',', -2)).to.equal('apple')
        expect(text.TEXTBEFORE('a,b,c', ',', -2)).to.equal('a')
        expect(text.TEXTBEFORE('a,b,c', ',', -1, 0, 1)).to.equal('a,b')
      })

      it('with a decimal instance_num => rounded down', () => {
        expect(text.TEXTBEFORE('a,b,c', ',', 1.9)).to.equal('a')
        expect(text.TEXTBEFORE('a,b,c', ',', -1.9)).to.equal('a')
        expect(text.TEXTBEFORE('a,b,c,d', ',', -2.5)).to.equal('a')
        expect(text.TEXTBEFORE('a,b,c,d,e', ',', -0.5)).to.equal('a,b,c,d')
        expect(text.TEXTBEFORE('a,b,c,d,e', ',', -2.5)).to.equal('a,b')
        expect(text.TEXTBEFORE('a,b,c,d,e', ',', 1.5)).to.equal('a')
        expect(text.TEXTBEFORE('a,b,c,d,e', ',', 2.5)).to.equal('a,b')
        expect(text.TEXTBEFORE('a,b', ',', 3.9)).to.eql(error.na)
      })

      it('with a numeric text or a boolean instance_num => converted to a number', () => {
        expect(text.TEXTBEFORE('a,b,c', ',', '2')).to.equal('a,b')
        expect(text.TEXTBEFORE('a,b,c', ',', true)).to.equal('a')
        expect(text.TEXTBEFORE('a,b,c', ',', '-1')).to.equal('a,b')
        expect(text.TEXTBEFORE('a,b,c', ',', ' 2 ')).to.equal('a,b')
      })

      it('with overlapping delimiters => matches do not overlap', () => {
        expect(text.TEXTBEFORE('aaaa', 'aa', 2)).to.equal('aa')
        expect(text.TEXTBEFORE('aaaa', 'aa', 3)).to.eql(error.na)
        expect(text.TEXTBEFORE('aaaa', 'aa', -1)).to.equal('aa')
        expect(text.TEXTBEFORE('aaa', 'aa', 1)).to.equal('')
        expect(text.TEXTBEFORE('aaa', 'aa', -1)).to.equal('a')
        expect(text.TEXTBEFORE('aaa', 'aa', 2)).to.eql(error.na)
        expect(text.TEXTBEFORE('aaa', 'aa', -2)).to.eql(error.na)
        expect(text.TEXTBEFORE('ababa', 'aba', 2)).to.eql(error.na)
        expect(text.TEXTBEFORE('ababa', 'aba', -2)).to.eql(error.na)
        expect(text.TEXTBEFORE('ababa', 'aba', -1)).to.equal('ab')
      })

      it('with a delimiter equal to the whole text', () => {
        expect(text.TEXTBEFORE('abc', 'abc')).to.equal('')
        expect(text.TEXTBEFORE('abc', 'abc', -1)).to.equal('')
      })

      it('with a delimiter at the start or at the end of the text', () => {
        expect(text.TEXTBEFORE(',a', ',')).to.equal('')
        expect(text.TEXTBEFORE('a,', ',')).to.equal('a')
        expect(text.TEXTBEFORE(',', ',')).to.equal('')
      })

      it('with a multi-character delimiter', () => {
        expect(text.TEXTBEFORE('a::b::c', '::')).to.equal('a')
        expect(text.TEXTBEFORE('a  b', ' ')).to.equal('a')
        expect(text.TEXTBEFORE('a , b', ' , ')).to.equal('a')
      })
    })

    describe('should handle special characters and types.', () => {
      it('with wildcards, tilde and regex characters => taken literally', () => {
        expect(text.TEXTBEFORE('a*b', '*')).to.equal('a')
        expect(text.TEXTBEFORE('a?b', '?')).to.equal('a')
        expect(text.TEXTBEFORE('a~b', '~')).to.equal('a')
        expect(text.TEXTBEFORE('axb', '*')).to.eql(error.na)
        expect(text.TEXTBEFORE('a.b', '.')).to.equal('a')
        expect(text.TEXTBEFORE('a(+)b', '(+)')).to.equal('a')
      })

      it('with a newline delimiter', () => {
        expect(text.TEXTBEFORE('a' + '\n' + 'b', '\n')).to.equal('a')
      })

      it('with an emoji delimiter (UTF-16 surrogate pair)', () => {
        expect(text.TEXTBEFORE('a😀b😀c', '😀', 2)).to.equal('a😀b')
        expect(text.TEXTBEFORE('😀ab', '😀')).to.equal('')
      })

      it('with a non-breaking space => not equal to a space', () => {
        expect(text.TEXTBEFORE('a' + String.fromCodePoint(160) + 'b', ' ')).to.eql(error.na)
      })

      it('with an accented letter => not equal to its decomposed form', () => {
        expect(text.TEXTBEFORE('e' + String.fromCodePoint(769) + 'x', 'é')).to.eql(error.na)
      })

      it('with numbers as text and delimiter => converted to text', () => {
        expect(text.TEXTBEFORE(12345, 3)).to.equal('12')
        expect(text.TEXTBEFORE('a1b', 1)).to.equal('a')
        expect(text.TEXTBEFORE('a0b', '0')).to.equal('a')
        expect(text.TEXTBEFORE('a0b', 0)).to.equal('a')
        expect(text.TEXTBEFORE(0, '0')).to.equal('')
        expect(text.TEXTBEFORE(10, '0')).to.equal('1')
        expect(text.TEXTBEFORE(1e21, 'E')).to.equal('1')
      })
    })

    describe('should handle match_mode.', () => {
      it('with match_mode = 0 => case-sensitive', () => {
        expect(text.TEXTBEFORE('Apple,banana,cherry', ',', 1, 0)).to.equal('Apple')
        expect(text.TEXTBEFORE('apple Banana cherry', 'BANANA', 1, 0)).to.eql(error.na)
        expect(text.TEXTBEFORE('Éa,b', 'é', 1, 0)).to.eql(error.na)
        expect(text.TEXTBEFORE('ab', 'xyz', 2)).to.eql(error.value)
        expect(text.TEXTBEFORE('Ab', 'B', 1, 0.5)).to.eql(error.na)
        expect(text.TEXTBEFORE('Ab', 'B', 1, -0.5)).to.eql(error.na)
        expect(text.TEXTBEFORE('Ab', 'B', 1, -0.9)).to.eql(error.na)
        expect(text.TEXTBEFORE('Ab', 'B', 1, false)).to.eql(error.na)
        expect(text.TEXTBEFORE('Ab', 'B', 1, null)).to.eql(error.na)
      })

      it('with match_mode = 1 => case-insensitive', () => {
        expect(text.TEXTBEFORE('apple Banana cherry', 'BANANA', 1, 1)).to.equal('apple ')
        expect(text.TEXTBEFORE('Éa,b', 'é', 1, 1)).to.equal('')
        expect(text.TEXTBEFORE('xABxabx', 'AB', -1, 1)).to.equal('xABx')
        expect(text.TEXTBEFORE('abc', 'B', 1, 1)).to.equal('a')
        expect(text.TEXTBEFORE('аБв', 'б', 1, 1)).to.equal('а')
        expect(text.TEXTBEFORE('aİb', 'i̇', 1, 1)).to.eql(error.na)
        expect(text.TEXTBEFORE('aßb', 'SS', 1, 1)).to.eql(error.na)
        expect(text.TEXTBEFORE('aΣb', 'ς', 1, 1)).to.eql(error.na)
      })

      it('with a numeric text, a boolean or a decimal match_mode => converted then truncated', () => {
        expect(text.TEXTBEFORE('Ab', 'B', 1, '1')).to.equal('A')
        expect(text.TEXTBEFORE('Ab', 'B', 1, true)).to.equal('A')
        expect(text.TEXTBEFORE('Ab', 'B', 1, 1.5)).to.equal('A')
        expect(text.TEXTBEFORE('Ab', 'B', 1, 1.9)).to.equal('A')
      })
    })

    describe('should handle match_end.', () => {
      it('with match_end = 1 => the end of the text counts as a delimiter', () => {
        expect(text.TEXTBEFORE('apple,banana,cherry', 'cherry', 1, 0, 1)).to.equal('apple,banana,')
        expect(text.TEXTBEFORE('Marcus Aurelius', ' ', 1, 0, 1)).to.equal('Marcus')
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, 1)).to.equal('a,b')
        expect(text.TEXTBEFORE('abc', ',', 1, 0, 1)).to.equal('abc')
        expect(text.TEXTBEFORE('abc', ',', -1, 0, 1)).to.equal('')
        expect(text.TEXTBEFORE('a,B,c', 'b', 1, 1, 1)).to.equal('a,')
        expect(text.TEXTBEFORE('abc', 'X', 1, 1, 1)).to.equal('abc')
      })

      it('with match_end = 1 and a negative instance_num => the start of the text counts as a delimiter', () => {
        expect(text.TEXTBEFORE('a,b,c', ',', -3, 0, 1)).to.equal('')
        expect(text.TEXTBEFORE('abc', ',', -1, 0, 1)).to.equal('')
        expect(text.TEXTBEFORE(',a', ',', -2, 0, 1)).to.equal('')
        expect(text.TEXTBEFORE(',a', ',', -1, 0, 1)).to.equal('')
        expect(text.TEXTBEFORE('a,b,', ',', -1, 0, 1)).to.equal('a,b')
      })

      it('with match_end = 1 => it stands for one more delimiter only', () => {
        expect(text.TEXTBEFORE('a,b', ',', 3, 0, 1)).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b,c', ',', -4, 0, 1)).to.eql(error.na)
        expect(text.TEXTBEFORE('abc', ',', 2, 0, 1)).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b,', ',', 3, 0, 1)).to.equal('a,b,')
        expect(text.TEXTBEFORE('a,b,', ',', 4, 0, 1)).to.eql(error.na)
      })

      it('with match_end = 0 => the end of the text is not a delimiter', () => {
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, 0)).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b,c', ',', -3, 0, 0)).to.eql(error.na)
      })

      it('with a boolean, a numeric text or a decimal match_end => converted then truncated', () => {
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, true)).to.equal('a,b')
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, '1')).to.equal('a,b')
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, 1.5)).to.equal('a,b')
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, 0.9)).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, false)).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, null)).to.eql(error.na)
      })
    })

    describe('should handle if_not_found.', () => {
      it('with the delimiter not found => returns if_not_found as text', () => {
        expect(text.TEXTBEFORE('abc', ',', undefined, undefined, undefined, 'nf')).to.equal('nf')
        expect(text.TEXTBEFORE('abc', ',', undefined, undefined, undefined, '')).to.equal('')
        expect(text.TEXTBEFORE('abc', ',', undefined, undefined, undefined, 0)).to.equal('0')
        expect(text.TEXTBEFORE('abc', ',', undefined, undefined, undefined, null)).to.equal('')
        expect(text.TEXTBEFORE('', ',', undefined, undefined, undefined, 'nf')).to.equal('nf')
        expect(text.TEXTBEFORE('abc', ',', 3, 0, 0, 'nf')).to.equal('nf')
      })

      it('with the delimiter found => ignores if_not_found', () => {
        expect(text.TEXTBEFORE('a,b', ',', undefined, undefined, undefined, 'nf')).to.equal('a')
        expect(text.TEXTBEFORE('a,b', ',', undefined, undefined, undefined, error.div0)).to.equal('a')
      })

      it('with an omitted if_not_found => #N/A', () => {
        expect(text.TEXTBEFORE('abc', ',', undefined, undefined, undefined, undefined)).to.eql(error.na)
      })

      it('with an error as if_not_found => returns it when the delimiter is not found', () => {
        expect(text.TEXTBEFORE('abc', ',', undefined, undefined, undefined, error.div0)).to.eql(error.div0)
        expect(text.TEXTBEFORE('abc', ',', 1, 0, 0, error.na)).to.eql(error.na)
      })
    })

    describe('should handle an empty delimiter.', () => {
      it('with a positive instance_num => the delimiter matches at the start of the text', () => {
        expect(text.TEXTBEFORE('apple,banana,cherry', '')).to.equal('')
        expect(text.TEXTBEFORE('abc', '', 2)).to.equal('')
        expect(text.TEXTBEFORE('abc', '', 3)).to.equal('')
        expect(text.TEXTBEFORE('abc', '', 4)).to.equal('')
        expect(text.TEXTBEFORE('abc', '', 5)).to.equal('')
        expect(text.TEXTBEFORE('abc', '', 100)).to.equal('')
        expect(text.TEXTBEFORE('abc', '', 1e10)).to.equal('')
      })

      it('with a negative instance_num => the delimiter matches at the end of the text', () => {
        expect(text.TEXTBEFORE('apple,banana,cherry', '', -1)).to.equal('apple,banana,cherry')
        expect(text.TEXTBEFORE('abc', '', -2)).to.equal('abc')
        expect(text.TEXTBEFORE('abc', '', -4)).to.equal('abc')
        expect(text.TEXTBEFORE('abc', '', -100)).to.equal('abc')
      })

      it('with match_end = 1', () => {
        expect(text.TEXTBEFORE('abc', '', 1, 0, 1)).to.equal('')
        expect(text.TEXTBEFORE('abc', '', -1, 0, 1)).to.equal('abc')
      })

      it('with an empty cell as delimiter', () => {
        expect(text.TEXTBEFORE('a,b', null)).to.equal('')
      })

      it('with an empty text', () => {
        expect(text.TEXTBEFORE('', '')).to.equal('')
        expect(text.TEXTBEFORE('', '', -1)).to.equal('')
        expect(text.TEXTBEFORE('', '', 2)).to.equal('')
        expect(text.TEXTBEFORE(null, null)).to.equal('')
      })
    })

    describe('should handle an empty text.', () => {
      it('with a delimiter => not found', () => {
        expect(text.TEXTBEFORE('', ',')).to.eql(error.na)
        expect(text.TEXTBEFORE(null, ',')).to.eql(error.na)
        expect(text.TEXTBEFORE('', ',', undefined, undefined, undefined, 'nf')).to.equal('nf')
        expect(text.TEXTBEFORE('', ',', undefined, undefined, 1)).to.eql(error.na)
        expect(text.TEXTBEFORE('', ',', undefined, undefined, 1, 'nf')).to.equal('nf')
        expect(text.TEXTBEFORE('', ',', undefined, 1)).to.eql(error.na)
      })
    })

    describe('should handle several delimiters.', () => {
      it('with an array of delimiters => the first match of any delimiter is used', () => {
        expect(text.TEXTBEFORE('a,b;c', [[',', ';']])).to.equal('a')
        expect(text.TEXTBEFORE('a,b;c', [[',', ';']], 2)).to.equal('a,b')
        expect(text.TEXTBEFORE('a,b;c', [[',', ';']], -1)).to.equal('a,b')
        expect(text.TEXTBEFORE('a,b;c', [[';', ',']])).to.equal('a')
        expect(text.TEXTBEFORE('abc', [[',', ';']])).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b', [[',']], 2, 0, 1)).to.equal('a,b')
        expect(text.TEXTBEFORE('a,b;c', [[','], [';']])).to.equal('a')
        expect(text.TEXTBEFORE('abcbcd', [['b', 'bc']], 2)).to.equal('abc')
        expect(text.TEXTBEFORE('abcbcd', [['b', 'bc']], -2)).to.equal('a')
      })

      it('with an array of delimiters => the longest one wins when several match at the same position', () => {
        expect(text.TEXTBEFORE('abcd', [['bc', 'b']])).to.equal('a')
        expect(text.TEXTBEFORE('abcd', [['b', 'bc']])).to.equal('a')
        expect(text.TEXTBEFORE('aBCd', [['b', 'bc']], 1, 1)).to.equal('a')
        expect(text.TEXTBEFORE('abcd', [['b', 'bc']], -1)).to.equal('a')
        expect(text.TEXTBEFORE('abcd', [['cd', 'd']], -1)).to.equal('abc')
        expect(text.TEXTBEFORE('abcd', [['bc', 'cd']], -1)).to.equal('ab')
        expect(text.TEXTBEFORE('abcd', [['c', 'bc']], -1)).to.equal('ab')
        expect(text.TEXTBEFORE('a,b', [['', ',']])).to.equal('')
      })

      it('with an array of delimiters and match_mode = 1', () => {
        expect(text.TEXTBEFORE('aXbYc', [['x', 'y']], 2, 1)).to.equal('aXb')
      })

      it('with an array of delimiters => the shortest one sets the maximum instance_num', () => {
        expect(text.TEXTBEFORE('abc', [['abcd', 'x']], 1)).to.eql(error.na)
        expect(text.TEXTBEFORE('abc', [['x', 'yy']], 3)).to.eql(error.na)
        expect(text.TEXTBEFORE('abc', [['x', 'yy']], 4)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', [[',', ';']], 4)).to.eql(error.value)
      })
    })

    describe('throws error', () => {
      it('#N/A when the delimiter is not found', () => {
        expect(text.TEXTBEFORE('apple', ',')).to.eql(error.na)
        expect(text.TEXTBEFORE('axb', '*')).to.eql(error.na)
        expect(text.TEXTBEFORE('a' + String.fromCodePoint(160) + 'b', ' ')).to.eql(error.na)
      })

      it('#N/A when instance_num exceeds the number of occurrences', () => {
        expect(text.TEXTBEFORE('apple,banana', ',', 5)).to.eql(error.na)
        expect(text.TEXTBEFORE('apple,banana,cherry', 'banana', 2)).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b,c', ',', -3)).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b', ',', -3)).to.eql(error.na)
        expect(text.TEXTBEFORE('abc', ',', 3)).to.eql(error.na)
        expect(text.TEXTBEFORE('abc', ',', -3)).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b', ',', 3)).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, 0)).to.eql(error.na)
      })

      it('#N/A when the delimiter is longer than the text and instance_num is omitted', () => {
        expect(text.TEXTBEFORE('abc', 'abcd')).to.eql(error.na)
        expect(text.TEXTBEFORE('abc', 'abcd', undefined, undefined, 1)).to.eql(error.na)
        expect(text.TEXTBEFORE('abc', 'abcd', undefined, 1)).to.eql(error.na)
      })

      it('#VALUE! when instance_num is 0 or rounds down to 0', () => {
        expect(text.TEXTBEFORE('apple,banana,cherry', ',', 0)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b,c', ',', 0.5)).to.eql(error.value)
        expect(text.TEXTBEFORE('', '', 0)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b,c', ',', 0.99999)).to.eql(error.value)
      })

      it('#VALUE! when instance_num is not a number', () => {
        expect(text.TEXTBEFORE('a,b,c', ',', 'x')).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b,c', ',', null)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', '')).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b,c', ',', false)).to.eql(error.value)
      })

      it('#VALUE! when instance_num exceeds the length of the text', () => {
        expect(text.TEXTBEFORE('a,b', ',', 4)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', -4)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b,c', ',', 1e10)).to.eql(error.value)
        expect(text.TEXTBEFORE('abc', ',', 4)).to.eql(error.value)
        expect(text.TEXTBEFORE('abc', ',', -4)).to.eql(error.value)
        expect(text.TEXTBEFORE('abc', ',', 4, 0, 1)).to.eql(error.value)
        expect(text.TEXTBEFORE('😀', ',', 3)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', 4.1)).to.eql(error.value)
      })

      it('#VALUE! when instance_num is given and the delimiter is longer than the text', () => {
        expect(text.TEXTBEFORE('abc', 'abcd', 1)).to.eql(error.value)
        expect(text.TEXTBEFORE('abc', 'abcd', -1)).to.eql(error.value)
        expect(text.TEXTBEFORE('abc', 'abcd', 1, 0, 0, 'nf')).to.eql(error.value)
        expect(text.TEXTBEFORE('ab', 'abc', 1)).to.eql(error.value)
        expect(text.TEXTBEFORE('abc', 'abd', 2)).to.eql(error.value)
        expect(text.TEXTBEFORE('ab', 'xyz', 2)).to.eql(error.value)
        expect(text.TEXTBEFORE('ab', 'xyz', 3)).to.eql(error.value)
      })

      it('#VALUE! when instance_num is given and the text is empty', () => {
        expect(text.TEXTBEFORE('', ',', 1)).to.eql(error.value)
        expect(text.TEXTBEFORE('', ',', 2)).to.eql(error.value)
        expect(text.TEXTBEFORE('', ',', -1)).to.eql(error.value)
        expect(text.TEXTBEFORE('', ',', 0)).to.eql(error.value)
        expect(text.TEXTBEFORE('', ',', 1, 0, 0)).to.eql(error.value)
        expect(text.TEXTBEFORE('', ',', -1, 0, 1)).to.eql(error.value)
        expect(text.TEXTBEFORE('', ',', 1, 0, 1, 'nf')).to.eql(error.value)
      })

      it('#VALUE! when match_mode is not 0 or 1', () => {
        expect(text.TEXTBEFORE('a,b,c', ',', 1, 2)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b,c', ',', 1, -1)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b,c', ',', 1, 'x')).to.eql(error.value)
        expect(text.TEXTBEFORE('Ab', 'B', 1, 2.5)).to.eql(error.value)
        expect(text.TEXTBEFORE('Ab', 'B', 1, '')).to.eql(error.value)
        expect(text.TEXTBEFORE('abc', '', 1, 5)).to.eql(error.value)
      })

      it('#VALUE! when match_end is not 0 or 1', () => {
        expect(text.TEXTBEFORE('a,b,c', ',', 1, 0, 2)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b,c', ',', 1, 0, -1)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, 'x')).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, 2.5)).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, '')).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', 2, 0, -1)).to.eql(error.value)
        expect(text.TEXTBEFORE('abc', '', 1, 0, 5)).to.eql(error.value)
      })

      it('#VALUE! when an argument is invalid, even if if_not_found is given', () => {
        expect(text.TEXTBEFORE('a,b', ',', 5, undefined, undefined, 'nf')).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', 0, undefined, undefined, 'nf')).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', 1, 2, undefined, 'nf')).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', 1, 0, 2, 'nf')).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', -5, undefined, undefined, 'nf')).to.eql(error.value)
        expect(text.TEXTBEFORE('a,b', ',', 0, 0, 0, error.div0)).to.eql(error.value)
      })

      it('#VALUE! when the text is empty and match_mode is invalid', () => {
        expect(text.TEXTBEFORE('', ',', 1, 5)).to.eql(error.value)
        expect(text.TEXTBEFORE('', '', 1, 5)).to.eql(error.value)
        expect(text.TEXTBEFORE('', ',', undefined, 5)).to.eql(error.value)
      })

      it('the error of the first invalid argument when text is an error', () => {
        expect(text.TEXTBEFORE(error.div0, ',')).to.eql(error.div0)
        expect(text.TEXTBEFORE(error.div0, ',', 0)).to.eql(error.div0)
        expect(text.TEXTBEFORE(error.na, ',', 0)).to.eql(error.na)
        expect(text.TEXTBEFORE(error.div0, ',', 1, 5)).to.eql(error.div0)
        expect(text.TEXTBEFORE(error.value, ',')).to.eql(error.value)
        expect(text.TEXTBEFORE(error.na, ',', undefined, undefined, undefined, 'nf')).to.eql(error.na)
      })

      it('the error of the first invalid argument when another argument is an error', () => {
        expect(text.TEXTBEFORE('a,b', error.div0)).to.eql(error.div0)
        expect(text.TEXTBEFORE('a,b', ',', error.div0)).to.eql(error.div0)
        expect(text.TEXTBEFORE('a,b', ',', 1, error.div0)).to.eql(error.div0)
        expect(text.TEXTBEFORE('a,b', ',', 1, 0, error.div0)).to.eql(error.div0)
        expect(text.TEXTBEFORE('a,b', error.na, undefined, undefined, undefined, 'nf')).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b', ',', error.div0, 5)).to.eql(error.div0)
        expect(text.TEXTBEFORE('a,b', ',', 9, 0, error.div0)).to.eql(error.div0)
      })

      it('the error of the first invalid argument when several arguments are errors => the first one wins', () => {
        expect(text.TEXTBEFORE(error.div0, error.na)).to.eql(error.div0)
        expect(text.TEXTBEFORE(error.na, ',', error.div0)).to.eql(error.na)
        expect(text.TEXTBEFORE('a,b', ',', 0, error.div0)).to.eql(error.div0)
        expect(text.TEXTBEFORE('a,b', ',', 1, error.div0, error.na)).to.eql(error.div0)
        expect(text.TEXTBEFORE('a,b', error.div0, error.na)).to.eql(error.div0)
      })
    })
  })
})
