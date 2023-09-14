import _Big from 'big.js'
import invariant from 'tiny-invariant'
// @ts-ignore
import toFormat from 'toformat'

import { Fraction } from './fraction'
import { SolidityType } from '../../../constants'
import { BigintIsh } from '../../../state/types'
import { parseBigintIsh, validateSolidityTypeInstance } from '../../tools'
import { Currency, ETHER } from '../currency'
import { currencyEquals } from '../token'

const Big = toFormat(_Big)

export class CurrencyAmount extends Fraction {
  public readonly currency: Currency

  /**
   * Helper that calls the constructor with the ETHER currency
   * @param amount ether amount in wei
   */
  public static ether(amount: BigintIsh): CurrencyAmount {
    return new CurrencyAmount(ETHER, amount)
  }

  // amount _must_ be raw, i.e. in the native representation
  protected constructor(currency: Currency, amount: BigintIsh) {
    const parsedAmount = parseBigintIsh(amount)
    validateSolidityTypeInstance(parsedAmount, SolidityType.uint256)

    super(parsedAmount, BigInt(10 ** currency.decimals))
    this.currency = currency
  }

  public get raw(): bigint {
    return this.numerator
  }

  public add(other: CurrencyAmount): CurrencyAmount {
    invariant(currencyEquals(this.currency, other.currency), 'TOKEN')
    return new CurrencyAmount(this.currency, this.raw + other.raw)
  }

  public subtract(other: CurrencyAmount): CurrencyAmount {
    invariant(currencyEquals(this.currency, other.currency), 'TOKEN')
    return new CurrencyAmount(this.currency, this.raw - other.raw)
  }

  public toSignificant(significantDigits = 6): string {
    return super.toSignificant(significantDigits)
  }

  public toFixed(decimalPlaces: number = this.currency.decimals): string {
    invariant(decimalPlaces <= this.currency.decimals, 'DECIMALS')
    return super.toFixed(decimalPlaces)
  }

  public toExact(format: object = { groupSeparator: '' }): string {
    Big.DP = this.currency.decimals
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(format)
  }
}
