import { Typography } from '@mui/material'
import Image7 from 'src/assets/images/image7.png'
import Image2 from 'src/assets/images/image2.png'
import Image5 from 'src/assets/images/image1.png'
import Image4 from 'src/assets/images/image4.png'
import Image3 from 'src/assets/images/image3.png'
import Image6 from 'src/assets/images/image6.png'
import '../index.scss'

const UsingUI: React.FC = () => {
  return (
    <div>
        <Typography className="docs_details_category">
            Starting an Auction
        </Typography>
        <Typography className="docs_details_title">
            Using UI
        </Typography>
        <>
            <Typography className="docs_details_text">We highly recommend using the UI to launch auctions. To launch an auction:</Typography>
            <Typography className="docs_details_text one-spacing">1. Ensure your wallet is connected to the site. Click the Create Auction link in the website header. This will redirect you to the launch page</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image7}
            />
            </div>
            <Typography className="docs_details_text one-spacing">2. On the launch page, you will see all the subsections on the side of the page. Ensure the correct network is selected. If not, you can simply click on the network and change it accordingly.</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image2}
            />
            </div>
            <Typography className="docs_details_text one-spacing">3. Start filling in the sections of the form. Note that all sections, except Socials, Short Summary and Description, are required to launch an auction. However, it is highly recommended to fill all the sections for users/bidders to have the best chance to discover and know more about your token/project. If you are ever unsure, hover over the tooltip icons at the side of each input to understand what is required in each section.</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image5}
            />
            </div>
            <Typography className="docs_details_text one-spacing">4. Do note that if you are creating a Private Auction, you will need to toggle the Is Private Auction input. For a Private Auction, a signing address is required to whitelist any participating addresses in the specific auction. Once the auction is launched, you will be able to sign addresses on a separate page at this link below.</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image3}
            />
            </div>
            <Typography className="docs_details_text one-spacing">5. Once all the necessary details are entered, click on the  Create Auction button. This should open up a confirmation modal for you to confirm/make any changes. Once confirmed, click on Confirm Launch.</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image4}
            />
            </div>
            <Typography className="docs_details_text one-spacing">6. This should prompt your wallet to authorise your transaction. This will put the launch in a Pending state. Once the transaction has been authorised in your wallet, you should receive a success pop-up stating that the auction has been successfully launched. You can also view the deployed transaction on the relevant network scan site via the link in the pop-up.</Typography>
            <div className="docs_details_image_wrapper">
            <img
                className="docs_details_image"
                src={Image6}
            />
            </div>
            <Typography className="docs_details_text">Congratulations! You have successfully launched an auction on Fair Protocol.</Typography>
        </>
    </div>
  )
}

export default UsingUI
