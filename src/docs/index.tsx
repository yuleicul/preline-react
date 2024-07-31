import { Button, OutlineButton } from '@/components/ui/button'
import { SimpleCard } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

export function Docs() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
      <SimpleCard title="Input" subtitle="" linkText="Usage" linkHref="">
        <Input />
      </SimpleCard>

      <SimpleCard title="Button" subtitle="" linkText="Usage" linkHref="">
        <>
          <Button>Button</Button>
          <OutlineButton>Button</OutlineButton>
        </>
      </SimpleCard>

      <SimpleCard title="Checkbox" subtitle="" linkText="Usage" linkHref="">
        <Checkbox label="Please check the box if you have read and understood the statement." />
      </SimpleCard>
    </div>
  )
}
