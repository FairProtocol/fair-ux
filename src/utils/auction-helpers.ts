export const getAuctionTitle = ({
  isFinished,
  isWorking,
  title,
  titleFinished,
  titleWorking,
}: {
  isFinished: boolean
  isWorking: boolean
  title?: string
  titleFinished?: string
  titleWorking?: string
}) => {
  if (isFinished) {
    return titleFinished
  } else if (isWorking) {
    return titleWorking
  }
  return title
}
