
import React from 'react'
import type { StudyItem } from '@/types/study'
import styles from './StudyCard.module.scss'

type Pro={
    item: StudyItem
}

const StudyCard = ({item}:Pro ) => {
  return (
    <article className={styles.box}>
      <div className={styles.miniBox}>
        <h3>{item.id}</h3>
        <h3 className={styles.title}>{item.title}</h3>
      </div>
        <p>{item.description}</p>
    </article>
  )
}

export default StudyCard
