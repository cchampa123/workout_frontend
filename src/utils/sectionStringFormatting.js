import {
  rounds,
  round_type,
  round_duration,
  section_type,
  extra_instructions
} from 'constants/section'

import {
  movement_id as movement_name,
  count as movement_count,
  count_type as movement_count_type,
  score_type as movement_score_type,
  score_number as movement_score_number
} from 'constants/movement'

const mapping = {
  'A':'AMRAP',
  'F': 'For Time',
  'E':'EMOM',
  'S':'Strength',
  'M':'MetCon',
  'reps':'Reps',
  'miles':'Miles',
  'meters':'Meters',
  'calories':'Calories',
  'lbs':'Pounds',
  'kgs':'KGs',
  'time':'Time'
}

const inverse_mapping = Object.entries(mapping).reduce((accumulator, currentValue) => {
  const [key, value]=currentValue
  accumulator[value]=key
  return accumulator
}, {})

export function formatDataStrings(section_type) {
  return mapping[section_type]
}

export function unformatDataStrings(section_type) {
  return inverse_mapping[section_type]
}

export function createSectionDetail(sectionData) {
  let sectionDetail
  const human_minutes = String(Number(sectionData[round_duration].substring(
    sectionData[round_duration].indexOf(':')+1,
    sectionData[round_duration].lastIndexOf(':')
  )))
  const human_seconds = sectionData[round_duration].substring(
    sectionData[round_duration].lastIndexOf(':')+1,
    sectionData[round_duration].length
  )
  if (sectionData[round_type]==='A') {
    if (sectionData[round_duration].split(':')[2]!=='00') {
      sectionDetail=sectionData[rounds] +
        (Number(sectionData[rounds])===1?' round ':' rounds ')+
        ' of '+
        human_minutes+':'+human_seconds +
        ' AMRAP'
    } else {
      sectionDetail=sectionData[rounds] +
        (Number(sectionData[rounds])===1?' round ':' rounds ')+
        'of ' +
        human_minutes +
        ' minute AMRAP'
    }
  } else if (sectionData[round_type]==='F') {
      sectionDetail=sectionData[rounds] +
      (Number(sectionData[rounds])===1?' round ':' rounds ')+
      'for time:'
  } else {
    if (sectionData[round_duration].split(':')[2]!=='00') {
      sectionDetail='Every '+
      human_minutes + ':' + human_seconds +
      ' for '+
      sectionData[rounds]+
      ' rounds:'
    } else {
      sectionDetail='Every '+
      (human_minutes==='1'?' minute':human_minutes+' minutes')+' for '+
      sectionData[rounds] +
      ' rounds:'
    }
  }
  return sectionDetail
}

export function sectionTitling(sectionData) {

  const sectionDetail = createSectionDetail(sectionData)

  return (
    <>
      <h5 className='text-primary'>{formatDataStrings(sectionData[section_type])}</h5>
      {
        sectionData[section_type]==='S'?<div/>:
        <div>
          {sectionDetail}
        </div>
      }
      {
        sectionData[extra_instructions]===''?<div/>:
        <i>
          {sectionData[extra_instructions]}
        </i>
      }
    </>
  )
}

export function movementFormatting(movementData) {

  const name = movementData[movement_name]
  const count = movementData[movement_count]
  const count_type = movementData[movement_count_type]
  const score_number = movementData[movement_score_number]
  const score_type = movementData[movement_score_type]

  let prename_phrase
  if (count===null) {
    prename_phrase = ''
  } else if (count_type==='reps') {
    prename_phrase = count.toString()
  } else {
    prename_phrase = count.toString() + ' ' + count_type
  }

  let postname_phrase
  if (score_number===null) {
    postname_phrase=''
  } else {
    postname_phrase = ' @ '+score_number.toString()+score_type
  }

  return (
    prename_phrase +' '+name+postname_phrase
  )
}
