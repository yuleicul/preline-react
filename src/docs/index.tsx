import { SimpleCard } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function Docs() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <SimpleCard title="Input" subtitle="" linkText="" linkHref="">
        <Input />
      </SimpleCard>

      <SimpleCard title="Input" subtitle="" linkText="" linkHref="">
        <Input />
      </SimpleCard>

      <SimpleCard title="Input" subtitle="" linkText="" linkHref="">
        <Input />
      </SimpleCard>
    </div>
  )
}
