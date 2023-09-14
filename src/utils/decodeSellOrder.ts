import { Fraction } from './entities/fractions/fraction'
import { TokenAmount } from './entities/fractions/tokenAmount'
import { Token } from './entities/token'
import { SellOrder } from '../state/types'

export function decodeSellOrder(
  orderBytes: string | undefined,
  soldToken: Token | undefined,
  boughtToken: Token | undefined,
): Maybe<SellOrder> {
  if (!orderBytes || !soldToken || !boughtToken) {
    return null
  }
  const sellAmount = new Fraction(BigInt('0x' + orderBytes.substring(43, 66)), '1')
  const buyAmount = new Fraction(BigInt('0x' + orderBytes.substring(19, 42)), '1')
  return {
    sellAmount: new TokenAmount(soldToken, sellAmount.toSignificant(6)),
    buyAmount: new TokenAmount(boughtToken, buyAmount.toSignificant(6)),
  }
}
