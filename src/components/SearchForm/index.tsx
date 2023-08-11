import { SearchButton, SearchContent } from './styled'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { MagnifyingGlass, Warning, X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { ProductsContext } from '../../context/ProductContext'
import { ErrorSpan } from '../../global'
import { LoadingButton } from '../LoadingButton'
import { InstructionsContext } from '../../context/InstructionsContext'
import { UsersContext } from '../../context/UsersConstext'
import { HistorysContext } from '../../context/HistoryContext'

const searchFormSchema = z.object({
  query: z
    .string()
    .nonempty('Para realizar uma busca, preencha o campo Busca')
    .transform((query) => {
      return query
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1))
        })
        .join(' ')
    }),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

interface SearchFormProps {
  page: 'Registred' | 'Validation' | 'History'
  type: 'Instructions' | 'Products' | 'Users' | 'Logs'
}

export function SearchForm({ page, type }: SearchFormProps) {
  const { searchFilteredProducts, clearSearchInput } =
    useContext(ProductsContext)
  const { searchFilteredInstructions, clearSearchInputInstructions } =
    useContext(InstructionsContext)
  const { searchFilteredUsers, clearSearchInputUsers } =
    useContext(UsersContext)
  const { searchFilteredLogs, clearSearchInputLogs } =
    useContext(HistorysContext)
  const [buttonSearch, setButtonSearch] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchFilteredProducts(data: SearchFormInputs) {
    if (type === 'Products') {
      if (buttonSearch === false) {
        searchFilteredProducts(data.query, page)
        setButtonSearch(true)
      } else {
        await clearSearchInput(page)
        setButtonSearch(false)
        reset()
      }
    }
    if (type === 'Instructions') {
      if (buttonSearch === false) {
        searchFilteredInstructions(data.query, page)
        setButtonSearch(true)
      } else {
        await clearSearchInputInstructions(page)
        setButtonSearch(false)
        reset()
      }
    }
    if (type === 'Users') {
      if (buttonSearch === false) {
        searchFilteredUsers(data.query, page)
        setButtonSearch(true)
      } else {
        await clearSearchInputUsers(page)
        setButtonSearch(false)
        reset()
      }
    }
    if (type === 'Logs') {
      if (buttonSearch === false) {
        searchFilteredLogs(data.query, page)
        setButtonSearch(true)
      } else {
        await clearSearchInputLogs(page)
        setButtonSearch(false)
        reset()
      }
    }
  }
  return (
    <SearchContent onSubmit={handleSubmit(handleSearchFilteredProducts)}>
      <input
        type="text"
        placeholder={
          page === 'Registred' && type === 'Products'
            ? 'Buscar produtos cadastrados'
            : page === 'History' && type === 'Products'
            ? 'Buscar produtos desabilitados'
            : page === 'Validation' && type === 'Products'
            ? 'Buscar produtos a serem validados'
            : page === 'Registred' && type === 'Instructions'
            ? 'Buscar instruções cadastrados'
            : page === 'History' && type === 'Instructions'
            ? 'Buscar instruções desabilitados'
            : page === 'Validation' && type === 'Instructions'
            ? 'Buscar instruções a serem validados'
            : page === 'Registred' && type === 'Users'
            ? 'Buscar usuários cadastrados'
            : page === 'History' && type === 'Users'
            ? 'Buscar usuários desabilitados'
            : page === 'Validation' && type === 'Users'
            ? 'Buscar usuários a serem validados'
            : page === 'History' && type === 'Logs'
            ? 'Buscar operações realizadas'
            : 'Buscar'
        }
        {...register('query')}
      />
      {errors.query && (
        <ErrorSpan>
          <Warning size={16} weight="fill" />
          {errors.query.message}
        </ErrorSpan>
      )}
      {buttonSearch ? (
        isSubmitting ? (
          <LoadingButton
            statusColor="red"
            statusWidth="search"
            statusHeight="search"
          />
        ) : (
          <SearchButton statusColor="red" type="submit" disabled={isSubmitting}>
            <X size={16} weight="bold" />
            Limpar Busca
          </SearchButton>
        )
      ) : (
        <SearchButton statusColor="black" type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={16} weight="bold" />
          Buscar
        </SearchButton>
      )}
    </SearchContent>
  )
}
