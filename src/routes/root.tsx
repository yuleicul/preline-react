import { AddTodoListItem } from '@/features/todo-list/add'
import { todoListDefaultValue } from '@/features/todo-list/const'
import _, { set } from 'lodash'
import { ListTodo } from 'lucide-react'
import { useCallback, useRef, useState, useTransition } from 'react'
import { BottomNavigation, Button, Modal } from 'react-daisyui'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { cn } from '@/components/lib/utils'

export function Root() {
  const { watch, register, control, setValue } = useForm({
    defaultValues: {
      todoList: [
        {
          emojiData: {
            activeSkinTone: 'neutral',
            emoji: '😂',
            imageUrl:
              'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f602.png',
            isCustom: false,
            names: ['joy', 'face with tears of joy'],
            unified: '1f602',
            unifiedWithoutSkinTone: '1f602',
          },
          title: '',
          duration: 0,
          checked: false,
        },
        {
          emojiData: {
            activeSkinTone: 'neutral',
            emoji: '🦺',
            imageUrl:
              'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f9ba.png',
            isCustom: false,
            names: ['safety vest'],
            unified: '1f9ba',
            unifiedWithoutSkinTone: '1f9ba',
          },
          title: '',
          duration: 0,
          checked: false,
        },
        {
          emojiData: {
            activeSkinTone: 'neutral',
            emoji: '🏈',
            imageUrl:
              'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f3c8.png',
            isCustom: false,
            names: ['football', 'american football'],
            unified: '1f3c8',
            unifiedWithoutSkinTone: '1f3c8',
          },
          title: '',
          duration: 0,
          checked: false,
        },
        {
          emojiData: {
            activeSkinTone: 'neutral',
            emoji: '🫠',
            imageUrl:
              'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1fae0.png',
            isCustom: false,
            names: ['melting face'],
            unified: '1fae0',
            unifiedWithoutSkinTone: '1fae0',
          },
          title: '',
          duration: 0,
          checked: false,
        },
        {
          emojiData: {
            activeSkinTone: 'neutral',
            emoji: '🙉',
            imageUrl:
              'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f649.png',
            isCustom: false,
            names: ['hear no evil', 'hear-no-evil monkey'],
            unified: '1f649',
            unifiedWithoutSkinTone: '1f649',
          },
          title: '',
          duration: 0,
          checked: false,
        },
        {
          emojiData: {
            activeSkinTone: 'neutral',
            emoji: '🫃',
            imageUrl:
              'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1fac3.png',
            isCustom: false,
            names: ['pregnant man'],
            unified: '1fac3',
            unifiedWithoutSkinTone: '1fac3',
          },
          title: '',
          duration: 0,
          checked: false,
        },
      ],
    },
  })
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: 'todoList', // unique name for your Field Array
    })

  const todoList = watch('todoList')

  const [rolledNumber, setRolledNumber] = useState(-1)
  const rolledIndex = rolledNumber % todoList.length
  const rollIt = () => {
    const from = todoList.length
    const to = from * 3 - 1
    const rolledNumber = _.random(from, to)

    let rolling = 0
    function roll() {
      const timer = setTimeout(
        () => {
          setRolledNumber(rolling)
          rolling++
          clearTimeout(timer)
          if (rolling <= rolledNumber) {
            roll()
          }
        },
        200 + 1500 / (rolledNumber - rolling + 1),
      )
    }
    roll()
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
      <AddTodoListItem append={append} />
      <button className="btn btn-primary" onClick={rollIt}>
        Roll it!
      </button>

      <form className="form-control gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn(
              'flex items-center gap-4 rounded-lg p-6 glass',
              'transition-colors duration-500',
              index === rolledIndex && 'bg-accent',
            )}
          >
            <div className="text-4xl">{field.emojiData?.emoji}</div>
            <div>
              <label
                className={cn(
                  'text-lg cursor-pointer',
                  todoList[index].checked && 'line-through',
                )}
                htmlFor={field.id}
              >
                {field.title}
              </label>
              <p className="text-sm">Duration: {field.duration} min</p>
            </div>
            <input
              {...register(`todoList.${index}.checked`)}
              id={field.id}
              type="checkbox"
              className="checkbox checkbox-primary ml-auto"
            />
          </div>
        ))}
      </form>

      <BottomNavigation>
        <BottomNavigation.Item>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </BottomNavigation.Item>
        <BottomNavigation.Item active>
          <ListTodo />
        </BottomNavigation.Item>
        <BottomNavigation.Item>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </BottomNavigation.Item>
      </BottomNavigation>
    </div>
  )
}
