import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/axios'

import { History as HistoryProps, HistorysContext } from './HistoryContext'
import { useAuth } from './AuthProvider/useAuth'

import { Instruction as InstructionProps } from './InstructionsContext'

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

interface Instruction {
  id: string
  language: string
  isActive: boolean
  isValidated: boolean
}

interface ProductsDisabled {
  id: string
  idProduct: string
  userId: string
  disabledDate: Date
  reason: string
}

export interface Product {
  id: string
  sku: string
  version: string
  productName: string
  productLine: string
  productImage: string
  composition: string
  Stamps: Stamp[]
  whoCreated: User
  Instructions: Instruction[]
  creationDate: Date
  isActive: boolean
  isValidated: boolean
  qrCodeIsActive: boolean
  ProductsDisabled: ProductsDisabled[]
}

export interface ProductValidation {
  id: string
  sku: string
  version: string
  productName: string
  productLine: string
  productImage: string
  composition: string
  Stamps: Stamp[]
  whoCreated: User
  Instructions: InstructionProps[]
  creationDate: Date
  isActive: boolean
  isValidated: boolean
  qrCodeIsActive: boolean
  ProductsDisabled: ProductsDisabled[]
}

interface FetchProductsValidationProps {
  data: ProductValidation
}

interface AlterImageProduct {
  id: string
  productImage: string
  Stamps: Stamp[]
}

export interface ProductForm {
  sku: string
  version: string
  productName: string
  productLine: string
  productImage: string
  Stamps: Stamp[]
}

interface countProductsProps {
  registredProduct: number
  qrcodeGenerated: number
  productsAccepted: number
  productsRejected: number
  productsDisabled: number
  productsInValidation: number
}

interface CopyProductProps {
  idProduct: string
  newVersion: string
  composition: string
  copyInstruction: boolean
}

interface DataProps {
  product: Product
  history: HistoryProps
}

interface ReturnProps {
  data: DataProps
}

interface ProductContextType {
  countProducts: countProductsProps | undefined
  productsRegistred: Product[]
  productsValidation: Product[]
  productsHistory: Product[]
  alterImagesProduct: (data: AlterImageProduct) => void
  createNewProduct: (data: ProductForm) => Promise<void>
  copyNewProduct: (data: CopyProductProps) => Promise<void>
  disableProduct: (id: string, reason: string) => Promise<void>
  findProductByID: (
    id: string,
    page: 'Registred' | 'Validation',
  ) => Product | undefined
  searchFilteredProducts: (
    search: string,
    page: 'Registred' | 'Validation' | 'History',
  ) => void
  clearSearchInput: (
    page: 'Registred' | 'Validation' | 'History',
  ) => Promise<void>
  fetchCountProducts: () => Promise<void>
  acceptProduct: (id: string) => Promise<void>
  rejectProduct: (id: string) => Promise<void>
  restoreProduct: (id: string) => void
  activeQRCode: (id: string) => Promise<void>
  addNewInstruction: (
    id: string,
    page: 'Registred' | 'Validation',
    data: Instruction,
  ) => void
  alterStatusInstruction: (
    id: string,
    idInstruction: string,
    data: Instruction,
  ) => void
  fetchProductByID: (id: string) => Promise<ProductValidation>
}

interface ProductContextProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductContextType)

export function ProductsContextProvider({
  children,
}: ProductContextProviderProps) {
  const { userAuth } = useAuth()

  let idUser: string = ''

  if (userAuth?.user?.id) {
    idUser = userAuth.user.id
  }

  const { createHistoryItem } = useContext(HistorysContext)

  const [productsRegistred, setProductsRegistred] = useState<Product[]>([])
  const [productsValidation, setProductsValidation] = useState<Product[]>([])
  const [productsHistory, setProductsHistory] = useState<Product[]>([])
  const [countProducts, setCountProducts] = useState<
    countProductsProps | undefined
  >()

  async function fetchProductsRegistred() {
    await api.get('/pr/products/registred').then((response) => {
      setProductsRegistred(response.data)
    })
  }

  async function fetchProductsValidation() {
    await api.get('/pr/products/validation').then((response) => {
      setProductsValidation(response.data)
    })
  }

  async function fetchProductsHistory() {
    await api.get('/pr/products/history').then((response) => {
      setProductsHistory(response.data)
    })
  }

  async function fetchCountProducts() {
    await api.get('/pr/products/all').then((response) => {
      setCountProducts(response.data)
    })
  }

  async function fetchProductByID(id: string) {
    const { data }: FetchProductsValidationProps = await api.get(
      `/pr/products/${id}`,
    )

    return data
  }

  useEffect(() => {
    fetchProductsRegistred()
    fetchProductsValidation()
    fetchProductsHistory()
    fetchCountProducts()
  }, [])

  async function createNewProduct(data: ProductForm) {
    const headers = {
      idUser,
    }

    const {
      data: { product, history },
    }: ReturnProps = await api.post('/pr/products/create', data, { headers })

    if (product) {
      createHistoryItem(history)
      setProductsValidation((state) => [product, ...state])
    }
  }

  async function copyNewProduct(data: CopyProductProps) {
    const headers = {
      idUser,
    }

    const {
      data: { product, history },
    }: ReturnProps = await api.post('/pr/products/copy', data, { headers })

    if (product) {
      createHistoryItem(history)
      setProductsValidation((state) => [product, ...state])
    }
  }

  function searchFilteredProducts(
    search: string,
    page: 'Registred' | 'Validation' | 'History',
  ) {
    if (page === 'Registred') {
      const filteredList = productsRegistred.filter(
        (product) =>
          product.productName.includes(search) ||
          product.productLine.includes(search) ||
          product.sku.includes(search) ||
          product.version.includes(search),
      )

      setProductsRegistred(filteredList)
    } else if (page === 'Validation') {
      const filteredList = productsValidation.filter(
        (product) =>
          product.productName.includes(search) ||
          product.productLine.includes(search) ||
          product.sku.includes(search) ||
          product.version.includes(search),
      )

      setProductsValidation(filteredList)
    } else if (page === 'History') {
      const filteredList = productsHistory.filter(
        (product) =>
          product.productName.includes(search) ||
          product.productLine.includes(search) ||
          product.sku.includes(search) ||
          product.version.includes(search),
      )

      setProductsHistory(filteredList)
    }
  }

  async function clearSearchInput(
    page: 'Registred' | 'Validation' | 'History',
  ) {
    if (page === 'Registred') {
      await fetchProductsRegistred()
    } else if (page === 'Validation') {
      await fetchProductsValidation()
    } else if (page === 'History') {
      await fetchProductsHistory()
    }
  }

  async function disableProduct(id: string, reason: string) {
    const newProductsList = productsRegistred.filter(
      (product) => product.id !== id,
    )
    setProductsRegistred(newProductsList)

    const dataProduct = {
      reason,
    }

    const headers = {
      idUser,
      idProduct: id,
    }

    const {
      data: { product, history },
    }: ReturnProps = await api.put('/pr/products/disable', dataProduct, {
      headers,
    })

    if (product) {
      createHistoryItem(history)
      setProductsHistory((state) => [product, ...state])
    }
  }

  async function alterImagesProduct(data: AlterImageProduct) {
    const newProductsRegistredList = productsRegistred.filter(
      (product) => product.id !== data.id,
    )

    const headers = {
      idUser,
      idProduct: data.id,
    }

    const {
      data: { product, history },
    }: ReturnProps = await api.put('/pr/products/alterimages', data, {
      headers,
    })

    if (product) {
      createHistoryItem(history)
      setProductsRegistred([product, ...newProductsRegistredList])
    }
  }

  function findProductByID(
    id: string,
    page: 'Registred' | 'Validation',
  ): Product | undefined {
    if (page === 'Registred') {
      const productFinded = productsRegistred.find(
        (product) => product.id === id,
      )

      return productFinded
    } else if (page === 'Validation') {
      const productFinded = productsValidation.find(
        (product) => product.id === id,
      )

      return productFinded
    }
  }

  async function acceptProduct(id: string) {
    const newProductsValidationList = productsValidation.filter(
      (product) => product.id !== id,
    )

    const dataProduct = {}

    const headers = {
      idUser,
      idProduct: id,
    }

    const {
      data: { product, history },
    }: ReturnProps = await api.put('/pr/products/accept', dataProduct, {
      headers,
    })

    setProductsValidation(newProductsValidationList)

    if (product) {
      createHistoryItem(history)
      setProductsRegistred((state) => [product, ...state])
    }
  }

  async function rejectProduct(id: string) {
    const newProductsValidationList = productsValidation.filter(
      (product) => product.id !== id,
    )

    const dataProduct = {}

    const headers = {
      idUser,
      idProduct: id,
    }

    const {
      data: { product, history },
    }: ReturnProps = await api.put('/pr/products/reject', dataProduct, {
      headers,
    })

    setProductsValidation(newProductsValidationList)

    if (product) {
      createHistoryItem(history)
      setProductsHistory((state) => [product, ...state])
    }
  }

  async function restoreProduct(id: string) {
    const newProductsHistoryList = productsHistory.filter(
      (product) => product.id !== id,
    )

    setProductsHistory(newProductsHistoryList)

    const headers = {
      idproduct: id,
      iduser: userAuth?.user?.id,
    }

    const {
      data: { product, history },
    }: ReturnProps = await api.put('/pr/products/restore', {}, { headers })

    if (product) {
      createHistoryItem(history)
      setProductsValidation((state) => [product, ...state])
    }
  }

  async function activeQRCode(id: string) {
    const newProductsList = productsRegistred.filter(
      (product) => product.id !== id,
    )

    const headers = {
      idUser,
      idProduct: id,
    }
    const {
      data: { product, history },
    }: ReturnProps = await api.get('/pr/products/qrcode', { headers })

    if (product) {
      createHistoryItem(history)
      setProductsRegistred([product, ...newProductsList])
    }
  }

  function addNewInstruction(
    id: string,
    page: 'Registred' | 'Validation',
    data: Instruction,
  ) {
    if (page === 'Registred') {
      const newProductList = productsRegistred.filter(
        (product) => product.id !== id,
      )

      const productFind = productsRegistred.find((product) => product.id === id)

      setProductsRegistred(newProductList)

      if (productFind) {
        const { Instructions, ...product } = productFind

        Instructions.unshift(data)

        const newProduct = { Instructions, ...product }

        setProductsRegistred((state) => [newProduct, ...state])
      }
    } else if (page === 'Validation') {
      const newProductList = productsValidation.filter(
        (product) => product.id !== id,
      )

      const productFind = productsValidation.find(
        (product) => product.id === id,
      )

      setProductsValidation(newProductList)

      if (productFind) {
        const { Instructions, ...product } = productFind

        Instructions.unshift(data)

        const newProduct = { Instructions, ...product }

        setProductsValidation((state) => [newProduct, ...state])
      }
    }
  }

  function alterStatusInstruction(
    id: string,
    idInstruction: string,
    data: Instruction,
  ) {
    const registredProductFind = findProductByID(id, 'Registred')
    if (registredProductFind) {
      const { Instructions, ...restProduct } = registredProductFind

      const newInstructionsListWithoutInstructionData = Instructions.filter(
        (instruction) => instruction.id !== idInstruction,
      )

      newInstructionsListWithoutInstructionData.unshift(data)

      const newProduct = {
        Instructions: newInstructionsListWithoutInstructionData,
        ...restProduct,
      }

      const newProductList = productsRegistred.filter(
        (product) => product.id !== id,
      )

      newProductList.unshift(newProduct)

      setProductsRegistred(newProductList)
    } else {
      const validationProductFind = findProductByID(id, 'Validation')

      if (validationProductFind) {
        const { Instructions, ...restProduct } = validationProductFind

        const newInstructionsListWithoutInstructionData = Instructions.filter(
          (instruction) => instruction.id !== idInstruction,
        )

        newInstructionsListWithoutInstructionData.unshift(data)

        const newProduct = {
          Instructions: newInstructionsListWithoutInstructionData,
          ...restProduct,
        }

        const newProductList = productsValidation.filter(
          (product) => product.id !== id,
        )

        newProductList.unshift(newProduct)

        setProductsValidation(newProductList)
      }
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        countProducts,
        productsRegistred,
        productsValidation,
        productsHistory,
        alterImagesProduct,
        createNewProduct,
        copyNewProduct,
        disableProduct,
        searchFilteredProducts,
        findProductByID,
        clearSearchInput,
        acceptProduct,
        rejectProduct,
        restoreProduct,
        activeQRCode,
        fetchCountProducts,
        addNewInstruction,
        alterStatusInstruction,
        fetchProductByID,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
