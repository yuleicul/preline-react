import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { useCallback, useRef, useState } from 'react'
import { Button, Modal } from 'react-daisyui'
import { set, useForm } from 'react-hook-form'
import { todoListDefaultValue } from './const'

type AddTodoListItemProps = {
  append: (data: any) => void
}

export function AddTodoListItem({ append }: AddTodoListItemProps) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const handleShow = useCallback(() => {
    modalRef.current?.showModal()
  }, [modalRef])

  const { register, getValues } = useForm({
    defaultValues: {
      title: '',
      duration: 0,
      checked: false,
    },
  })

  const [emojiData, setEmojiData] = useState<EmojiClickData | null>(null)

  const handleClickEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    setEmojiData(emojiData)
  }

  return (
    <>
      <Button onClick={handleShow}>Open Modal</Button>
      <Modal ref={modalRef}>
        <Modal.Header className="font-bold">Hello!</Modal.Header>
        <Modal.Body>
          <div className="size-20 rounded-full border-4 bg-primary flex justify-center items-center">
            {emojiData && <span className="text-4xl">{emojiData.emoji}</span>}
          </div>
          <EmojiPicker onEmojiClick={handleClickEmoji} />
          <input
            {...register('title')}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </Modal.Body>
        <Modal.Actions>
          <form method="dialog">
            <Button>Close</Button>
            <button
              className="btn btn-primary"
              onClick={() => append({ emojiData, ...getValues() })}
            >
              Append
            </button>
          </form>
        </Modal.Actions>
      </Modal>
    </>
  )
}
