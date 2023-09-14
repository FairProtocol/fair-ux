import React from 'react'

import './Avalanche.scss'

export const Avalanche: React.FC<{ className?: string }> = (props) => (
  <svg
    className={`avalanche ${props.className}`}
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.344 3.697H4.516v13.486h14.828V3.697z" fill="#fff"></path>
    <path
      clipRule="evenodd"
      d="M24 12c0 6.628-5.372 12-12 12-6.627 0-12-5.372-12-12C0 5.373 5.373 0 12 0c6.628 0 12 5.373 12 12zM8.6 16.775H6.27c-.489 0-.73 0-.878-.094a.592.592 0 01-.268-.463c-.009-.174.112-.386.354-.81l5.75-10.136c.245-.43.368-.646.525-.725a.593.593 0 01.536 0c.156.08.28.295.525.725l1.182 2.063.006.011c.264.462.398.696.457.942.065.268.065.55 0 .82-.06.247-.192.483-.46.951l-3.02 5.34-.008.013c-.266.466-.401.702-.588.88a1.759 1.759 0 01-.716.416c-.245.067-.52.067-1.067.067zm5.88 0h3.338c.492 0 .74 0 .887-.097a.59.59 0 00.268-.466c.009-.168-.11-.372-.341-.772l-.024-.041-1.672-2.86-.019-.032c-.235-.397-.353-.598-.505-.675a.587.587 0 00-.534 0c-.153.08-.277.289-.522.71l-1.665 2.86-.006.01c-.244.42-.366.63-.357.803a.597.597 0 00.268.466c.145.094.392.094.885.094z"
      fill="#E84142"
      fillRule="evenodd"
    />
  </svg>
)
