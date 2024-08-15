import { useForm } from 'react-hook-form'
import { Header } from '@/common/components/header'
import { ModalId } from '@/common/const'
import { useCreateTagMutation } from '../api'

export function CreateTag() {
  const { mutate: create } = useCreateTagMutation()
  const { register, getValues } = useForm({
    defaultValues: {
      name: '',
    },
  })

  return (
    <>
      <button
        className="badge badge-outline"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onClick={() => document.getElementById(ModalId.CreateTag).showModal()}
      >
        <span>+ New tag</span>
      </button>

      <dialog id={ModalId.CreateTag} className="modal">
        <div className="modal-box h-64 py-0">
          <form method="dialog">
            <Header
              title="Create Tag"
              onClickV={async () => {
                await create({
                  ...getValues(),
                  id: Date.now() + '',
                })
              }}
            />
          </form>
          <input
            {...register('name')}
            type="text"
            placeholder="Tag name"
            className="input input-bordered w-full"
          />
        </div>
      </dialog>
    </>
  )
}
