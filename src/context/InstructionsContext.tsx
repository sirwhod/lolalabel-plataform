import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/axios'
import { ProductsContext } from './ProductContext'
import { History as HistoryProps, HistorysContext } from './HistoryContext'
import { useAuth } from './AuthProvider/useAuth'

interface Stamp {
  id?: string
  nameStamp: string
  image: string
  active: boolean
}

interface User {
  id: string
  name: string
}

interface Product {
  id: string
  sku: string
  version: string
  productName: string
  productLine: string
  productImage: string
  composition: string
  authorId: string
  creationDate: Date
  isActive: boolean
  isValidated: boolean
  qrCodeIsActive: boolean
  Stamps: Stamp[]
}

export interface Instruction {
  id: string
  language: string
  whatIAm: string
  modeOfUse: string
  Precaution: string
  productId: string
  authorId: string
  creationDate: Date
  isActive: boolean
  isValidated: boolean
  whatProduct: Product
  whoCreated: User
}

interface DataProps {
  instruction: Instruction
  history: HistoryProps
}

interface ReturnProps {
  data: DataProps
}

interface CreateNewInstruction {
  language: string
  whatIAm: string
  modeOfUse: string
  Precaution: string
}

interface countInstructionsProps {
  registredInstruction: number
  instructionsAccepted: number
  instructionsRejected: number
  instructionsDisabled: number
  instructionsInValidation: number
}

interface InstructionContextType {
  instructionsRegistred: Instruction[]
  instructionsValidation: Instruction[]
  instructionsHistory: Instruction[]
  countInstructions: countInstructionsProps | undefined
  createNewInstruction: (
    dataInstruction: CreateNewInstruction,
    id: string,
    page: 'Registred' | 'Validation',
  ) => void
  searchFilteredInstructions: (
    search: string,
    page: 'Registred' | 'Validation' | 'History',
  ) => void
  clearSearchInputInstructions: (
    page: 'Registred' | 'Validation' | 'History',
  ) => Promise<void>
  fetchCountInstructions: () => Promise<void>
  acceptInstruction: (id: string) => Promise<void>
  rejectInstruction: (id: string) => Promise<void>
  disableInstruction: (id: string, reason: string) => Promise<void>
  restoreInstruction: (id: string) => Promise<void>
}

interface InstructionContextProviderProps {
  children: ReactNode
}

export const InstructionsContext = createContext({} as InstructionContextType)

export function InstructionsContextProvider({
  children,
}: InstructionContextProviderProps) {
  const { userAuth } = useAuth()

  let idUser: string = ''

  if (userAuth?.user?.id) {
    idUser = userAuth.user.id
  }

  const { addNewInstruction, alterStatusInstruction } =
    useContext(ProductsContext)

  const { createHistoryItem } = useContext(HistorysContext)

  const [instructionsRegistred, setInstructionsRegistred] = useState<
    Instruction[]
  >([])
  const [instructionsValidation, setInstructionsValidation] = useState<
    Instruction[]
  >([])
  const [instructionsHistory, setInstructionsHistory] = useState<Instruction[]>(
    [],
  )
  const [countInstructions, setCountInstructions] = useState<
    countInstructionsProps | undefined
  >()

  async function fetchInstructionsRegistred() {
    await api.get('/pr/instructions/registred').then((response) => {
      setInstructionsRegistred(response.data)
    })
  }

  async function fetchInstructionsValidation() {
    await api.get('/pr/instructions/validation').then((response) => {
      setInstructionsValidation(response.data)
    })
  }

  async function fetchInstructionsHistory() {
    await api.get('/pr/instructions/history').then((response) => {
      setInstructionsHistory(response.data)
    })
  }

  async function fetchCountInstructions() {
    await api.get('/pr/instructions/all').then((response) => {
      setCountInstructions(response.data)
    })
  }

  useEffect(() => {
    fetchInstructionsRegistred()
    fetchInstructionsValidation()
    fetchInstructionsHistory()
    fetchCountInstructions()
  }, [])

  async function createNewInstruction(
    dataInstruction: CreateNewInstruction,
    id: string,
    page: 'Registred' | 'Validation',
  ) {
    const headers = {
      idUser,
      idProduct: id,
    }

    const {
      data: { instruction, history },
    }: ReturnProps = await api.post(
      '/pr/instructions/create',
      dataInstruction,
      {
        headers,
      },
    )

    setInstructionsValidation((state) => [instruction, ...state])

    const instructionToProducts = {
      id: instruction.id,
      language: instruction.language,
      isActive: instruction.isActive,
      isValidated: instruction.isValidated,
    }
    createHistoryItem(history)

    addNewInstruction(id, page, instructionToProducts)
  }

  function searchFilteredInstructions(
    search: string,
    page: 'Registred' | 'Validation' | 'History',
  ) {
    if (page === 'Registred') {
      const filteredList = instructionsRegistred.filter((instruction) =>
        instruction.language.includes(search),
      )

      setInstructionsRegistred(filteredList)
    } else if (page === 'Validation') {
      const filteredList = instructionsValidation.filter(
        (instruction) =>
          instruction.language.includes(search) ||
          instruction.whatProduct.productName.includes(search) ||
          instruction.whatProduct.productLine.includes(search) ||
          instruction.whatProduct.sku.includes(search) ||
          instruction.whatProduct.version.includes(search),
      )

      setInstructionsValidation(filteredList)
    } else if (page === 'History') {
      const filteredList = instructionsHistory.filter(
        (instruction) =>
          instruction.language.includes(search) ||
          instruction.whatProduct.productName.includes(search) ||
          instruction.whatProduct.productLine.includes(search) ||
          instruction.whatProduct.sku.includes(search) ||
          instruction.whatProduct.version.includes(search),
      )

      setInstructionsHistory(filteredList)
    }
  }

  async function clearSearchInputInstructions(
    page: 'Registred' | 'Validation' | 'History',
  ) {
    if (page === 'Registred') {
      await fetchInstructionsRegistred()
    } else if (page === 'Validation') {
      await fetchInstructionsValidation()
    } else if (page === 'History') {
      await fetchInstructionsHistory()
    }
  }

  async function acceptInstruction(id: string) {
    const newInstructionsValidationList = instructionsValidation.filter(
      (instruction) => instruction.id !== id,
    )

    const dataInstruction = {}

    const headers = {
      idUser,
      idInstruction: id,
    }

    const {
      data: { history, instruction },
    }: ReturnProps = await api.put('/pr/instructions/accept', dataInstruction, {
      headers,
    })

    setInstructionsValidation(newInstructionsValidationList)

    if (instruction) {
      setInstructionsRegistred((state) => [instruction, ...state])
      const { whatProduct, id } = instruction

      const newInstructionDataProduct = {
        id: instruction.id,
        language: instruction.language,
        isValidated: instruction.isValidated,
        isActive: instruction.isActive,
      }

      createHistoryItem(history)

      alterStatusInstruction(whatProduct.id, id, newInstructionDataProduct)
    }
  }

  async function rejectInstruction(id: string) {
    const newInstructionsValidationList = instructionsValidation.filter(
      (instruction) => instruction.id !== id,
    )

    const dataInstruction = {}

    const headers = {
      idUser,
      idInstruction: id,
    }

    const {
      data: { instruction, history },
    }: ReturnProps = await api.put('/pr/instructions/reject', dataInstruction, {
      headers,
    })

    setInstructionsValidation(newInstructionsValidationList)

    if (instruction) {
      setInstructionsHistory((state) => [instruction, ...state])

      const { whatProduct, id } = instruction

      const newInstructionDataProduct = {
        id: instruction.id,
        language: instruction.language,
        isValidated: instruction.isValidated,
        isActive: instruction.isActive,
      }

      createHistoryItem(history)
      alterStatusInstruction(whatProduct.id, id, newInstructionDataProduct)
    }
  }

  async function disableInstruction(id: string, reason: string) {
    const newInstructionsList = instructionsRegistred.filter(
      (instruction) => instruction.id !== id,
    )
    setInstructionsRegistred(newInstructionsList)

    const dataInstruction = {
      reason,
    }

    const headers = {
      idUser,
      idinstruction: id,
    }

    const {
      data: { instruction, history },
    }: ReturnProps = await api.put(
      '/pr/instructions/disable',
      dataInstruction,
      {
        headers,
      },
    )

    if (instruction) {
      createHistoryItem(history)
      setInstructionsHistory((state) => [instruction, ...state])
    }
  }

  async function restoreInstruction(id: string) {
    const newInstructionsHistoryList = instructionsHistory.filter(
      (instruction) => instruction.id !== id,
    )

    setInstructionsHistory(newInstructionsHistoryList)

    const headers = {
      idInstruction: id,
      iduser: userAuth?.user?.id,
    }

    const {
      data: { instruction, history },
    }: ReturnProps = await api.put('/pr/instructions/restore', {}, { headers })

    if (instruction) {
      createHistoryItem(history)
      setInstructionsValidation((state) => [instruction, ...state])
    }
  }

  return (
    <InstructionsContext.Provider
      value={{
        instructionsHistory,
        instructionsRegistred,
        instructionsValidation,
        countInstructions,
        createNewInstruction,
        searchFilteredInstructions,
        clearSearchInputInstructions,
        fetchCountInstructions,
        acceptInstruction,
        rejectInstruction,
        disableInstruction,
        restoreInstruction,
      }}
    >
      {children}
    </InstructionsContext.Provider>
  )
}
