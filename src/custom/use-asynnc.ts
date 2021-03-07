import { useState } from "react"

interface State<D> {
  error: Error | null,
  data: D | null,
  status: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState : State<null> = {
  status: 'idle',
  data: null,
  error: null
}

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })
  const [x, setX] = useState('')

  const setData = (data: D) => {
    setState({
      data,
      status: 'success',
      error: null
    })
    setX('ss')
    setTimeout(() => {
      console.log({x})
    },2000)
  } 

  const setError = (error: Error) => setState({
    error,
    status: 'error',
    data: null
  })

  const run = async (promise: Promise<D>) => {
    if(!promise || !promise.then){
      throw new Error('请传入promise')
    }
    debugger
    setState({
      ...state,
      status: 'loading'
    })
    try {
      const data = await promise
      setData(data)
      return data
    } catch (err) {
      setError(err)
      return err
    }
  }

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    ...state
  }
}


export const useCount = () => {
  const [count, setCount] = useState(0)
  const add = () => {
    debugger
    setCount(count + 1)
  }
  return {count, add}
}