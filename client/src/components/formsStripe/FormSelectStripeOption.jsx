import React from 'react';
//import { getPro, getProPlus } from '../../requests/stripeRequests.js'
import { Button, Label, Modal, Card } from 'flowbite-react';
import PropTypes from 'prop-types'

import { GlobalContext } from '../App.jsx';


const FormSelectStripeOption = (props) => {

  const { setShowStripeDrawer } = React.useContext(GlobalContext)
  const handleClose = props.handleClose

  const [selectedOption, setSelectedOption] = React.useState(null)

  // const emailRef = React.useRef(null) // Focus the Email Input Field on Render
  // React.useEffect(() => {
  //   emailRef.current.focus()
  // }, [])

  const handleSelect = (option) => {
    //console.log(option)
    setSelectedOption(option)
  }
  const handleSubmit = () => {
    setShowStripeDrawer({show: true, option: selectedOption})
    handleClose()
  }

  return (
    <div>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Select an Upgrade Option
          </h3>
          <form>
            <ul className="grid w-full gap-4 grid-cols-1 mb-4">
              <li>
                <input
                  type="radio"
                  id="Running-Router-Pro"
                  value="Running-Router-Pro"
                  name="upgrade"
                  className="hidden peer"
                  required
                  onClick={()=>handleSelect("Running-Router-Pro")}
                />
                <label
                  htmlFor="Running-Router-Pro"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Running Router Pro</div>
                    <div className="w-full">Increase saved route limit to 30, priority processing, and custom icons</div>
                    <div className="w-full">Only $1/year</div>
                  </div>
                  <svg
                    className="w-5 h-5 ms-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="Running-Router-Pro-Unlimited"
                  value="Running-Router-Pro-Unlimited"
                  name="upgrade"
                  className="hidden peer"
                  onClick={()=>handleSelect("Running-Router-Pro-Unlimited")}
                />
                <label
                  htmlFor="Running-Router-Pro-Unlimited"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                      Running Router Pro Unlimited
                    </div>
                    <div className="w-full">No limit on saved routes, top processing priority, custom icons, and social board and XP boost</div>
                    <div className="w-full">Only $5/year</div>
                  </div>
                  <svg
                    className="w-5 h-5 ms-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
            </ul>
            <Button onClick={handleSubmit} >
              Upgrade to Pro
            </Button>
          </form>
        </div>
      </Modal.Body>
    </div>
  );
};
FormSelectStripeOption.propTypes = {
  handleClose: PropTypes.func.isRequired,
}

export default FormSelectStripeOption;
