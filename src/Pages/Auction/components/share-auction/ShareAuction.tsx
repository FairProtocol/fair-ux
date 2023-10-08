import { useEffect, useState } from 'react'

import { Button, TextField, Typography } from '@mui/material'
import Facebook from 'src/assets/images/facebook_small.svg'
import Telegram from 'src/assets/images/telegram_small.svg'
import Twitter from 'src/assets/images/twitter_small.svg'

import Wrapper from '../wrapper/Wrapper'
import './ShareAuction.scss'

const ShareAuction: React.FC = () => {
  const [auctionUrl, setAuctionUrl] = useState('')
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    // setAuctionUrl(window.location.href.replace('#topAnchor', ''))
    setAuctionUrl(window.location.href)
    console.log('Old Auction URl- ', window.location.href.replace('#topAnchor', ''))
    console.log('New Auction URl- ', window.location.href)
    // Since '#' and '&' needs to be encoded
    setShareUrl(
      window.location.href.replace('#', '%23').replace('&', '%26').replace('#topAnchor', ''),
    )
  }, [])

  return (
    <Wrapper className="share-auction">
      <Typography className="share-auction_header">Share this Auction</Typography>
      <div className="share-auction_socials">
        <a
          className="share-auction_socials_image"
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          <img src={Facebook} />
        </a>
        <a
          className="share-auction_socials_other-image"
          href={`https://t.me/share/url?url=${shareUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          <img src={Telegram} />
        </a>
        <a
          className="share-auction_socials_other-image"
          href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          <img src={Twitter} />
        </a>
      </div>
      <Typography className="share-auction_header">or copy link</Typography>
      <TextField
        InputProps={{
          endAdornment: (
            <Button onClick={() => navigator.clipboard.writeText(auctionUrl)}>Copy</Button>
          ),
          readOnly: true,
          className: 'share-auction_copy',
        }}
        fullWidth
        value={auctionUrl}
      />
    </Wrapper>
  )
}

export default ShareAuction
