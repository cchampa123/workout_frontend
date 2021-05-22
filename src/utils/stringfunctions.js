import { buyin_number, buyout_number } from 'constants/section'

export function convertSuperSetToLetter(number) {
  if (number===buyin_number) {
    return "Buy In"
  } else if (number === buyout_number) {
    return "Buy Out"
  } else {
    return String.fromCharCode(number+63)
  }
}

export function convertToDurationString(hours, minutes, seconds) {
  let formatted_hours
  let formatted_minutes
  let formatted_seconds

  if (hours==='') {
    formatted_hours = '00'
  } else if (hours.length<2) {
    formatted_hours = '0'.concat(hours)
  } else {
    formatted_hours = hours
  }
  if (minutes==='') {
    formatted_minutes='00'
  } else if (minutes.length<2) {
    formatted_minutes = '0'.concat(minutes)
  } else {
    formatted_minutes = minutes
  }
  if (seconds==='') {
    formatted_seconds = '00'
  } else if (seconds.length<2) {
    formatted_seconds = '0'.concat(seconds)
  } else {
    formatted_seconds = seconds
  }
  return (
    formatted_hours+':'+formatted_minutes+':'+formatted_seconds
  )
}

export function formatTwoDigitsTime(stringValue) {
  const numberValue = Number(stringValue)
  if ( numberValue === 0) {
    return '00'
  } else if (numberValue < 10) {
    return '0'+String(numberValue)
  } else {
    return String(numberValue)
  }
}

export function formatTwoDigitTimeToString(twoDigitTime) {
  if (twoDigitTime==="00" || twoDigitTime==="") {
    return ""
  } else {
    return String(Number(twoDigitTime))
  }
}
