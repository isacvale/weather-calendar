import React from 'react'
import { observer } from 'mobx-react'
import { mainStore } from 'stores'
import './Navigation.css'

const Navigation = observer(props => {
  const month = mainStore.data.selectedMonth
  const year = mainStore.data.selectedYear
  const refDate = new Date(year, month, 1)
  const title = refDate.toLocaleDateString('en-us', { year: 'numeric', month: 'long' })
  
  return (
    <nav className='Navigation'>
      <button
        className='Navigation__Year-Button link-button'
        onClick={mainStore.minusYear}
      >
        last year
      </button>
      <button
        className='Navigation__Month-Button link-button'
        onClick={mainStore.minusMonth}
      >
        last month
      </button>

      <div
        className='Navigation__MainTitle'
      >
        {title}
      </div>

      <button
        className='Navigation__Month-Button link-button'
        onClick={mainStore.plusMonth}
      >
        next month
      </button>
      <button
        className='Navigation__Year-Button link-button'
        onClick={mainStore.plusYear}
      >
        next year
      </button>
    </nav>
  )
})

export default Navigation