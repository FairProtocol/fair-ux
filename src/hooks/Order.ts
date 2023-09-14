export interface SellOrder {
  sellAmount: bigint
  buyAmount: bigint
}

export interface Order {
  sellAmount: bigint
  buyAmount: bigint
  userId: bigint
}

export interface RawOrder {
  sellAmount: string
  buyAmount: string
  userId: string
}

export function decodeOrder(bytes: string): Order {
  if (!bytes) {
    return {
      userId: BigInt(0),
      buyAmount: BigInt(0),
      sellAmount: BigInt(0),
    }
  }
  return {
    userId: BigInt('0x' + bytes.substring(2, 18)),
    buyAmount: BigInt('0x' + bytes.substring(19, 42)),
    sellAmount: BigInt('0x' + bytes.substring(43, 66)),
  }
}

export function encodeOrder(order: Order): string {
  return (
    '0x' +
    order.userId.toString(16).padStart(16, '0') +
    order.buyAmount.toString(16).padStart(24, '0') +
    order.sellAmount.toString(16).padStart(24, '0')
  )
}
