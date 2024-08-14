import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/common/components/header'
import { useCreateTagMutation } from '@/features/tags/api'

export function TagsCreate() {
  const navigate = useNavigate()
  const { mutate: create } = useCreateTagMutation()

  const { register, getValues } = useForm({
    defaultValues: {
      name: '',
    },
  })

  return (
    <div className="px-6">
      <Header
        title="Create Tag"
        onClickV={async () => {
          await create({
            ...getValues(),
            id: Date.now() + '',
          })
        }}
        onClickX={() => navigate('/todos/create')}
      />

      <div className="flex flex-col items-center gap-4">
        <input
          {...register('name')}
          type="text"
          placeholder="Tag name"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  )
}
