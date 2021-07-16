import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
import moment from 'moment'
import {score_type, score_time} from 'constants/movement'

const customTooltip = (e, xAxis) => {
   if (e.active && e.payload != null && e.payload[0]!=null){
     return (
       <div className='card'>
         <div>{moment(e.payload[0].payload['date']).format('MMM DD, YYYY')}</div>
         <div>{e.payload[0].payload['score_number']} {e.payload[0].payload[score_type]}</div>
       </div>
     )
   } else {
     return ""
   }
 }

function DateChart(props) {
 const {selectedData, xAxis, yAxis} = props
 const chartData = selectedData.map(x=>{
   return ({...x, date: moment(x.date).valueOf()})
 })

 return (
   <ResponsiveContainer width={'99%'} aspect={1.5}>
     <LineChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
       <CartesianGrid stroke='#eee'/>
       <XAxis
         dataKey={xAxis}
         type='number'
         domain={['auto', 'auto']}
         tickCount={5}
         tickFormatter={number => moment(number).format('M/D')}
       />
       <YAxis
        domain={['auto', 'auto']}
        tickFormatter={number => yAxis===score_time?new Date(number*1000).toISOString().substr(12,7):number}
       />
       <Tooltip content={(e, xAxis) => customTooltip(e, xAxis)}/>
       <Line dataKey={yAxis} type="monotone" stroke="#8884d8"/>
     </LineChart>
   </ResponsiveContainer>
 )
}

export default DateChart
