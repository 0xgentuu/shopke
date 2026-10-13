import "./OTPField.css";
import { useState, useEffect, useRef } from "react";

export default function OTPField({ size = 6 }) {
  const [otp, setOtp] = useState(
    Array.from({ length: size }, (_, i) => i + 1).reduce((acc, digit) => {
      acc[`otp${digit}`] = "";
      return acc;
    }, {}),
  );
  const [currentField, setCurrentField] = useState()

  const otpContainerRef = useRef(null)

  useEffect(() => {
    const otpContainer = otpContainerRef.current
    console.log(otpContainer)
    if (!currentField) {
      otpContainer.querySelector('[name="otp1"]').focus()
    } else {
      const field = otpContainer.querySelector(`[name="${currentField}"]`)
      const cursor = field.value ? Number(currentField[3]) + 1 : Number(currentField[3]) - 1
      const nextOrPreviousField = otpContainer.querySelector(`[name="otp${cursor}"]`)
      if (nextOrPreviousField) nextOrPreviousField.focus()
    }
  }, [currentField])

  function handleOtpDigitChange(e) {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setOtp(prev => ({
      ...prev,
      [name]: value
    }))
    setCurrentField(name)
  }

  function handlePaste(e) {
    e.preventDefault()
    // const otp = e.clipboardData.getData('text/plain')
    // const fields = e.currentTarget.querySelectorAll('input')
    // for (let i = 0; i < fields.length; i++) {
    //   const field = fields[i]
    //   field.value = otp[i]
    // }
  }

  return (
    <div className="otp-field" onPaste={handlePaste} ref={otpContainerRef}>
      {Array.from({ length: size }, (_, i) => {
        const name = `otp${i + 1}`
        return (
          <input
            key={`field-${i + 1}`}
            name={name}
            value={otp[name]}
            type="number"
            min={0}
            max={9}
            required
            onInput={handleOtpDigitChange}
          />
        )
      })}
    </div>
  );
}
