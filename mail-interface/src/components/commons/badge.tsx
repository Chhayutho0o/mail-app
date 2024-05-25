import { Tag } from '@/types'

const Badge = ({ ...props }: Tag) => {
  return (
    <div
      style={{ backgroundColor: props.color }}
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs 
      font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring 
      focus:ring-offset-2 border-transparent text-white `}>
      {props.name}
    </div>
  )
}

export default Badge