import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { User } from './UsersConstext'

export interface History {
  id: string
  action: string
  productOrInstruction: boolean
  itemName: string
  creationDate: Date
  agent: User
}

interface HistoryContextType {
  history: History[]
  createHistoryItem: (history: History) => void
  searchFilteredLogs: (
    search: string,
    page: 'Registred' | 'Validation' | 'History',
  ) => void
  clearSearchInputLogs: (
    page: 'Registred' | 'Validation' | 'History',
  ) => Promise<void>
}

interface HistoryContextProviderProps {
  children: ReactNode
}

export const HistorysContext = createContext({} as HistoryContextType)

export function HistorysContextProvider({
  children,
}: HistoryContextProviderProps) {
  const [history, setHistory] = useState<History[]>([])

  async function fetchHistory() {
    const { data } = await api.get('/pr/logs')

    setHistory(data)
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  function createHistoryItem(history: History) {
    setHistory((state) => [history, ...state])
  }

  function searchFilteredLogs(
    search: string,
    page: 'Registred' | 'Validation' | 'History',
  ) {
    if (page === 'History') {
      const filteredList = history.filter(
        (item) =>
          item.action.includes(search) ||
          item.agent.name.includes(search) ||
          item.itemName.includes(search),
      )

      setHistory(filteredList)
    }
  }

  async function clearSearchInputLogs(
    page: 'Registred' | 'Validation' | 'History',
  ) {
    if (page === 'History') {
      await fetchHistory()
    }
  }

  return (
    <HistorysContext.Provider
      value={{
        history,
        createHistoryItem,
        searchFilteredLogs,
        clearSearchInputLogs,
      }}
    >
      {children}
    </HistorysContext.Provider>
  )
}
