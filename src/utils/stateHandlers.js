// export function setSectionDataWrapper(newSection, id=null) {
//   let newSectionData
//   const relevantID = id!==null?id:newSection.id
//   const otherSections = sectionData.filter(x=>x.id!==relevantID)
//   if (newSection !== null) {
//     newSectionData=[...otherSections, newSection]
//   } else {
//     newSectionData=[...otherSections]
//     const newMovementData=movementData.filter(x=>x[movement_section_id]!==id)
//     setMovementData(newMovementData)
//   }
//   setSectionData(newSectionData)
// }
//
// export function setMovementDataWrapper(newMovement, id=null) {
//   const newMovementData = []
//   const relevantID = id!==null?id:newMovement.id
//   if (movementData.map(x=>x[movement_movement_id]).includes(relevantID)) {
//     for (const movement of movementData) {
//       if (movement[movement_movement_id]===relevantID) {
//         if (newMovement !== null) {
//           newMovementData.push(newMovement)
//         }
//       } else {
//         newMovementData.push(movement)
//       }
//     }
//   } else {
//     newMovementData.push(...movementData, newMovement)
//   }
//   newMovementData.sort((a,b)=>a['superset']>b['superset']?1:-1)
//   setMovementData(newMovementData)
// }
