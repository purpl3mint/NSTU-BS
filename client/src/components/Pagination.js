import React, { useCallback, useEffect, useState } from 'react'

export const Pagination = (props) => {
    let {active, minValue, maxValue, isFirst, isLast, changeHandler} = props
    const [buttons, setButtons] = useState([]);

    const clickHandler = useCallback( (e) => {
      e.preventDefault()
      if (e.target.text !== active+'')
        changeHandler(e.target.text)
    }, [changeHandler, active])

    const initializeHandler = useCallback( () => {
      let newButtons = []
      for(let i = minValue; i <= maxValue; i++) {
        if (i+'' === active+'') {
          newButtons.push(<li className="active" key={i}><a href="/" value={i} onClick={clickHandler}>{i}</a></li>)
        } else {
          newButtons.push(<li className="waves-effect" key={i}><a href="/" value={i} onClick={clickHandler}>{i}</a></li>)
        }
      }

      setButtons(newButtons)
    }, [active, minValue, maxValue, clickHandler, setButtons])

    useEffect( () => {initializeHandler()}, [initializeHandler])
    
    return (
      <ul className="pagination">
        
        { isFirst && 
        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
        }
        { !isFirst && 
        <li className="waves-effect" value={active - 1} onClick={clickHandler}><a href="#!"><i className="material-icons">chevron_left</i></a></li>
        }

        { buttons }

        { isLast &&
        <li className="disabled"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
        }
        { !isLast &&
        <li className="waves-effect" value={active + 1} onClick={clickHandler}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
        }
      </ul>
    )
    
    
}