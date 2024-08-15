import EmojiPicker from 'emoji-picker-react'
import { MouseDownEvent } from 'emoji-picker-react/dist/config/config'
import { ModalId } from '../constants'
import { openModal } from './lib/utils'

export function EmojiPickerButton({ emoji }: { emoji: string }) {
  return (
    <button
      type="button"
      className="size-20 rounded-full bg-base-200 flex justify-center items-center"
      onClick={() => openModal(ModalId.EmojiPicker)}
    >
      <span className="text-4xl">{emoji}</span>
    </button>
  )
}

export function EmojiPickerModal({
  onEmojiClick,
}: {
  onEmojiClick?: MouseDownEvent
}) {
  return (
    <dialog id={ModalId.EmojiPicker} className="modal">
      <div className="modal-box w-full bg-transparent shadow-none flex justify-center">
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          previewConfig={{ showPreview: false }}
          autoFocusSearch={false}
          height={500}
          width={320}
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}
