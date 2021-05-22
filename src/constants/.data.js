export const workout_data = [
  {
    id:1,
    user:1,
    date:'2021-05-21'
  }
]

export const section_data = [
  {
    id:1,
    workout_id:1,
    section_type:'metcon',
    rounds:'3',
    round_duration:'00:03:00',
    round_type:'amrap',
    score_number:'',
    score_time:'',
    extra_instructions:'',
    user:1
  }
]

export const movement_instance_data = [
  {
    id:1,
    movement_id:1,
    section_id:1,
    workout_id:1,
    count_type:'reps',
    score_type:'lbs',
    count:10,
    score_number:135,
    score_time:'',
    superset:1,
    user:1
  },
  {
    id:2,
    movement_id:'',
    section_id:1,
    workout_id:1,
    count_type:'',
    score_type:'',
    count:'',
    score_number:'',
    score_time:'',
    superset:1,
    user:1
  },
  {
    id:3,
    movement_id:2,
    section_id:1,
    workout_id:1,
    count_type:'reps',
    score_type:'lbs',
    count:'',
    score_number:'',
    score_time:'',
    superset:2,
    user:1
  }
  ]


export const movement_class_data = [
  {
    name:'Thruster',
    count_types:['reps'],
    score_types:['lbs']
  },
  {
    name:'Back Squat',
    count_types:['reps'],
    score_types:['lbs']
  },
  {
    name:'Run',
    count_types:['miles', 'meters'],
    score_types:['time']
  }
]
