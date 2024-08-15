import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Header } from '@/common/components/header'
import { closeModal, cn, openModal } from '@/common/components/lib/utils'
import { ModalId } from '@/common/constants'
import { useCreateTagMutation } from '../api'

export function CreateTagButton() {
  return (
    <button
      className="badge badge-outline"
      onClick={() => openModal(ModalId.CreateTag)}
    >
      <span>+ New tag</span>
    </button>
  )
}

export function CreateTagModal() {
  const { mutate: create } = useCreateTagMutation()
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(z.object({ name: z.string().min(1) })),
  })

  const onSubmit = async () => {
    await create({
      ...getValues(),
      id: Date.now() + '',
    })
    closeModal(ModalId.CreateTag)
  }

  return (
    <dialog id={ModalId.CreateTag} className="modal">
      <form className="modal-box h-64 py-0" onSubmit={handleSubmit(onSubmit)}>
        <Header
          title="Create Tag"
          onClickX={() => closeModal(ModalId.CreateTag)}
        />
        <input
          {...register('name')}
          type="text"
          placeholder="Tag name"
          className={cn(
            'input input-bordered w-full',
            errors.name && 'input-error',
          )}
        />
      </form>
    </dialog>
  )
}
